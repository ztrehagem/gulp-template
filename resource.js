var config = require('./config.js');
var utils = require('./utils.js');
var wrapArray = utils.wrapArray;
var forEach = utils.forEach;

function Resource() {}

var _resources = Resource._resources = {};

Resource.add = function(name, resources) {
  resources = Array.prototype.slice.call(arguments, 1);

  resources.forEach(function(resource) {
    forEach(resource, function(res) {
      if(res.constructor != Resource.Builder) return;
      (_resources[name] = (_resources[name] || [])).push(res._get());
    });
  });
};

Resource.Builder = function(resource) {
  this.resource = resource || {};
};
Resource.Builder.prototype._get = function() {
  return this.resource;
};
Resource.Builder.prototype.src = function(src) {
  this.resource.src = this.resource.src || [];
  Array.prototype.push.apply(this.resource.src, wrapArray(src).map(function(src) {
    return config.srcDir + src;
  }));
  return this;
};
Resource.Builder.prototype.dest = function(dest) {
  this.resource.dest = config.destDir + dest;
  return this;
};
Resource.Builder.prototype.concat = function(concat) {
  this.resource.concat = concat;
  return this;
};
Resource.Builder.prototype.destfile = function(destfile) {
  this.resource.destfile = destfile;
  return this;
};
Resource.Builder.prototype.option = function(name, obj) {
  this.resource[name] = obj;
  return this;
};

Resource.templates = {};
Resource.templates.sass = function() {
  return new Resource.Builder()
    .src('scss/**/*.scss')
    .dest('css/');
};
Resource.templates.js = function() {
  return new Resource.Builder()
    .src('js/*.js')
    .src('js/*/**/*.js')
    .dest('js/')
    .concat(true)
    .destfile('app.js');
};
Resource.templates.html = function() {
  return new Resource.Builder()
    .src('html/**/*.html')
    .dest('');
};
module.exports = Resource;
