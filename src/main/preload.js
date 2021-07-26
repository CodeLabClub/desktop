const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send(...args) {
      return ipcRenderer.send(...args);
    },
    sendSync(...args) {
      return ipcRenderer.sendSync(...args);
    },
    invoke(...args) {
      return ipcRenderer.invoke(...args);
    },
    on(...args) {
      return ipcRenderer.on(...args);
    }
  }
});

contextBridge.exposeInMainWorld(
  'preload',
  {
    init: () => {
      if (process.env.NODE_ENV !== 'development') {
        return require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
      } else {
        return '/static';
      }
    }
  }
)
