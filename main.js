const { config } = require('./constants.js');
const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow(config);

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

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
