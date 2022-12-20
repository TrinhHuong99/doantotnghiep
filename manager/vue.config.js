const path = require('path')
const Config = require('./config')
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  publicPath: Config.baseURL,
  parallel: false,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          includePaths: ['./node_modules', './src/assets'],
        },
      },
    },
  },
  configureWebpack: {
     plugins: [
            // CKEditor needs its own plugin to be built using webpack.
            new CKEditorWebpackPlugin({
                // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                language: 'en',

                // Append translations to the file matching the `app` name.
                translationsOutputFile: /app/,
            }),
        ],
    resolve: {
      alias: {
        '@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
        '@core': path.resolve(__dirname, 'src/@core'),
        '@validations': path.resolve(__dirname, 'src/@core/utils/validations/validations.js'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

        // Then you can either:
        //
        // * clear all loaders for existing 'svg' rule:
        //
        // svgRule.uses.clear();
        //
        // * or exclude ckeditor directory from node_modules:
      svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

      svgRule.exclude.add(path.join(__dirname, 'node_modules', '@wiris'))
     config.module
            .rule('cke-svg')
            .test(/theme[/\\]icons[/\\][^/\\]+\.svg$/)
            .use('raw-loader')
            .loader('raw-loader')

        // (2.) Transpile the .css files imported by the editor using PostCSS.
        // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
    config.module
        .rule('cke-css')
        .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
        .use('postcss-loader')
        .loader('postcss-loader')
        .tap(() => styles.getPostCssConfig({
                themeImporter: {
                    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                },
                minify: true,
      }));
    config.module.rules.delete('eslint')
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // eslint-disable-next-line no-param-reassign
        options.transformAssetUrls = {
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': ['src', 'blank-src'],
          'b-card': 'img-src',
          'b-card-img': 'src',
          'b-card-img-lazy': ['src', 'blank-src'],
          'b-carousel-slide': 'img-src',
          'b-embed': 'src',
        }
        return options
      })
  },
  transpileDependencies: ['vue-echarts', 'resize-detector',/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,],
}
