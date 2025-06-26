// src/components/ChannelSelectionCard.jsx
import React from 'react';
import { Card } from './ui/Card';
import { CardHeader } from './ui/CardHeader';
import ChannelPill from './ChannelPill';
import { SwitchControl } from './ui/SwitchControl'; // Import the switch

export const ChannelSelectionCard = ({ 
  channels, 
  inputChannelIds, 
  outputChannelIds, 
  onToggleChannel, 
  onRenameChannel,
  isRenameMode,
  setIsRenameMode
}) => {
  const getPillColor = (channelId) => {
    if (inputChannelIds.includes(channelId)) return 'bg-[#006AED] text-white';
    if (outputChannelIds.includes(channelId)) return 'bg-green-500 text-white';
    return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
  };

  const subtitle = isRenameMode 
    ? "Click a channel name to edit it." 
    : "Click to cycle: Unselected → Input → Output.";

  return (
    <Card>
      <CardHeader 
        title="2. Select Channels" 
        subtitle={subtitle}
      />
      {/* --- UPDATED: Added Rename Mode toggle switch --- */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-[#006AED] mr-2"></div> Input</span>
          <span className="flex items-center text-sm"><div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div> Output</span>
        </div>
        <SwitchControl 
          label="Rename Mode"
          checked={isRenameMode}
          onChange={setIsRenameMode}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {channels.map(channel => (
          <ChannelPill 
            key={channel.id}
            channel={channel} 
            colorClass={getPillColor(channel.id)}
            onToggle={onToggleChannel}
            onRename={onRenameChannel}
            isRenameMode={isRenameMode} // Pass the mode down
          />
        ))}
      </div>
    </Card>
  );
};