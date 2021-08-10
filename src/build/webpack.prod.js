const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
process.env.NODE_ENV = 'production';
const mod = {
  rules: [
    {
      test: /\.?js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        // presets: ['@babel/preset-env'],
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
module.exports = [
  // umd
  merge(common, {
    mode: process.env.NODE_ENV,
    output: {
      filename: '[name].js',
      library: {
        type: 'umd',
      },
    },
    module: mod,
    optimization: optimization,
  }),
  // es6
  merge(common, {
    mode: process.env.NODE_ENV,
    experiments: {
      outputModule: true,
    },
    output: {
      filename: '[name].mjs',
      library: {
        type: 'module',
      },
    },
    module: mod,
    optimization: optimization,
  }),
];
