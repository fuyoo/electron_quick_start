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
                    width: 800,
                    height: 600,
                    show: true,
                    webPreferences: {
                        preload: path.join(cfg.APP_PATH, 'preload.js'),
                        enableRemoteModule: true
                    }
                })
                // win.webContents.openDevTools()
            win.loadFile(path.join(cfg.VIEW_PATH, 'main.html'))
        }
        return win
    }
})()