const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: 'production',
  entry: {
    index: ["@babel/polyfill", './src/js/index.js', './src/css/index.sass'],
    // start: ['./src/js/start.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist/css/build/*.css']
    }),
  ]
};

module.exports = config;
