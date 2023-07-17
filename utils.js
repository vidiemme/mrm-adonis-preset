const fs = require('fs')

function addMiddleware(middlewareName, filePath = 'start/kernel.ts') {
    return updateFile(filePath, (data) => {
        return data.replace(
            /Server.middleware.register\(\[\s*([\s\S]+?)\s*\]\)/,
            `Server.middleware.register([\n    $1,\n    () => import('${middlewareName}')\n])`
        )
    })
}

function updateFile(filePath, cb) {
    const data = fs.readFileSync(filePath, 'utf8')
    // Replace the original middleware array with the modified one
    const newContent = cb(data)
    // Overwrite the file with the new content
    return fs.writeFileSync(filePath, newContent)
}

function copyFile(destination, originaleFile) {
    const data = fs.readFileSync(originaleFile, 'utf8')
    return fs.writeFileSync(destination, data)
}

module.exports = {
    addMiddleware,
    updateFile,
    copyFile
}
