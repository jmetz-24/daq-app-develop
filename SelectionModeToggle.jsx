// src/components/ui/SelectionModeToggle.jsx
import React from 'react';

export const SelectionModeToggle = ({ mode, setMode }) => {
  const baseClasses = "px-3 py-1 text-sm font-semibold rounded-md transition-colors";
  const activeClasses = "bg-[#006AED] text-white";
  const inactiveClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <div className="flex items-center p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => setMode('input')}
        className={`${baseClasses} ${mode === 'input' ? activeClasses : inactiveClasses}`}
      >
        Select Inputs
      </button>
      <button
        onClick={() => setMode('output')}
        className={`${baseClasses} ${mode === 'output' ? activeClasses : inactiveClasses}`}
      >
        Select Outputs
      </button>
    </div>
  );
};