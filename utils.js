function forEach(res, fn) {
  if( !res ) return;
  wrapArray(res).forEach(fn);
}

function wrapArray(obj) {
  return (Array.isArray(obj) ? obj : [obj]);
}

exports.forEach = forEach;
exports.wrapArray = wrapArray;
