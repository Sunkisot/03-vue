const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      filename: 'index.html',
    })

  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  devServer: {
    open: true,
    contentBase: './',
    hot: true,
    port: '8000',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8024/',
    //     pathRewrite: {
    //       '^/api': ""
    //     }
    //   }
    // }
  },
  devtool: 'eval-cheap-module-source-map'
}