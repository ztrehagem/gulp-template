var $ = require('./gulp-modules.js');
var utils = require('./utils.js');
var forEach = utils.forEach;
var resources = require('./resource.js')._resources;

function GulpTask() {}

var _tasks = GulpTask._tasks = {};

GulpTask.add = function(name, taskFuncs) {
  taskFuncs = Array.prototype.slice.call(arguments, 1);

  taskFuncs.forEach(function(taskFunc) {
    forEach(taskFunc, function(func) {
      if(typeof func !== 'function') return;
      (_tasks[name] = (_tasks[name] || [])).push(func);
    });
  });
};

GulpTask.define = function() {
  Object.keys(_tasks).forEach(function(name) {
    $.gulp.task(name, function() {
      forEach(resources[name], function(res) {
        forEach(_tasks[name], function(func) {
          func(res);
        });
      });
    });
  });
};

GulpTask.templates = {};
GulpTask.templates.html = function() {
  return function(res) {
    $.gulp.src(res.src)
      .pipe($.errorHandler())
      .pipe($.html({minifyCSS: true, minifyJS: true}))
      .pipe($.gulp.dest(res.dest));
  };
};
GulpTask.templates.sass = function() {
  return function(res) {
    $.gulp.src(res.src)
      .pipe($.errorHandler())
      .pipe(!$.options.production ? $.sourcemaps.init() : $.nop())
      .pipe(res.concat ? $.concat(res.destfile) : $.nop())
      .pipe($.sass({outputStyle: 'compressed'}))
      .pipe(!$.options.production ? $.sourcemaps.write('./') : $.nop())
      .pipe($.gulp.dest(res.dest));
  };
};
GulpTask.templates.js = function() {
  return function(res) {
    $.gulp.src(res.src)
      .pipe($.errorHandler())
      .pipe(!$.options.production ? $.sourcemaps.init() : $.nop())
      .pipe(res.concat ? $.concat(res.destfile) : $.nop())
      .pipe($.uglify())
      .pipe(!$.options.production ? $.sourcemaps.write('./') : $.nop())
      .pipe($.gulp.dest(res.dest));
  };
};

GulpTask.defineDefaultTasks = function() {
  $.gulp.task('default', Object.keys(_tasks));

  $.gulp.task('w', ['watch']);
  $.gulp.task('watch', ['default'], function() {
    for( var resname in resources ) {
      forEach(resources[resname], eachFn);
    }
    function eachFn(res) {
      $.gulp.watch(res.src, [resname]);
    }
  });

  $.gulp.task('s', ['server']);
  $.gulp.task('server', function() {
    $.browser({
      server: {
        baseDir: 'public/'
      }
    });
  });
};

module.exports = GulpTask;
