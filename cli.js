const readline = require('readline')
const config = require('./config')
const fs = require('fs')
const path = require('path')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "功能清单：\n1:创建窗口\n2:创建视图\nQ.退出\n请选择功能："
})

rl.on('line', data => {
    switch (data.toString()) {
        case "1":
            createWindow()
            break
        case "2":
            createView()
            break
        default:
            if (data.toString().toLowerCase() !== 'q') {
                process.stdout.write("选择错误，请重新选择:")
                return
            }
            rl.close()
            process.exit(0)
    }
})

rl.prompt()

// 创建html文件
function createView() {
    rl.question("请输入视图文件名：", view => {
        // 校验下view文件是否存在
        const file = path.join(config.VIEW_PATH, view + '.html')
        try {
            // 校验下view文件是否存在
            fs.statSync(file)
            console.log(`视图文件已存在！`)
        } catch (e) {
            // 不纯在写如数据
            let data = fs.readFileSync(path.join(config.TPL_PATH, 'view.tpl'))
            data = data.toString().replace('${view}', view)
            fs.writeFileSync(file, data)
            console.log('视图文件创建成功！')
        }

        rl.prompt()
    })
}
// 创建窗口文件
function createWindow() {
    rl.question("请输入窗口文件名：", win => {
        rl.question('请输入视图名：', view => {
            const file = path.join(config.WIN_PATH, win + '.js')
            try {
                fs.statSync(file)
                console.log(`窗口文件已存在！`)
            } catch (e) {
                let data = fs.readFileSync(path.join(config.TPL_PATH, 'window.tpl'))
                data = data.toString().replace('${view}', view)
                fs.writeFileSync(file, data)
                console.log('窗口文件创建成功！')
            }
            rl.prompt()
        })
    })

}