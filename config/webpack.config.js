var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../build');
var APP_DIR = path.resolve(__dirname, '../app');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.scss/,
        include: APP_DIR + '/assets/',
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};

module.exports = config;