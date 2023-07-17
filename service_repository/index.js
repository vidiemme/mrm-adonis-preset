const { template} = require('mrm-core')
const { join } = require('path')

function task() {
    template('app/Services/Abstract/BaseService.ts', join(__dirname, 'templates', 'app_services_abstract_baseservice.ts.txt')).apply().save()
    template('app/Repositories/Abstract/LucidRepository.ts', join(__dirname, 'templates', 'app_repositories_abstract_lucidrepository.ts.txt')).apply().save()
}

task.description = 'Add base Service and Repository to the project'

module.exports = task