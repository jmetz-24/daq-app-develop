const { contextBridge, ipcRenderer } = require('electron');

// We no longer need axios here, which resolves the 'module not found' error.
// The main process will handle all network requests.

contextBridge.exposeInMainWorld('electronAPI', {
  // --- Theme function (unchanged) ---
  onSetTheme: (callback) => ipcRenderer.on('set-theme', (_event, theme) => callback(theme)),

  // --- File Dialog function (unchanged) ---
  openFile: () => ipcRenderer.invoke('dialog:openFile'),

  // --- Functions that now ask the main process to call the Python backend ---
  
  getHeaders: (filePath) => {
    // Invoke the handler in main.js and pass the filePath along
    return ipcRenderer.invoke('flask:getHeaders', filePath);
  },

  processData: (args) => {
    // Invoke the handler in main.js and pass the arguments along
    return ipcRenderer.invoke('flask:processData', args);
  },
  
  shapeProfile: (args) => {
    // Invoke the handler in main.js and pass the arguments along
    return ipcRenderer.invoke('flask:shapeProfile', args);
  },
});
