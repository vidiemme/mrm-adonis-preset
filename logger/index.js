const { template, install} = require('mrm-core')
const { join } = require('path')
const fs = require('fs')

const { addMiddleware, updateFile } = require('../utils')

function task() {
    install('on-finished', { dev: false })
    template('app/Middleware/HttpLogger.ts', join(__dirname, 'templates', 'app_middleware_httplogger.ts.txt')).apply().save()

    // https://git.vidiemme.it/Vidiemme/practice/node/boilerplate/server-node/-/snippets/8
    // update `start/kernel.ts` add middleware
    addMiddleware('App/Middleware/HttpLogger')
    // update `config/app.ts`
    updateFile('config/app.ts', (data) => {
        const filePath = join(__dirname, 'templates', 'config_app.ts.txt')
        const template = fs.readFileSync(filePath, 'utf8')
        return data.replace(/prettyPrint: .*/, template)
    })
    // update `env.ts` add variable
    updateFile('env.ts', (data) => {
        const filePath = join(__dirname, 'templates', 'env.ts.txt')
        const template = fs.readFileSync(filePath, 'utf8')
        return data.replace(/NODE_ENV: .*/, template)
    })
}

task.description = 'Add Logger configuration to the project'

module.exports = task
