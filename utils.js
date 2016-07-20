var gulp = require('gulp');
var notifier = require('node-notifier');

function forEach(res, fn) {
  if( !res ) return;
  wrapArray(res).forEach(fn);
}
exports.forEach = forEach;


function wrapArray(obj) {
  return (Array.isArray(obj) ? obj : [obj]);
}
exports.wrapArray = wrapArray;


function errorHandler(error) {
  notifier.notify({
    title: error.plugin,
    message: error.message
  });

  console.log('\n====== ERROR [' + error.plugin + '] ======');
  console.log(error);
}
exports.errorHandler = errorHandler;
