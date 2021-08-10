const path = require('path');
module.exports = {
  name: 'FileSelect',
  devtool: 'source-map',
  entry: {
    FileSelect: './src/FileSelect.js', // chunkname main
  },
  // target: 'web',
  output: {
    path: path.resolve(__dirname, '../../lib'), // default value
    filename: '[name].js',
    chunkFilename: 'utils/[name].js',
    publicPath: 'auto',
  },
};
