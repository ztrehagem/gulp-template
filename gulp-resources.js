// each resources can be wrap array
// each src can be wrap array

var resources = {};

resources.sass = {
  src: 'assets/sass/**/*.scss',
  dest: 'public/css/'
};

resources.js = {
  src: [
    'assets/js/*.js',
    'assets/js/*/**/*.js'
  ],
  dest: 'public/js/',
  concat: true,
  destfile: 'app.js'
};

resources.html = {
  src: 'assets/html/**/*.html',
  dest: 'public/'
}

module.exports = resources;
