// src/components/AnalysisResults.jsx
import React from 'react';
import Plot from 'react-plotly.js';
import { CheckCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { SwitchControl } from './ui/SwitchControl';
import { ToggleControl } from './ui/ToggleControl';

export const AnalysisResults = ({ results, plotSettings, onPlotSettingChange, accelerationUnit }) => {
  const getMagnitudeData = (channelData, unit) => {
    if (unit === 'Linear') return channelData.magnitude.map(db => Math.pow(10, db / 20));
    return channelData.magnitude;
  };

  return (
    <Card>
      <div className="flex items-center mb-4">
        <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
        <h2 className="text-3xl font-semibold">Analysis Complete</h2>
      </div>
      <div className="space-y-6">
        {Object.entries(results).map(([outputChannel, data]) => {
          const settings = plotSettings[outputChannel] || {};
          const magUnit = settings.magUnit || 'dB';
          const magnitudeData = getMagnitudeData(data, magUnit);
          const isMagYLogDisabled = magUnit === 'dB';

          return (
            <div key={outputChannel} className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-xl font-semibold mb-2 text-green-600">{`Output: ${outputChannel}`}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2 px-2 flex-wrap gap-2">
                    <h4 className="font-bold">Magnitude</h4>
                    <div className="flex items-center space-x-4">
                      <SwitchControl label="X" checked={settings.magXLog} onChange={(val) => onPlotSettingChange(outputChannel, 'magXLog', val)} />
                      <SwitchControl label="Y" checked={settings.magYLog} onChange={(val) => onPlotSettingChange(outputChannel, 'magYLog', val)} disabled={isMagYLogDisabled} />
                    </div>
                  </div>
                  <div className="flex justify-end items-center mb-2 px-2">
                    <ToggleControl label="Unit" options={['dB', 'Linear']} selected={magUnit} onChange={(unit) => onPlotSettingChange(outputChannel, 'magUnit', unit)} />
                  </div>
                  <Plot
                    data={[{ x: data.freq, y: magnitudeData, type: 'scatter', mode: 'lines', marker: { color: '#006AED' } }]}
                    layout={{
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      font: { color: '#576175', family: 'Inter' },
                      xaxis: { title: { text: 'Frequency (Hz)' }, type: settings.magXLog ? 'log' : 'linear', gridcolor: '#d1d5db' },
                      yaxis: { title: { text: `Magnitude ${magUnit === 'Linear' ? `(${accelerationUnit})` : '(dB)'}` }, type: settings.magYLog && !isMagYLogDisabled ? 'log' : 'linear', gridcolor: '#d1d5db' },
                      margin: { l: 60, r: 20, b: 50, t: 30 },
                    }}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '300px' }}
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2 px-2 flex-wrap gap-2">
                    <h4 className="font-bold">Phase</h4>
                    <div className="flex items-center space-x-4">
                      <SwitchControl label="X" checked={settings.phaseXLog} onChange={(val) => onPlotSettingChange(outputChannel, 'phaseXLog', val)} />
                      <SwitchControl label="Y" checked={settings.phaseYLog} onChange={(val) => onPlotSettingChange(outputChannel, 'phaseYLog', val)} />
                    </div>
                  </div>
                  <Plot
                    data={[{ x: data.freq, y: data.phase, type: 'scatter', mode: 'lines', marker: { color: '#219C54' } }]}
                    layout={{
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      font: { color: '#576175', family: 'Inter' },
                      xaxis: { title: { text: 'Frequency (Hz)' }, type: settings.phaseXLog ? 'log' : 'linear', gridcolor: '#d1d5db' },
                      yaxis: { title: { text: 'Phase (degrees)' }, type: settings.phaseYLog ? 'log' : 'linear', gridcolor: '#d1d5db' },
                      margin: { l: 60, r: 20, b: 50, t: 30 },
                    }}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '300px' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};