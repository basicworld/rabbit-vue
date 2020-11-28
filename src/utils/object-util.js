/**
 * 对比两个对象的差异，返回有差异的item的对象，对象值来自newObj
 * @param {*} oldObj
 * @param {*} newObj
 */
export function diffObjectFunc(oldObj, newObj) {
  var diffObj
  // 如果存在undefied，则返回undefined
  if ((!oldObj) || (!newObj)) {
    return undefined
  }

  for (const k in oldObj) {
    if (oldObj[k] !== newObj[k]) {
      if (!diffObj) {
        diffObj = {}
      }
      diffObj[k] = newObj[k]
    }
  }

  return diffObj
}
