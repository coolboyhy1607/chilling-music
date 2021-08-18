/**
 * Require Browsersync along with webpack and middleware for it
 */
 var browserSync = require('browser-sync');
 var webpack = require('webpack');
 var webpackDevMiddleware = require('webpack-dev-middleware');
 var webpackHotMiddleware = require('webpack-hot-middleware');
 
 var webpackConfig = require('./webpack.config');
 var bundler = webpack(webpackConfig);
 
 browserSync({
     server: {
       baseDir: 'build',
 
       middleware: [
         webpackDevMiddleware(bundler, {
           publicPath: webpackConfig.output.publicPath,
           stats: { colors: true }
           // http://webpack.github.io/docs/webpack-dev-middleware.html
         }),
 
         webpackHotMiddleware(bundler)
       ]
     },
 
     files: [
       'src/*.css',
       'public/index.html'
     ]
 });