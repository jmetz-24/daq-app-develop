// src/components/ui/SwitchControl.jsx
import React from 'react';

export const SwitchControl = ({ label, checked, onChange, disabled = false }) => (
  <div className="flex items-center space-x-2">
    {/* UPDATED: Removed "Log" to make the component more reusable */}
    <span className={`font-semibold text-sm ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>{label}</span>
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
        checked ? 'bg-[#006AED]' : 'bg-gray-300'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);