// src/components/ui/CardHeader.jsx
import React from 'react';

export const CardHeader = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-2xl font-semibold text-[#001733]">{title}</h2>
    <div className="w-16 h-1 bg-[#006AED] rounded-full mt-2"></div>
    {subtitle && <p className="text-[#576175] mt-3">{subtitle}</p>}
  </div>
);