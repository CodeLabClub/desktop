const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(...args) {
      return ipcRenderer.send(...args);
    },
    invoke(...args) {
      return ipcRenderer.invoke(...args);
    },
    on(...args) {
      return ipcRenderer.on(...args);
    }
  }
});
