const { json, template} = require('mrm-core')
const { join } = require('path')

function task() {
    const providers = json('.adonisrc.json').get('providers')
    if (!providers.includes('./providers/RouteValidatorProvider')) {
        providers.push('./providers/RouteValidatorProvider')
    }
    json('.adonisrc.json').merge({'providers': providers}).save()

    template('app/Validators/BaseValidator.ts', join(__dirname, 'templates', 'app_validators_basevalidator.ts.txt')).apply().save()
    template('providers/RouteValidatorProvider.ts', join(__dirname, 'templates', 'providers_routevalidatorprovider.ts.txt')).apply().save()
    template('contracts/request.ts', join(__dirname, 'templates', 'contracts_request.ts.txt')).apply().save()
    template('contracts/route.ts', join(__dirname, 'templates', 'contracts_route.ts.txt')).apply().save()
}

task.description = 'Add BaseValidator to the project'

module.exports = task