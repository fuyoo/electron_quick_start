const { Tray, screen } = require('electron')
const path = require('path')
const { createWindow } = require('./window')
    // 创建一个tray
const factory = () => {
        let tray
        return () => {
            if (tray && tray.isDestroyed()) {
                tray = null
            }
            if (!tray) {
                tray = new Tray(path.join(__dirname, 'icon.png'))
            }
            return tray
        }
    }
    // 注册trey事件
const register = () => {
    let tray
    return () => {
        const win = createWindow('tray')
        win.setAlwaysOnTop(true, 'pop-up-menu')
        win.on('blur', () => {
            win.hide()
        })
        tray = factory()()
        tray.on('click', () => {
            let win = createWindow('main')
            win.show()
        })
        tray.on('right-click', (ev, bounds) => {
            if (process.platform === 'win32') {
                const { x, y } = screen.getCursorScreenPoint()
                win.setPosition(x - 160, y - 230)
            } else {
                const { x, y } = bounds
                win.setPosition(x, y)
            }
            win.show()
        })
        return tray
    }
}


module.exports = register()