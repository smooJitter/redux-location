var path = require('path')
var webpack = require('webpack')
var npmPackage = require('../../package.json')

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-register',
    'babel-polyfill',
    path.join(__dirname, 'src', 'client')
  ],
  resolve: {
    alias: npmPackage._moduleAliases || {}
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel-loader'],
      exclude: /(node_modules|bower_components)/
    }]
  }
}
