const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 550,
        height: 850,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js') // Optional, but good practice
        },
        autoHideMenuBar: true, // Hide the default menu bar for a cleaner app look
        resizable: true,
        icon: path.join(__dirname, 'icon.png') // If you add an icon later
    });

    mainWindow.loadFile('index.html');

    // Open DevTools internally if needed for debugging
    // mainWindow.webContents.openDevTools(); 
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
