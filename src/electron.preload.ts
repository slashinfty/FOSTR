const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    loadTournament: () => ipcRenderer.invoke('loadTournament'),
    quit: () => ipcRenderer.invoke('quit')
});