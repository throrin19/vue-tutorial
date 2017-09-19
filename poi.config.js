const path = require('path')
const pkg = require('./package')

module.exports = {
    entry: [
        'src/polyfills.js',
        'src/index.js'
    ],
    extractCSS: true,
    html: {
        title: pkg.productName,
        description: pkg.description,
        template: path.join(__dirname, 'index.ejs')
    },
    postcss: {
        plugins: [
            // Your postcss plugins
        ]
    },
    extendWebpack(config) {
        config.merge({
            resolve : {
                alias : {
                    styles     : path.resolve(__dirname, './src/stylesheets'),
                    plugins    : path.resolve(__dirname, './src/plugins'),
                    mixins     : path.resolve(__dirname, './src/mixins'),
                    libs       : path.resolve(__dirname, './src/libs'),
                    config     : path.resolve(__dirname, './src/config'),
                    components : path.resolve(__dirname, './src/components'),
                    assets     : path.resolve(__dirname, './src/assets'),
                },
            },
            devtool : '#cheap-module-source-map',
        });
    },
    presets: [
        require('poi-preset-bundle-report')(),
        require('poi-preset-offline')({
            pwa: './src/pwa.js', // Path to pwa runtime entry
            pluginOptions: {} // Additional options for offline-plugin
        }),
        require('poi-preset-eslint')({
            loaderOptions : {
                configFile  : path.resolve(__dirname, './.eslintrc.json'),
                useEslintrc : true,
            },
            mode : '*',
        }),
    ],
}
