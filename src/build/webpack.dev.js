const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map', // source-map for no eval
  entry: {
    test: './test/index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'FileSelect test',
      template: './test/index.html',
      filename: './test/index.html',
      chunks: ['test', 'FileSelect'],
    }),
  ],
  devServer: {
    // devMiddleware: {
    //   publicPath: '/',
    // },
    static: {
      // directory: path.join(__dirname, '../../test'),
      // publicPath: '',
    },
    open: ['./test/index.html'],
    // compress: true,
    // liveReload: false,
    hot: true,
    host: 'localhost',
    port: 3000,
    https: false,
  },
});
