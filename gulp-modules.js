exports.sass = require('gulp-sass');
exports.uglify = require('gulp-uglify');
exports.html = require('gulp-minify-html');
exports.sourcemaps = require('gulp-sourcemaps');
exports.plumber = require('gulp-plumber');
exports.browser = require('browser-sync');
exports.concat = require('gulp-concat');
exports.nop = require('gulp-nop'); // No OPeration

var minimist = require('minimist');

exports.options = minimist(process.argv.slice(2), {
  alias: {
    p: 'production'
  },
  default: {
    production: false
  }
});
