var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var html = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var concat = require('gulp-concat');
var nop = require('gulp-nop'); // No OPeration
var minimist = require('minimist');

var utils = require('./utils.js');
var forEach = utils.forEach;


module.exports = function(resources) {

  var opt = minimist(process.argv.slice(2), {
    alias: {
      p: 'production'
    },
    default: {
      production: false
    }
  });
  console.log(opt);

  gulp.task('sass', function() {
    forEach(resources.sass, function(res) {
      gulp.src(res.src)
        .pipe(plumber())
        .pipe(!opt.production ? sourcemaps.init() : nop())
        .pipe(res.concat ? concat(res.destfile) : nop())
        .pipe(sass({outputStyle: opt.production ? 'compressed' : 'expanded'}))
        .pipe(!opt.production ? sourcemaps.write('./') : nop())
        .pipe(gulp.dest(res.dest));
    });
  });

  gulp.task('js', function() {
    forEach(resources.js, function(res) {
      gulp.src(res.src)
        .pipe(plumber())
        .pipe(!opt.production ? sourcemaps.init() : nop())
        .pipe(res.concat ? concat(res.destfile) : nop())
        .pipe(opt.production ? uglify() : nop())
        .pipe(!opt.production ? sourcemaps.write('./') : nop())
        .pipe(gulp.dest(res.dest));
    });
  });

  gulp.task('html', function() {
    forEach(resources.html, function(res) {
      gulp.src(res.src)
        .pipe(plumber())
        .pipe(opt.production ? html() : nop())
        .pipe(gulp.dest(res.dest));
    });
  });

  gulp.task('default', [
    'sass',
    'js',
    'html'
  ]);

  gulp.task('w', ['watch']);
  gulp.task('watch', ['default'], function() {
    for( resname in resources ) {
      forEach(resources[resname], function(res) {
        gulp.watch(res.src, [resname]);
      });
    }
  });

  gulp.task('s', ['server']);
  gulp.task('server', function() {
    browser({
      server: {
        baseDir: 'public/'
      }
    });
  });
};
