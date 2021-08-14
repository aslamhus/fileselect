const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
process.env.NODE_ENV = 'development';
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map', // source-map for no eval

  devServer: {
    open: true,
    openPage: 'test/index.html',
    watchContentBase: true,
    contentBase: path.join(__dirname, '../../'),
    publicPath: '/',
    compress: true,
    hot: true,
    host: 'localhost',
    port: 3000,
    https: false,
  },
});
