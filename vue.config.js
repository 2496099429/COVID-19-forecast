const webpack = require('webpack');
module.exports = {


  publicPath: "./",
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({

        $:"jquery",

        jQuery:"jquery",

        "windows.jQuery":"jquery"

      })
    ],
    devServer: {
      host: '127.0.0.1',
      port: 8080,
      disableHostCheck: true,
      publicPath: '/'
    }


  }
}
