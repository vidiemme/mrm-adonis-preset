const { install } = require('mrm-core')
const { exec } = require('node:child_process')

function task () {
    install('@vidiemme/adonis-scheduler', { dev: false })
    exec('node ace configure @vidiemme/adonis-scheduler', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`)
        }
    })
}

task.description = 'TODO'

module.exports = task