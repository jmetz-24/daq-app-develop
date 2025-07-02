"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  // --- Theme function (unchanged) ---
  onSetTheme: (callback) => ipcRenderer.on("set-theme", (_event, theme) => callback(theme)),
  // --- File Dialog function (unchanged) ---
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  // --- Functions that now ask the main process to call the Python backend ---
  getHeaders: (filePath) => {
    return ipcRenderer.invoke("flask:getHeaders", filePath);
  },
  processData: (args) => {
    return ipcRenderer.invoke("flask:processData", args);
  },
  shapeProfile: (args) => {
    return ipcRenderer.invoke("flask:shapeProfile", args);
  }
});
