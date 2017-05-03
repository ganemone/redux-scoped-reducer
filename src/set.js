export function set(keys, obj, value) {
  var clonedResult = cloneOnPath(keys, obj);
  var currentRef = clonedResult;
  var currentIndex = 0;
  while (currentIndex < keys.length - 1) {
    var currentKey = keys[currentIndex];
    currentRef = currentRef[currentKey];
    currentIndex++;
  }
  currentRef[keys[currentIndex]] = value;
  return clonedResult;
}

export function cloneOnPath(keys, obj) {
  var target = Object.assign({}, obj);
  return _cloneOnPath(keys, obj, target, 0);
}

function _cloneOnPath(keys, obj, target, startIndex) {
  var currentKey = keys[startIndex];
  if (target[currentKey] === null || target[currentKey] === undefined) {
    target[currentKey] = {};
    obj[currentKey] = {};
  } else if (typeof target[currentKey] === 'object') {
    target[currentKey] = Object.assign({}, obj[currentKey]);
  }
  if (startIndex === keys.length - 1) {
    return target;
  }
  _cloneOnPath(keys, target[currentKey], obj[currentKey], startIndex + 1);
  return target;
}
