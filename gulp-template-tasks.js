var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var html = require('gulp-minify-html');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var concat = require('gulp-concat');
var nop = require('gulp-nop');
var gulpif = require('gulp-if');
var minimist = require('minimist');

var opt = minimist(process.argv.slice(2), {
  alias: {
    p: 'production'
  },
  default: {
    production: false
  }
});
console.log(opt);


var resources = require('./gulp-resources.js');


gulp.task('sass', function() {
  forEach(resources.sass, function(res) {
    gulp.src(res.src)
      .pipe(plumber())
      .pipe(gulpif(!opt.production, sourcemaps.init()))
      .pipe(sass())
      .pipe(gulpif(!opt.production, sourcemaps.write('./')))
      .pipe(gulp.dest(res.dest));
  });
});

gulp.task('js', function() {
  forEach(resources.js, function(res) {
    gulp.src(res.src)
      .pipe(plumber())
      .pipe(gulpif(!opt.production, sourcemaps.init()))
      .pipe(gulpif(res.concat, concat(res.destfile)))
      .pipe(gulpif(opt.production, uglify()))
      .pipe(gulpif(!opt.production, sourcemaps.write('./')))
      .pipe(gulp.dest(res.dest));
  });
});

gulp.task('html', function() {
  forEach(resources.html, function(res) {
    gulp.src(res.src)
      .pipe(plumber())
      .pipe(html())
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

function forEach(res, fn) {
  if( !res ) return;
  wrapArray(res).forEach(fn);
}

function wrapArray(obj) {
  return (Array.isArray(obj) ? obj : [obj]);
}
