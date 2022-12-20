'use strict'

class Helper {
    constructor (Config) {
        this.Config = Config
    }

    replaceUrl (string) {
        if (string && typeof string === 'string') {
            return string.replace(/\[(\w*)\]/g, (m, key) => {
                return this.Config.get('app.BASE_URL').hasOwnProperty(key) ? this.Config.get('app.BASE_URL')[key] : m
            })
        }

        return string
    }
}

module.exports = Helper