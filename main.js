// 导入相关库
const { app, BrowserWindow, Menu } = require('electron')
    // view html可用的remote库
require('@electron/remote/main').initialize()
    // 主进程监听视图发来的消息
require('./ipc')
    // 导入创建窗口函数
const { createWindow } = require('./window')
    // 设置env取消electron的警告消息
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// app准备就绪
app.whenReady().then(() => {
    // 删除默认的菜单项
    Menu.setApplicationMenu(null)
        // 初始化窗口
    createWindow('login')
        // mac DOC栏图标点击事件
    app.on('activate', () => {
        // 创建窗口
        if (BrowserWindow.getAllWindows().length === 0) {
            // 如果token纯在登录到主界面
            if (process.token) {
                createWindow('main')
                return
            }
            // 否则登录界面
            createWindow('login')
        }
    })
})

// 所有窗口关闭直接退出app
app.on('window-all-closed', () => {
    // 不是mac才关闭
    if (process.platform !== 'darwin') {
        app.quit()
    }
})