const path = require("path");
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { webpack } = require("webpack");
process.env.NODE_ENV = 'development';
module.exports = merge(common, {
    mode : 'development',
    devtool : 'source-map', // source-map for no eval
    
    output : {
        // filename: '[name]-[contenthash].bundle.js',
        publicPath: '/',
    },
    snapshot: {
      managedPaths: []
    },
    //  plugins : [
    //   new webpack.HotModuleReplacementPlugin()
    // ],
    devServer: {
        open : true,
        openPage: 'admin/index.html',
        watchContentBase: true,
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/',
        compress: true,
        hot : true,
        host: 'local.photography',
        port: 8888,
        https: false
      },
    
})