const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(tsx|ts)$/,
        use: 'ts-loader'
      },
      {
        test: /\.(css)$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png|mp3)$/,
        use: {
          loader: 'file-loader',
          options: {
              outputPath: 'images',
              type: 'asset',
          }
        },
      },
    ]
  },
  resolve: {
    extensions: ['*', '.jsx','.js','.tsx','.ts']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',

  },
  devServer: {
    open: true,
    host: 'localhost',
    port:3002,
    contentBase: path.resolve(__dirname, './build'),
    historyApiFallback: {
      rewrites:[
        {from: /^\/$/, to: '/index.html'}
      ]
    },
    watchOptions: {
      ignored: /node_modules/
    }
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  externals: {
    'react': 'react'
  },
};