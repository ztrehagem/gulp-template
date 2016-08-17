var config = require('./config.js');
var utils = require('./utils.js');
var wrapArray = utils.wrapArray;

function Resource() {}
var resources = Resource._resources = {};

Resource.add = function(name, resource) {
  if(resource.constructor != Resource.Builder) return;
  (resources[name] = (resources[name] || [])).push(resource._get());
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

Resource.defaults = {};
Resource.defaults.sass = function() {
  return new Resource.Builder()
    .src('scss/**/*.scss')
    .dest('css/');
};
Resource.defaults.js = function() {
  return new Resource.Builder()
    .src('js/*.js')
    .src('js/*/**/*.js')
    .dest('js/')
    .concat(true)
    .destfile('app.js');
};
Resource.defaults.html = function() {
  return new Resource.Builder()
    .src('html/**/*.html')
    .dest('');
};
module.exports = Resource;
