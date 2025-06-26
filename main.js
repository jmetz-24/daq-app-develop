const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('node:path');
const axios = require('axios'); // Import axios here

// Define the Flask server URL in the main process
const API_URL = 'http://127.0.0.1:5001';

if (require('electron-squirrel-startup')) {
  app.quit();
}

// --- IPC HANDLER FOR THE FILE DIALOG ---
async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'CSV Files', extensions: ['csv'] }]
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
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // --- YOUR EXISTING MENU CODE (No changes needed here) ---
  const menuTemplate = [
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Theme',
          submenu: [
            {
              label: 'Light',
              type: 'radio',
              checked: true,
              click: () => {
                mainWindow.webContents.send('set-theme', 'light');
              }
            },
            {
              label: 'Dark',
              type: 'radio',
              checked: false,
              click: () => {
                mainWindow.webContents.send('set-theme', 'dark');
              }
            }
          ]
        },
        { type: 'separator' },
        { role: 'reload' },
        { role: 'toggleDevTools' }
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('set-theme', 'light');
  });
};

app.on('ready', () => {
  // --- Register all IPC handlers here ---

  // Handle File Dialog
  ipcMain.handle('dialog:openFile', handleFileOpen);

  // --- ADDED: Handlers for Flask API calls ---
  
  // Handler for getting headers
  ipcMain.handle('flask:getHeaders', async (event, filePath) => {
    try {
      const response = await axios.post(`${API_URL}/get-headers`, { filePath });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get headers from backend');
    }
  });

  // Handler for processing data
  ipcMain.handle('flask:processData', async (event, args) => {
    try {
      const response = await axios.post(`${API_URL}/process-data`, args);
      return { status: 'success', data: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Processing failed in backend');
    }
  });

  // Handler for shaping profile
  ipcMain.handle('flask:shapeProfile', async (event, args) => {
    try {
        const response = await axios.post(`${API_URL}/shape-profile`, args);
        return { status: 'success', data: response.data };
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Shaping failed in backend');
    }
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
