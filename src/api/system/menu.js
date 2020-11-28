import request from '@/utils/request'
/**
 * 菜单列表
 * @param {*} params
 */
export function menuListAPI(params) {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params
  })
}
export function menuTreeAPI() {
  return request({
    url: '/system/menu/tree',
    method: 'get'
  })
}
export function menuTreeselectAPI() {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}
