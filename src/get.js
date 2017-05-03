export function get(keys, obj) {
  var currentIndex = 0;
  var currentItem = obj;
  while(currentIndex < keys.length && currentItem !== null && currentItem !== undefined) {
    currentItem = currentItem[keys[currentIndex]];
    currentIndex++;
  }
  return currentItem;
}
