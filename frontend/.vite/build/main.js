"use strict";
const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("node:path");
const axios = require("axios");
const API_URL = "http://127.0.0.1:5001";
if (require("electron-squirrel-startup")) {
  app.quit();
}
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "CSV Files", extensions: ["csv"] }]
  });
  if (!canceled) {
    return filePaths[0];
  }
  return null;
}
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  const menuTemplate = [
    {
      label: "View",
      submenu: [
        {
          label: "Toggle Theme",
          submenu: [
            {
              label: "Light",
              type: "radio",
              checked: true,
              click: () => {
                mainWindow.webContents.send("set-theme", "light");
              }
            },
            {
              label: "Dark",
              type: "radio",
              checked: false,
              click: () => {
                mainWindow.webContents.send("set-theme", "dark");
              }
            }
          ]
        },
        { type: "separator" },
        { role: "reload" },
        { role: "toggleDevTools" }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
  {
    mainWindow.loadURL("http://localhost:5173");
  }
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("set-theme", "light");
  });
};
app.on("ready", () => {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  ipcMain.handle("flask:getHeaders", async (event, filePath) => {
    var _a, _b;
    try {
      const response = await axios.post(`${API_URL}/get-headers`, { filePath });
      return response.data;
    } catch (error) {
      throw new Error(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || "Failed to get headers from backend");
    }
  });
  ipcMain.handle("flask:processData", async (event, args) => {
    var _a, _b;
    try {
      const response = await axios.post(`${API_URL}/process-data`, args);
      return { status: "success", data: response.data };
    } catch (error) {
      throw new Error(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || "Processing failed in backend");
    }
  });
  ipcMain.handle("flask:shapeProfile", async (event, args) => {
    var _a, _b;
    try {
      const response = await axios.post(`${API_URL}/shape-profile`, args);
      return { status: "success", data: response.data };
    } catch (error) {
      throw new Error(((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.error) || "Shaping failed in backend");
    }
  });
  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
