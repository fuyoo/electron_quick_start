// 预加载js脚本 
const cfg = require('./config')
const { ipcRenderer, contextBridge } = require("electron")
const remote = require('@electron/remote')
const { session } = remote
// 暴露一个process变量到html的window上
contextBridge.exposeInMainWorld('process', {
    close: () => {
        remote.getCurrentWindow().close()
    },
    login: (data) => {
        return new Promise((resolve, reject) => {
            const cookie = { url: cfg.BASE_VIEW_URL, name: 'Admin-Token', value: data.token }
            session.defaultSession.cookies.set(cookie)
                .then(res => {
                    ipcRenderer.send('login', data)
                    ipcRenderer.send('main')
                    resolve(res)
                }, err => {
                    reject(err)
                })
        })
    },
    logout: () => {
        ipcRenderer.sendSync('logout')
        ipcRenderer.open('login')
    },
    //打开窗口方法
    open: name => {
        return ipcRenderer.sendSync("open", name)
    },
    exit() {
        ipcRenderer.sendSync("exit")
    },
    hide() {
        remote.getCurrentWindow().hide()
    },
    show() {
        remote.getCurrentWindow().show()
    },
    focus() {
        remote.getCurrentWindow().focus()
    },
    token() {
        return ipcRenderer.sendSync('token')
    },
    user() {
        return ipcRenderer.sendSync('user')
    },
    api(path) {
        return cfg.BASE_API_URL + path
    },
    http() {
        return cfg.BASE_VIEW_URL
    },
    // ajax封装方法
    request(data) {
        const { url, method, responseType } = data
        delete data.url
        delete data.method
        delete data.responseType
        return fetch(cfg.BASE_API_URL + url,
                Object.assign({
                    method: 'GET' || method.toUpperCase(),
                    headers: {
                        Authorization: ipcRenderer.sendSync('token')
                    }
                }, data))
            .then(res => {
                switch (responseType) {
                    case 'arrayBuffer':
                        return res.arrayBuffer()
                    case 'blob':
                        return res.blob()
                    case 'clone':
                        return res.clone()
                    case 'formData':
                        return res.formData()
                    case 'json':
                        return res.json()
                    case 'text':
                        return res.text()
                    case 'error':
                        return res.error()
                    case 'redirect':
                        return res.redirect()
                    default:
                        return res.json()
                }
            })
    }
})