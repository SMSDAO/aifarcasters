const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  send: (channel, data) => {
    const allowedChannels = ['app:minimize', 'app:maximize', 'app:close'];
    if (!allowedChannels.includes(channel)) return;
    // Only allow serializable primitives/plain objects as data
    if (data !== undefined && (typeof data === 'function' || typeof data === 'symbol')) return;
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    const allowedChannels = ['app:update-available', 'app:theme-changed'];
    if (!allowedChannels.includes(channel)) return;
    if (typeof func !== 'function') return;
    ipcRenderer.on(channel, (_event, ...args) => func(...args));
  },
});
