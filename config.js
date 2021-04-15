const path = require("path")
    // app路径
const APP_PATH = __dirname
    // 视图路径
const VIEW_PATH = path.join(APP_PATH, 'view')
    // 窗口路径
const WIN_PATH = path.join(APP_PATH, 'win')
const TPL_PATH = path.join(APP_PATH, 'tpl')
module.exports = {
    APP_PATH,
    VIEW_PATH,
    WIN_PATH,
    TPL_PATH,
    BASE_API_URL: 'http://api.com',
    BASE_VIEW_URL: 'http://baidu.com',
}