const path = require('path')
const Config = require('./config')
module.exports = {
    devServer: {
        host: 'localhost'
    },
    publicPath: Config.baseURL,
    configureWebpack: {
        resolve: {
            alias: {
                '@axios': path.resolve(__dirname, 'src/libs/axios'),
            },
        },
    },
    runtimeCompiler: true
}