import request from '@/utils/request'

/**
 * 路由列表
 */
export function getRoutersAPI() {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}
