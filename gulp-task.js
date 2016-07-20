var gulp = require('gulp');
var $ = require('./gulp-modules.js');
var utils = require('./utils.js');
var forEach = utils.forEach;
var errorHandler = utils.errorHandler;
var resources = require('./resource.js')._resources;

function GulpTask() {}
GulpTask.define = function(name, eachFn) {
  gulp.task(name, function() {
    forEach(resources[name], function(res) {
      eachFn(res);
    });
  });
}

GulpTask.defineDefaults = function() {
  GulpTask.define('sass', function(res) {
    gulp.src(res.src)
      .pipe($.plumber(errorHandler))
      .pipe(!$.options.production ? $.sourcemaps.init() : $.nop())
      .pipe(res.concat ? $.concat(res.destfile) : $.nop())
      .pipe($.sass({outputStyle: 'compressed'}))
      .pipe(!$.options.production ? $.sourcemaps.write('./') : $.nop())
      .pipe(gulp.dest(res.dest));
  });

  GulpTask.define('js', function(res) {
    gulp.src(res.src)
      .pipe($.plumber(errorHandler))
      .pipe(!$.options.production ? $.sourcemaps.init() : $.nop())
      .pipe(res.concat ? $.concat(res.destfile) : $.nop())
      .pipe($.uglify())
      .pipe(!$.options.production ? $.sourcemaps.write('./') : $.nop())
      .pipe(gulp.dest(res.dest));
  });

  GulpTask.define('html', function(res) {
    gulp.src(res.src)
      .pipe($.plumber(errorHandler))
      .pipe($.html({minifyCSS: true, minifyJS: true}))
      .pipe(gulp.dest(res.dest));
  });

  gulp.task('default', Object.keys(resources));

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
    $.browser({
      server: {
        baseDir: 'public/'
      }
    });
  });
};

module.exports = GulpTask;
