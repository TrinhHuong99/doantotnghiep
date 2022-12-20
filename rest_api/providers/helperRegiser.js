
const { ServiceProvider } = require("@adonisjs/fold")

class HelperProvider extends ServiceProvider {
    register () {
        this.app.singleton('Test/Helper', () => {
            const Config = this.app.use('Adonis/Src/Config');
            const Helper = require('./Helper');
            return new Helper(Config);
        })
    }
}

module.exports = HelperProvider