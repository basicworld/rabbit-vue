/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  if (undefined === str) {
    return false
  }
  if (str.length < 5 || str.length > 30) {
    return false
  }
  return true
}
/**
 * 手机号校验
 * @param {*} str
 */
export function validCellphone(str) {
  const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
  return reg.test(str)
}
