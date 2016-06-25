exports.sass = [
  {
    src: [
      'assets/sass/**/*.scss'
    ],
    dest: 'public/css/',
    concat: false
  }
];

exports.js = [
  {
    src: [
      'assets/js/*.js',
      'assets/js/*/**/*.js'
    ],
    dest: 'public/js/',
    concat: true,
    destfile: 'app.js'
  }
];

exports.html = [
  {
    src: [
      'assets/html/**/*.html'
    ],
    dest: 'public/'
  }
];
