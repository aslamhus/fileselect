const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';
module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map', // source-map for no eval
  entry: {
    about: './src/about/index.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'FileSelect test',
      template: './src/about/index.html',
      filename: './about/index.html',
      chunks: ['about', 'FileSelect'],
    }),
  ],
  devServer: {
    // devMiddleware: {
    //   publicPath: '/',
    // },
    // static: {
    // directory: path.join(__dirname, '../../test'),
    // publicPath: '',
    // },
    open: ['./about/index.html'],
    // compress: true,
    // liveReload: false,
    hot: true,
    host: 'localhost',
    port: 3000,
    // https: false,
  },
});
