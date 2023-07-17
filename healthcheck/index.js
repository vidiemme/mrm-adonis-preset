const { join } = require('path')
const fs = require('fs')

const {updateFile} = require("../utils")

function task() {
    updateFile('start/routes.ts', (data) => {
        const templateRoute = fs.readFileSync(join(__dirname, 'templates', 'start_routes.ts.txt'), 'utf8')
        return data.replace(
            "import Route from '@ioc:Adonis/Core/Route'",
            "import Route from '@ioc:Adonis/Core/Route'\nimport HealthCheck from '@ioc:Adonis/Core/HealthCheck'"
        ) + '\n' + templateRoute
    })
}

task.description = 'Add healthcheck route to the project'

module.exports = task