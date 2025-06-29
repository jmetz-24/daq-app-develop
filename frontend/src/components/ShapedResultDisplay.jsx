// src/components/ShapedResultDisplay.jsx
import React from 'react';
import Plot from 'react-plotly.js';
import { Card } from './ui/Card';
import { CardHeader } from './ui/CardHeader';

export const ShapedResultDisplay = ({ shapedResult }) => {
  // Render random vibration profile plot
  if (shapedResult.original.psd) {
    return (
      <Card>
        <CardHeader title="Shaped Profile Result" />
        <Plot
          data={[
            { x: shapedResult.original.freq, y: shapedResult.original.psd, type: 'scatter', mode: 'lines', line: { dash: 'dash' }, name: `Input: ${shapedResult.original.name}` },
            { x: shapedResult.shaped.freq, y: shapedResult.shaped.psd, type: 'scatter', mode: 'lines', name: `${shapedResult.shaped.name} (Output)` }
          ]}
          layout={{
            xaxis: { title: 'Frequency (Hz)', type: 'log' },
            yaxis: { title: `PSD (${shapedResult.original.units})`, type: 'log' },
            font: { color: '#576175', family: 'Inter' },
            legend: {
              orientation: "h", // Display legend horizontally
              yanchor: "top",
              y: -0.2,        // Position legend below the plot area
              xanchor: "center",
              x: 0.5          // Center the legend horizontally
            },
            margin: { t: 5 }
          }}
          useResizeHandler={true}
          style={{ width: '100%', height: '400px' }}
        />
      </Card>
    );
  }

  // Render Sine or Shock profile data
  return (
    <Card>
      <CardHeader title="Shaped Profile Result" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h4 className="font-bold text-lg mb-2">Input Profile</h4>
          <p><strong>Name:</strong> {shapedResult.original.name}</p>
          <p><strong>Type:</strong> {shapedResult.original.type || 'Sine'}</p>
          <p><strong>Peak:</strong> {Array.isArray(shapedResult.original.peak) ? "Varies" : shapedResult.original.peak} {shapedResult.original.units}</p>
          <p><strong>Duration:</strong> {shapedResult.original.duration}</p>
          {shapedResult.original.shocks && <p><strong>Shocks:</strong> {shapedResult.original.shocks}</p>}
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <h4 className="font-bold text-lg mb-2 text-green-700">Shaped Result</h4>
          <p><strong>Name:</strong> {shapedResult.shaped.name}</p>
          <p><strong>Type:</strong> {shapedResult.shaped.type || 'Sine'}</p>
          <p><strong>Calculated Peak:</strong> {shapedResult.shaped.peak} {shapedResult.shaped.units}</p>
          <p><strong>Duration:</strong> {shapedResult.shaped.duration}</p>
          {shapedResult.shaped.shocks && <p><strong>Shocks:</strong> {shapedResult.shaped.shocks}</p>}
        </div>
      </div>
    </Card>
  );
};