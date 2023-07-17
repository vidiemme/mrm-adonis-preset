const { template} = require('mrm-core')
const { join } = require('path')

function task() {
    template('Dockerfile', join(__dirname, 'templates', 'Dockerfile')).apply().save()
    template('scripts/start.sh', join(__dirname, 'templates', 'start.sh')).apply().save()
}

task.description = 'Add base Dockerfile and the start.sh to the project'

module.exports = task