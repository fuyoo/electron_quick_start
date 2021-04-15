// window工具方法
const path = require("path")
const cfg = require('./config')

function createWindow(name) {
    const win = require(path.join(cfg.WIN_PATH, name + '.js'))
    win()
    return win()
}
module.exports = { createWindow }