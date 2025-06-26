import csv
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from scipy import signal
from rdp import rdp # Import the RDP library

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

def parse_csv_metadata_and_data(file_path):
    """
    Parses the header and data from a QuickDAQ CSV file.
    """
    metadata = { "sample_rate": None, "channel_names": [], "y_axis_units": [], "data_start_row": -1 }
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()
        for i, line in enumerate(lines):
            parts = [p.strip() for p in line.split(',')]
            if not parts: continue
            if "sample rate" in parts[0].lower():
                for part in parts[1:]:
                    try:
                        metadata["sample_rate"] = float(part); break
                    except (ValueError, IndexError): continue
            if "channel name" in parts[0].lower():
                metadata["channel_names"] = [name for name in parts[1:] if name]
            if "y axis units" in parts[0].lower():
                 metadata["y_axis_units"] = [unit for unit in parts[1:] if unit]
            if "seconds" in parts[0].lower():
                metadata["data_start_row"] = i + 1; break
    
    if not metadata["channel_names"]: raise ValueError("Could not find the 'Channel Name' row.")
    if metadata["sample_rate"] is None: raise ValueError("Could not find 'Sample Rate'.")
    if metadata["data_start_row"] == -1: raise ValueError("Could not find the start of the data block.")

    data_rows = []
    num_columns = len(metadata["channel_names"]) + 1
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        reader = csv.reader(f)
        for _ in range(metadata["data_start_row"]): next(reader)
        for row in reader:
            if not row or not any(row): continue
            processed_row = []
            for i in range(num_columns):
                try: val = float(row[i]) if row[i].strip() else 0.0; processed_row.append(val)
                except (ValueError, IndexError): processed_row.append(0.0)
            data_rows.append(processed_row)
    metadata["data"] = np.array(data_rows, dtype=float)
    return metadata

def calculate_grms(freq, psd):
    """Calculates Grms from a PSD using trapezoidal integration."""
    area = np.trapz(psd, freq)
    return np.sqrt(area)

def reduce_psd_breakpoints(freq, psd, n_points):
    """Reduces PSD points using RDP algorithm on a log-log scale."""
    if len(freq) <= n_points:
        return freq, psd
    
    # RDP works best on a log-log scale for PSD data
    log_points = np.column_stack((np.log10(freq), np.log10(psd)))
    
    # The 'epsilon' parameter controls the reduction. We'll find a suitable epsilon
    # by iterating until we get close to the desired number of points.
    epsilon = 0.01
    for _ in range(10): # Max 10 iterations to find a good epsilon
        reduced_log_points = rdp(log_points, epsilon=epsilon)
        if len(reduced_log_points) <= n_points:
            break
        epsilon *= 1.5 # Increase epsilon to reduce more points
    else: # If still too many points, a final larger jump
        epsilon *= 2.0
        reduced_log_points = rdp(log_points, epsilon=epsilon)


    # Convert back to linear scale
    reduced_freq = 10**reduced_log_points[:, 0]
    reduced_psd = 10**reduced_log_points[:, 1]
    return reduced_freq, reduced_psd

@app.route('/get-headers', methods=['POST'])
def get_headers_route():
    # ... (same as before)
    data = request.json; file_path = data.get('filePath')
    if not file_path: return jsonify({'error': 'No file path provided'}), 400
    try: metadata = parse_csv_metadata_and_data(file_path); return jsonify(metadata["channel_names"])
    except Exception as e: return jsonify({'error': f"Failed to parse file: {e}"}), 500

@app.route('/process-data', methods=['POST'])
def process_data_route():
    # ... (same as before)
    req_data = request.json; file_path = req_data.get('filePath'); input_channels = req_data.get('inputs'); output_channels = req_data.get('outputs')
    if not all([file_path, input_channels, output_channels]): return jsonify({'error': 'Missing required parameters'}), 400
    try:
        metadata = parse_csv_metadata_and_data(file_path); fs = metadata["sample_rate"]; all_channel_names = metadata["channel_names"]; all_data = metadata["data"]
        header_map = {name: i for i, name in enumerate(all_channel_names)}
        input_indices = [header_map.get(name) + 1 for name in input_channels if header_map.get(name) is not None]
        avg_input_signal = np.mean(all_data[:, input_indices], axis=1)
        results = {}
        for output_col_name in output_channels:
            output_idx = header_map.get(output_col_name)
            if output_idx is None: continue
            output_signal = all_data[:, output_idx + 1]
            min_len = min(len(avg_input_signal), len(output_signal))
            freqs, tf = calculate_transfer_function(avg_input_signal[:min_len], output_signal[:min_len], fs)
            magnitude_db = 20 * np.log10(np.abs(tf)); phase_deg = np.angle(tf, deg=True)
            valid_indices = np.isfinite(magnitude_db)
            results[output_col_name] = {'freq': freqs[valid_indices].tolist(), 'magnitude': magnitude_db[valid_indices].tolist(), 'phase': phase_deg[valid_indices].tolist()}
        return jsonify(results)
    except Exception as e: return jsonify({'error': f"An error occurred during processing: {e}"}), 500


def calculate_transfer_function(input_signal, output_signal, fs):
    # ... (same as before)
    nperseg = min(len(input_signal), 4096); freqs, pxy = signal.csd(input_signal, output_signal, fs=fs, nperseg=nperseg)
    _, pxx = signal.welch(input_signal, fs=fs, nperseg=nperseg); pxx[pxx == 0] = 1e-20
    tf = pxy / pxx; return freqs, tf

@app.route('/shape-profile', methods=['POST'])
def shape_profile_route():
    data = request.json
    tf_data = data.get('transferFunction')
    profile = data.get('inputProfile')
    n_points = data.get('numPoints', 20) # Default to 20 points if not provided

    if not tf_data or not profile:
        return jsonify({'error': 'Missing transfer function or profile data'}), 400
    
    try:
        tf_freq, tf_mag_db = np.array(tf_data['freq']), np.array(tf_data['magnitude'])
        tf_gain_linear = 10**(tf_mag_db / 20)
        
        if 'psd' in profile:
            profile_freq, profile_psd = np.array(profile['freq']), np.array(profile['psd'])
            output_freq = np.arange(profile_freq[0], profile_freq[-1] + 1, 1.0)
            log_profile_freq = np.log10(profile_freq)
            log_profile_psd = np.log10(profile_psd)
            interp_log_input_psd = np.interp(np.log10(output_freq), log_profile_freq, log_profile_psd)
            interp_input_psd = 10**interp_log_input_psd
            interp_tf_gain = np.interp(output_freq, tf_freq, tf_gain_linear, left=1.0, right=1.0)
            output_psd = interp_input_psd * (interp_tf_gain**2)
            
            # --- NEW: Reduce breakpoints and calculate all Grms values ---
            reduced_freq, reduced_psd = reduce_psd_breakpoints(output_freq, output_psd, n_points)

            grms_input = calculate_grms(profile_freq, profile_psd)
            grms_shaped = calculate_grms(output_freq, output_psd)
            grms_reduced = calculate_grms(reduced_freq, reduced_psd)

            original_result = {**profile, 'freq': output_freq.tolist(), 'psd': interp_input_psd.tolist()}
            shaped_result = {**profile, 'freq': output_freq.tolist(), 'psd': output_psd.tolist(), 'name': 'Shaped'}
            reduced_result = {**profile, 'freq': reduced_freq.tolist(), 'psd': reduced_psd.tolist(), 'name': 'Reduced'}
            
            grms_values = {'input': grms_input, 'shaped': grms_shaped, 'reduced': grms_reduced}

            return jsonify({
                'original': original_result, 
                'shaped': shaped_result,
                'reduced': reduced_result,
                'grms': grms_values
            })

        else: # Shock/Sine Profile (existing logic)
            max_gain = np.max(tf_gain_linear)
            peak = profile['peak']
            shaped_peak = max(p * max_gain for p in peak) if isinstance(peak, list) else peak * max_gain
            return jsonify({'original': profile, 'shaped': {**profile, 'peak': f"{shaped_peak:.2f}", 'name': 'Shaped'}})
            
    except Exception as e:
        return jsonify({'error': f"An error occurred during shaping: {e}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

