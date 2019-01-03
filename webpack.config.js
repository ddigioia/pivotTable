const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    hot: true,
    proxy: {
      '/traffic': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/react',
                { 'plugins': ['@babel/plugin-proposal-class-properties'] }
              ]
            }
          },
          {
            loader: 'ify-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: ['autoprefixer']
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}
