module.exports = function( assetsDir, destDir ) {
  assetsDir = assetsDir || 'resources/assets/';
  destDir = destDir || 'public/';

  var resources = {};

  resources.sass = [
    {
      src: [
        assetsDir + 'sass/**/*.scss'
      ],
      dest: destDir + 'css/',
      concat: false
    }
  ];

  resources.js = [
    {
      src: [
        assetsDir + 'js/*.js',
        assetsDir + 'js/*/**/*.js'
      ],
      dest: destDir + 'js/',
      concat: true,
      destfile: 'app.js'
    }
  ];

  resources.html = [
    {
      src: [
        assetsDir + 'html/**/*.html'
      ],
      dest: destDir + ''
    }
  ];

  return resources;
};
