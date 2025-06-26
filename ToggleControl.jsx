// src/components/ui/ToggleControl.jsx
import React from 'react';

export const ToggleControl = ({ label, options, selected, onChange }) => (
  <div className="flex items-center space-x-2">
    <span className="font-bold text-sm text-gray-600">{label}:</span>
    {options.map(option => (
      <button
        key={option}
        onClick={() => onChange(option)}
        className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
          selected === option ? 'bg-[#006AED] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {option}
      </button>
    ))}
  </div>
);