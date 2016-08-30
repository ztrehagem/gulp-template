var $ = module.exports = {};

$.gulp = require('gulp');
$.sass = require('gulp-sass');
$.uglify = require('gulp-uglify');
$.html = require('gulp-minify-html');
$.rename = require('gulp-rename');
$.replace = require('gulp-replace');
$.sourcemaps = require('gulp-sourcemaps');
$.plumber = require('gulp-plumber');
$.browser = require('browser-sync');
$.concat = require('gulp-concat');
$.nop = require('gulp-nop'); // No OPeration
var notifier = require('node-notifier');

var minimist = require('minimist');

$.options = minimist(process.argv.slice(2), {
  alias: {
    p: 'production'
  },
  default: {
    production: false
  }
});

$.errorHandler = function() {
  return $.plumber(function(error) {
    notifier.notify({
      title: error.plugin,
      message: error.message
    });

    console.log('\n====== ERROR [' + error.plugin + '] ======');
    console.log(error);
  });
};
