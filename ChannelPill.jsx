// src/components/ChannelPill.jsx
import React, { useState, useEffect } from 'react';

const ChannelPill = ({ channel, colorClass, onToggle, onRename, isRenameMode }) => {
    // --- FIXED: This line was missing ---
    const [isEditing, setIsEditing] = useState(false);
    const [currentName, setCurrentName] = useState(channel.currentName);

    useEffect(() => {
        setCurrentName(channel.currentName);
    }, [channel.currentName]);

    const handleSaveRename = () => {
        setIsEditing(false);
        if (currentName.trim() && currentName !== channel.currentName) {
            onRename(channel.id, currentName);
        } else {
            setCurrentName(channel.currentName);
        }
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSaveRename();
        else if (e.key === 'Escape') {
            setCurrentName(channel.currentName);
            setIsEditing(false);
        }
    };

    const handleClick = () => {
        if (isRenameMode) {
            setIsEditing(true);
        } else {
            onToggle(channel.id);
        }
    };

    if (isEditing) {
        return (
            <input
                type="text"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                onBlur={handleSaveRename}
                onKeyDown={handleKeyDown}
                onFocus={(e) => e.target.select()}
                autoFocus
                className="w-full px-3 py-1 text-sm font-semibold text-center bg-white border border-[#006AED] rounded-full"
            />
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`w-full px-3 py-1 rounded-full text-sm font-semibold transition-colors text-center truncate ${colorClass}`}
            title={isRenameMode ? `Click to rename '${channel.currentName}'` : `Click to cycle '${channel.currentName}'`}
        >
            {channel.currentName}
        </button>
    );
};

export default ChannelPill;