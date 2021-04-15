// 导入主线IPC
const { ipcMain } = require('electron')
    // 导入任务栏工具
const tray = require('./tray')
    // 导入窗口创建工具
const { createWindow } = require('./window')
    // 监听窗口发来的创建窗口事件
ipcMain.on("open", (ev, playod) => {
        createWindow(playod).show()
        ev.returnValue = true
    })
    // 监听登录事件
ipcMain.on("login", (ev, data) => {
        createWindow('main')
        tray()
        process.token = data.token
        process.user = data.data
        ev.returnValue = true
    })
    // 监听退出事件
ipcMain.on("logout", (ev) => {
    delete process.user
    delete process.token
    tray().destroy()
    ev.returnValue = true
})

// 获取token事件
ipcMain.on("token", ev => {
        ev.returnValue = process.token
    })
    // 获取用户信息事件
ipcMain.on("user", ev => {
        ev.returnValue = process.user
    })
    // 退出事件
ipcMain.on('exit', () => {
    process.exit(0)
})