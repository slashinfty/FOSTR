const {
    app,
    BrowserWindow,
    dialog,
    ipcMain
} = require('electron');
const Store = require('electron-store');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const fs = require('fs');
const path = require('path');

const store = new Store();
let mainWindow;

const handleStore = (action, prop, value) => {
    if (action === 'get') {
        return store.get(prop);
    } else if (action === 'set') {
        store.set(prop, value);
        return;
    }
}

const loadTournament = () => {
    const file = dialog.showOpenDialogSync(mainWindow, {
        title: 'Select tournament file',
        filters: [
            {
                name: 'JSON',
                extensions: ['json']
            }
        ]
    });
    return file === undefined ? undefined : JSON.parse(fs.readFileSync(file[0]));
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            contextIsolation: true,
            preload: path.resolve(__dirname, 'preload.js')
        }
    });

    mainWindow.setMenu(null);

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:9000/');
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
        mainWindow.loadFile('index.html');
    }
}

app.on('ready', () => {
    ipcMain.handle('store', (action, prop, value) => {
        return handleStore(action, prop, value);
    });
    ipcMain.handle('loadTournament', loadTournament);
    ipcMain.handle('quit', app.quit);
    if (process.env.NODE_ENV === 'development') {
        installExtension(REACT_DEVELOPER_TOOLS);
    }
    createWindow();
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
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