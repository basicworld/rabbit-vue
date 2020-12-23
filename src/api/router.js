import request from '@/utils/request'

/**
 * 路由列表
 */
export function getRoutersAPI() {
  return request({
    url: '/router',
    method: 'get'
  })
}

/**
 * 确认后台通讯是否正常
 */
export function areYouOk() {
  return request({
    url: '/ping',
    method: 'get'
  })
}
