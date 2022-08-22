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
  output: {
    path: path.resolve(__dirname, '../../test/'),
    hotUpdateChunkFilename: './hmr/[id].[fullhash].hot-update.js',
    hotUpdateMainFilename: './hmr/[runtime].[fullhash].hot-update.json',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'FileSelect test',
      template: './test/index.html',
      filename: './test/index.html',
      chunks: ['test'],
    }),
  ],
  devServer: {
    devMiddleware: {
      serverSideRender: false,
      writeToDisk: true,
    },
    // static: './',
    open: ['./test/index.html'],
    compress: true,
    liveReload: false,
    hot: true,
    host: 'localhost',
    port: 3000,
    https: false,
  },
});
