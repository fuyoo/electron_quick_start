const path = require('path')
const cfg = require("../config")
const { BrowserWindow } = require('electron')
module.exports = (() => {
    let win
    return () => {
        if (win && win.isDestroyed()) {
            win = null
        }
        if (!win) {
            win = new BrowserWindow({
                width: 160,
                height: 230,
                show: false,
                frame: false,
                maximizable: false,
                resizable: false,
                minimizable: false,
                type: 'toolbar',
                webPreferences: {
                    preload: path.join(cfg.APP_PATH, 'preload.js'),
                    enableRemoteModule: true
                }
            })
            win.loadFile(path.join(cfg.VIEW_PATH, 'tray.html'))
        }
        return win
    }
})()