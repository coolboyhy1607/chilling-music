const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack =require('webpack');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['webpack/hot/dev-server', 'webpack-hot-middleware/client', './src/index'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader']
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
          }
        },
        
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ]
  },
  resolve: {
    extensions: ['*', '.jsx','.js','.tsx','.ts']
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',


  },
  devServer: {
    open: true,
    writeToDisk: true,
    host: 'localhost',
    port:3000,
    contentBase: path.join(__dirname, 'public'),
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  externals: {
    'react': 'react'
  },
};