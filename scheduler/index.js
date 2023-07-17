const { install } = require('mrm-core')
const { exec } = require('node:child_process')

function task () {
    install('@vidiemme/adonis-scheduler', { dev: false })

    const child = exec("node ace configure @vidiemme/adonis-scheduler")
    child.stdin.write('\n')
}

task.description = 'TODO'

module.exports = task