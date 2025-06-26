// src/components/TestSimulationForm.jsx
import React from 'react';
import { Cpu, ChevronsRight } from 'lucide-react';
import { Card } from './ui/Card';
import { CardHeader } from './ui/CardHeader';
import { standardProfiles } from '../data/standardProfiles';

export const TestSimulationForm = ({
  outputChannels,
  shapingChannel,
  setShapingChannel,
  profileType,
  setProfileType,
  profileName,
  setProfileName,
  onShapeProfile,
  shaping,
}) => {
  return (
    <Card>
      <CardHeader title="4. Test Simulation" subtitle="Shape a standard test profile using a generated transfer function." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="font-semibold text-gray-700 block mb-1">Transfer Function:</label>
          <select value={shapingChannel} onChange={(e) => setShapingChannel(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2">
            {outputChannels.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="font-semibold text-gray-700 block mb-1">Profile Type:</label>
          <select value={profileType} onChange={(e) => setProfileType(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2">
            <option value="random">Random</option>
            <option value="shock">Shock</option>
            <option value="sine">Sine</option>
          </select>
        </div>
        <div>
          <label className="font-semibold text-gray-700 block mb-1">Profile Name:</label>
          <select value={profileName} onChange={(e) => setProfileName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2" disabled={!profileType}>
            <option value="">-- Select Profile --</option>
            {standardProfiles[profileType].map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
        </div>
      </div>
      <button onClick={onShapeProfile} disabled={shaping || !shapingChannel || !profileName} className="w-full flex items-center justify-center bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-500 disabled:bg-gray-400">
        {shaping ? <><Cpu className="animate-spin w-5 h-5 mr-2" />Shaping...</> : <><ChevronsRight className="w-5 h-5 mr-2" />Shape Profile</>}
      </button>
    </Card>
  );
};