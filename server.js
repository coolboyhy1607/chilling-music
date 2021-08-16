var express = require("express");
var browserify  = require('browserify-middleware');
var babelify = require("babelify");
var browserSync = require('browser-sync');
var app = express();
var port = process.env.PORT || 3000;

browserify.settings ({
  transform: [babelify.configure({
  })],
  presets: ["es2015", "react"],
  extensions: ['.js', '.jsx','.js','.tsx'],
  grep: /\.jsx?$/
});

app.get('/bundle.js', browserify(__dirname+'/src/index.tsx'));

app.get(['*.png','*.jpg','*.css','*.map'], function (req, res) {
  res.sendFile(__dirname+"/public/"+req.path);
});
app.get('*', function (req, res) {
  res.sendFile(__dirname+"/public/index.html");
});
// Run the server
app.listen(port,function() {
  browserSync ({
    proxy: 'localhost:' + port,
        files: ['src/components/*.{jsx}','build/static/css/*.{css}'],
    options: {
      ignored: 'node_modules'
    }
  });
});