import request from '@/utils/request'
/**
 * 邮件参数验证
 */
export function emailConfigTestAPI(email) {
  return request({
    url: '/system/config/emailCheck/' + email,
    method: 'get'
  })
}
/**
 * 参数列表
 */
export function configListAPI() {
  return request({
    url: '/system/config/list',
    method: 'get'
  })
}
/**
 * 刷新配置缓存
 * @param {*} params
 */
export function configReCacheAPI() {
  return request({
    url: '/system/config/recache',
    method: 'get'
  })
}
/**
 * 保存配置
 * @param {*} data
 */
export function configUpdateAPI(data) {
  return request({
    url: '/system/config',
    method: 'put',
    data
  })
}
