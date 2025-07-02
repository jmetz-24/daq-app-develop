import React from 'react';

const SliderControl = ({ label, value, onChange, min, max, step }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}: <span className="font-bold text-blue-600">{value}</span>
      </label>
      <div className="flex items-center space-x-4">
        <input
          id={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-24 px-2 py-1 text-center border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default SliderControl;
