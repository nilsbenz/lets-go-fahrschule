const ncp = require('ncp').ncp;
const rimraf = require('rimraf');
const minify = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
const babelMinify = require('@node-minify/babel-minify');

ncp.limit = 16;

rimraf('./build', () => {
  ncp('./src/icons', './build', (err) => {
    if (err) {
      console.error(err);
    }
    ncp('./src', './build', (err) => {
      if (err) {
        console.error(err);
      }
      rimraf('./build/icons', (err) => {
        if (err) {
          console.error(err);
        }
      });
      minify({
        compressor: babelMinify,
        input: './build/js/*.js',
        output: './build/js/$1.js',
        callback: function (err) {
          if (err) {
            console.error(err);
          }
        },
      });
      minify({
        compressor: cleanCSS,
        input: './build/css/*.css',
        output: './build/css/$1.css',
        callback: function (err) {
          if (err) {
            console.error(err);
          }
        },
      });
    });
  });
});
