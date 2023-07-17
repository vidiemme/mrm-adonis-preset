const { install, template } = require('mrm-core')
const { join } = require('path')
const fs = require('fs')

const { addMiddleware, updateFile } = require('../utils')

function task() {
    install('elastic-apm-node', { dev: false })
    template('app/Middleware/ApmTransaction.ts', join(__dirname, 'templates', 'app_middleware_apmtransaction.ts.txt')).apply().save()
    template('config/apm.ts', join(__dirname, 'templates', 'config_apm.ts.txt')).apply().save()

    // https://git.vidiemme.it/Vidiemme/practice/node/boilerplate/server-node/-/snippets/9
    // update `app/Exceptions/Handler.ts`
    updateFile('app/Exceptions/Handler.ts', (data) => {
        const filePath = join(__dirname, 'templates', 'app_exceptions_handler.ts.txt')
        const template = fs.readFileSync(filePath, 'utf8')
        return data.replace(/export default class ExceptionHandler extends HttpExceptionHandler .*/, template)
    })
    // update `config/app.ts`
    updateFile('config/app.ts', (data) => {
        data = "import apm from 'elastic-apm-node'\n" + data
        const filePath = join(__dirname, 'templates', 'config_app.ts.txt')
        const template = fs.readFileSync(filePath, 'utf8')
        return data.replace(/export const logger: LoggerConfig .*/, template)
    })
    // update `server.ts`
    updateFile('server.ts', (data) => {
        return "require('elastic-apm-node').start(require('./config/apm').APMConfig)\n" + data
    })
    // update `start/kernel.ts` add middleware
    addMiddleware('App/Middleware/ApmTransaction')
}

task.description = 'Add Logger configuration to the project'

module.exports = task