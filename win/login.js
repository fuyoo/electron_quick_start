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
                    width: 360,
                    height: 300,
                    show: true,
                    resizable: false,
                    maximizable: false,
                    minimizable: false,
                    webPreferences: {
                        preload: path.join(cfg.APP_PATH, 'preload.js'),
                        enableRemoteModule: true
                    }
                })
                // win.webContents.openDevTools()
            win.loadFile(path.join(cfg.VIEW_PATH, 'login.html'))
        }
        return win
    }
})()