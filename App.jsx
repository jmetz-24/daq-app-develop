// src/App.jsx
import React, { useState }      from 'react';
import { Zap, Cpu, Compass }    from 'lucide-react';

import { standardProfiles }     from './data/standardProfiles';
import { Card }                 from './components/ui/Card';
import { CardHeader }           from './components/ui/CardHeader';
import { FileUploadCard }       from './components/FileUploadCard';
import { ChannelSelectionCard } from './components/ChannelSelectionCard';
import { AnalysisResults }      from './components/AnalysisResults';
import { TestSimulationForm }   from './components/TestSimulationForm';
import { ShapedResultDisplay }  from './components/ShapedResultDisplay';
import useFavicon               from './components/useFavicon'; 

const App = () => {
  const [filePath, setFilePath] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loadingFile, setLoadingFile] = useState(false);
  const [channels, setChannels] = useState([]);
  const [inputChannelIds, setInputChannelIds] = useState([]);
  const [outputChannelIds, setOutputChannelIds] = useState([]);
  const [isRenameMode, setIsRenameMode] = useState(false);
  const [timeColumn, setTimeColumn] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [plotSettings, setPlotSettings] = useState({});
  const [shaping, setShaping] = useState(false);
  const [profileType, setProfileType] = useState('random');
  const [profileName, setProfileName] = useState('');
  const [shapingChannel, setShapingChannel] = useState('');
  const [shapedResult, setShapedResult] = useState(null);
  const [accelerationUnit, setAccelerationUnit] = useState('g');
  const MyIcon = <Compass className="w-10 h-10 mr-4 text-[#001733]" />;
  useFavicon(MyIcon);


  const resetState = () => {
    setFilePath(null); setFileName('');
    setChannels([]); setInputChannelIds([]); setOutputChannelIds([]);
    setIsRenameMode(false);
    setTimeColumn(''); setError(''); setProcessing(false);
    setResults(null); setPlotSettings({}); setShaping(false);
    setProfileType('random'); setProfileName(''); setShapingChannel('');
    setShapedResult(null); setLoadingFile(false);
  };

  const handleFileOpen = async () => {
    resetState();
    try {
      setLoadingFile(true);
      const path = await window.electronAPI.openFile();
      if (path) {
        setFilePath(path);
        setFileName(path.split(/[\\/]/).pop());
        const fetchedHeaders = await window.electronAPI.getHeaders(path);
        const timeCol = fetchedHeaders.find(h => h.toLowerCase().includes('time'));
        const dataCols = fetchedHeaders.filter(h => h !== timeCol);
        setTimeColumn(timeCol || '');
        setChannels(dataCols.map((name, index) => ({ 
            id: index, 
            originalName: name, 
            currentName: name 
        })));
      }
    } catch (e) {
      setError(`Error opening file: ${e.message}`);
    } finally {
      setLoadingFile(false);
    }
  };

  const handleRenameChannel = (channelId, newName) => {
    // --- FIXED: Capture oldName *before* any state updates ---
    const oldName = channels.find(c => c.id === channelId)?.currentName;

    // Guard against race conditions or invalid IDs
    if (!oldName) return; 

    if (channels.some(c => c.currentName === newName && c.id !== channelId)) {
        setError(`Channel name "${newName}" already exists.`);
        return;
    }

    setChannels(prev => prev.map(c => {
        if (c.id === channelId) {
            return { ...c, currentName: newName };
        }
        return c;
    }));
    
    // Now that oldName is correctly captured, this logic will work.
    if (results && results[oldName]) {
        setResults(prev => {
            const newResults = { ...prev };
            newResults[newName] = newResults[oldName];
            delete newResults[oldName];
            return newResults;
        });
        setPlotSettings(prev => {
            const newSettings = { ...prev };
            newSettings[newName] = newSettings[oldName];
            delete newSettings[oldName];
            return newSettings;
        });
    }
    if (shapingChannel === oldName) {
        setShapingChannel(newName);
    }
  };

  const handleProcess = async () => {
    if (!inputChannelIds.length || !outputChannelIds.length) return;
    setError(''); setProcessing(true); setResults(null); setShapedResult(null);
    
    const inputNames = inputChannelIds.map(id => channels.find(c => c.id === id)?.originalName);
    const outputNames = outputChannelIds.map(id => channels.find(c => c.id === id)?.originalName);

    try {
      // The backend receives the original names, which it can find in the CSV
      const response = await window.electronAPI.processData({ filePath, inputs: inputNames, outputs: outputNames, timeColumn });
      if (response.status === 'success') {
        // The backend returns results keyed by originalName. We need to convert them to be keyed by currentName.
        const resultsByCurrentName = {};
        for (const originalName in response.data) {
            const channel = channels.find(c => c.originalName === originalName);
            if (channel) {
                resultsByCurrentName[channel.currentName] = response.data[originalName];
            } else {
                resultsByCurrentName[originalName] = response.data[originalName];
            }
        }
        setResults(resultsByCurrentName);

        const initialSettings = Object.keys(resultsByCurrentName).reduce((acc, channel) => {
          acc[channel] = { magUnit: 'Linear', magXLog: true, magYLog: true, phaseXLog: true, phaseYLog: false };
          return acc;
        }, {});
        setPlotSettings(initialSettings);

        const outputCurrentNames = outputChannelIds.map(id => channels.find(c => c.id === id)?.currentName);
        if (outputCurrentNames.length > 0) setShapingChannel(outputCurrentNames[0]);
      } else {
        setError(response.message || 'Error processing data.');
      }
    } catch (err) {
      setError(`Processing failed: ${err.message}`);
    }
    setProcessing(false);
  };
  
  const handleShapeProfile = async () => {
      if (!shapingChannel || !profileName) { setError("Please select a channel and a profile to shape."); return; }
      setError(''); setShaping(true); setShapedResult(null);
      const transferFunction = results[shapingChannel];
      const inputProfile = standardProfiles[profileType].find(p => p.name === profileName);
      try {
          const response = await window.electronAPI.shapeProfile({ transferFunction, inputProfile });
          if (response.status === 'success') setShapedResult(response.data);
          else setError(response.message || 'Failed to shape profile.');
      } catch(err) { setError(`Shaping failed: ${err.message}`); }
      setShaping(false);
  };

  const toggleChannel = (channelId) => {
    if (isRenameMode) return;
    const isInput = inputChannelIds.includes(channelId);
    const isOutput = outputChannelIds.includes(channelId);
    if (!isInput && !isOutput) {
      setInputChannelIds([...inputChannelIds, channelId]);
    } else if (isInput) {
      setInputChannelIds(inputChannelIds.filter(id => id !== channelId));
      setOutputChannelIds([...outputChannelIds, channelId]);
    } else if (isOutput) {
      setOutputChannelIds(outputChannelIds.filter(id => id !== channelId));
    }
  };
  
  const handlePlotSettingChange = (channel, setting, value) => {
      setPlotSettings(prev => {
          const newSettings = { ...prev, [channel]: { ...(prev[channel] || {}), [setting]: value } };
          if (setting === 'magUnit' && value === 'dB') {
              newSettings[channel].magYLog = false;
          }
          return newSettings;
      });
  };

  const outputChannelNames = outputChannelIds.map(id => channels.find(c => c.id === id)?.currentName).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F3F4F8] text-[#001733] font-['Inter',_sans-serif] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex items-center">
          <Compass className="w-10 h-10 mr-4 text-[#001733]" />
          <div>
            <h1 className="text-4xl font-semibold">Transfer Function Analyzer</h1>
            <p className="text-[#576175] mt-1 font-normal">Powered by Aurora</p>
          </div>
        </header>

        <div className="space-y-8">
          <FileUploadCard
            loadingFile={loadingFile}
            fileName={fileName}
            filePath={filePath}
            timeColumn={timeColumn}
            accelerationUnit={accelerationUnit}
            onFileOpen={handleFileOpen}
            onReset={resetState}
            onUnitChange={setAccelerationUnit}
          />

          {channels.length > 0 && (
            <>
              <ChannelSelectionCard
                channels={channels}
                inputChannelIds={inputChannelIds}
                outputChannelIds={outputChannelIds}
                onToggleChannel={toggleChannel}
                onRenameChannel={handleRenameChannel}
                isRenameMode={isRenameMode}
                setIsRenameMode={setIsRenameMode}
              />
              <Card>
                <CardHeader title="3. Process & Analyze" />
                <button onClick={handleProcess} disabled={processing || !inputChannelIds.length || !outputChannelIds.length} className="w-full flex items-center justify-center bg-[#006AED] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#0052C2] disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {processing ? <><Cpu className="animate-spin w-5 h-5 mr-2" />Processing...</> : <><Zap className="w-5 h-5 mr-2" />Calculate Transfer Function</>}
                </button>
              </Card>
            </>
          )}

          {error && ( <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert"><p className="font-bold">Error</p><p>{error}</p></div> )}
          {processing && <div className="text-center py-12"><Cpu className="w-12 h-12 text-[#006AED] animate-spin mx-auto mb-4" /><h3 className="text-xl font-semibold">Calculating...</h3></div>}
          {results && ( <AnalysisResults results={results} plotSettings={plotSettings} onPlotSettingChange={handlePlotSettingChange} accelerationUnit={accelerationUnit} /> )}
          {results && ( <TestSimulationForm outputChannels={outputChannelNames} shapingChannel={shapingChannel} setShapingChannel={setShapingChannel} profileType={profileType} setProfileType={setProfileType} profileName={profileName} setProfileName={setProfileName} onShapeProfile={handleShapeProfile} shaping={shaping} /> )}
          {shaping && <div className="text-center py-12"><Cpu className="w-12 h-12 text-green-600 animate-spin mx-auto mb-4" /><h3 className="text-xl font-semibold">Shaping Profile...</h3></div>}
          {shapedResult && <ShapedResultDisplay shapedResult={shapedResult} />}
        </div>
      </div>
    </div>
  );
};

export default App;