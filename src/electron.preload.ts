const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    store: (action, prop, value = undefined) => ipcRenderer.invoke('store', action, prop, value),
    loadTournament: () => ipcRenderer.invoke('loadTournament'),
    quit: () => ipcRenderer.invoke('quit')
});