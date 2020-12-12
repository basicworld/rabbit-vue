import request from '@/utils/request'

/**
 * 日志类型列表
 */
export function logtypeListAPI() {
  return request({
    url: '/system/log/logtype/list',
    method: 'get'
  })
}
/**
 * 日志列表
 * @param {*} params
 */
export function logListAPI(params) {
  return request({
    url: '/system/log/list',
    method: 'get',
    params
  })
}
/**
 * 获取日志详情
 * @param {*} params
 */
export function logGetAPI(logId) {
  return request({
    url: '/system/log/' + logId,
    method: 'get'
  })
}
