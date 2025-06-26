// src/components/FileUploadCard.jsx
import React from 'react';
import { UploadCloud, X, FileSearch } from 'lucide-react';
import { Card } from './ui/Card';
import { CardHeader } from './ui/CardHeader';

export const FileUploadCard = ({
  loadingFile,
  fileName,
  filePath,
  timeColumn,
  accelerationUnit,
  onFileOpen,
  onReset,
  onUnitChange,
}) => {
  return (
    <Card>
      <CardHeader title="1. Upload & Configure" />
      {loadingFile ? (
        <div className="text-center py-6">
          <FileSearch className="w-16 h-16 text-[#006AED] animate-bounce mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#001733]">Loading File...</h3>
          <p className="text-[#576175]">Please wait while the file is being parsed.</p>
        </div>
      ) : (
        <div
          className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#006AED] hover:bg-blue-50"
          onClick={onFileOpen}
        >
          <UploadCloud className="mx-auto w-12 h-12 text-gray-400 mb-2" />
          {fileName ? (
            <div className="flex items-center justify-center">
              <span className="text-green-600 font-medium">{fileName}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReset();
                }}
                className="ml-2 text-red-500 hover:text-red-400"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Click to browse for a CSV file</p>
          )}
        </div>
      )}
      {timeColumn && <p className="text-sm text-center mt-3 text-gray-500">Time column identified: <span className="font-semibold">{timeColumn}</span></p>}
      {filePath && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <label className="font-semibold text-gray-700">Acceleration Unit:</label>
          <select value={accelerationUnit} onChange={(e) => onUnitChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1">
            <option value="g">g</option>
            <option value="m/s²">m/s²</option>
            <option value="mm/s²">mm/s²</option>
          </select>
        </div>
      )}
    </Card>
  );
};