const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
process.env.NODE_ENV = 'development';
const mod = {
  rules: [
    {
      test: /\.?js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-syntax-dynamic-import'],
      },
    },
  ],
};
const optimization = {
  minimizer: [
    new TerserPlugin({
      extractComments: false,
    }),
  ],
};
module.exports = merge(common, {
  // mode: process.env.NODE_ENV,
  mode: 'development',
  devtool: 'source-map', // source-map for no eval
  entry: {
    about: './src/about/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../../about'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'FileSelect about',
      template: './src/about/index.html',
      filename: './index.html',
      chunks: ['about', 'FileSelect'],
    }),
  ],
  module: mod,
  optimization: optimization,
});
