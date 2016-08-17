function forEach(res, fn) {
  if( !res ) return;
  wrapArray(res).forEach(fn);
}
exports.forEach = forEach;


function wrapArray(obj) {
  return (Array.isArray(obj) ? obj : [obj]);
}
exports.wrapArray = wrapArray;
