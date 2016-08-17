var gulp = require('gulp');
var $ = require('./gulp-modules.js');
var utils = require('./utils.js');
var forEach = utils.forEach;
var resources = require('./resource.js')._resources;

function GulpTask() {}

GulpTask._taskNameList = [];

GulpTask.define = function(name, eachFn) {
  GulpTask._taskNameList.push(name);
  gulp.task(name, function() {
    forEach(resources[name], function(res) {
      eachFn(res);
    });
  });
};

GulpTask.templates = {};
GulpTask.templates.html = function() {
  return function(res) {
    gulp.src(res.src)
      .pipe($.errorHandler())
      .pipe($.html({minifyCSS: true, minifyJS: true}))
      .pipe(gulp.dest(res.dest));
  };
};
GulpTask.templates.sass = function() {
  return function(res) {
    gulp.src(res.src)
      .pipe($.errorHandler())
      .pipe(!$.options.production ? $.sourcemaps.init() : $.nop())
      .pipe(res.concat ? $.concat(res.destfile) : $.nop())
      .pipe($.sass({outputStyle: 'compressed'}))
      .pipe(!$.options.production ? $.sourcemaps.write('./') : $.nop())
      .pipe(gulp.dest(res.dest));
  };
};
GulpTask.templates.js = function() {
  return function(res) {
    gulp.src(res.src)
      .pipe($.errorHandler())
      .pipe(!$.options.production ? $.sourcemaps.init() : $.nop())
      .pipe(res.concat ? $.concat(res.destfile) : $.nop())
      .pipe($.uglify())
      .pipe(!$.options.production ? $.sourcemaps.write('./') : $.nop())
      .pipe(gulp.dest(res.dest));
  };
};

GulpTask.defineDefaultTasks = function() {
  gulp.task('default', GulpTask._taskNameList);

  gulp.task('w', ['watch']);
  gulp.task('watch', ['default'], function() {
    for( var resname in resources ) {
      forEach(resources[resname], eachFn);
    }
    function eachFn(res) {
      gulp.watch(res.src, [resname]);
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
