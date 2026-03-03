const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dev_build',
    historyApiFallback: {
      index: '/404.html',
      disableDotRule: true
    }
  },
  output: {
    path: path.resolve(__dirname, 'dev_build')
  }
})
