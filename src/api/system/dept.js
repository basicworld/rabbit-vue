import request from '@/utils/request'
/**
 * 部门列表
 * @param {*} params
 */
export function deptListAPI(params) {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params
  })
}
/**
 * 部门树
 * @param {*} params
 */
export function deptTreeAPI(params) {
  return request({
    url: '/system/dept/tree',
    method: 'get',
    params
  })
}

/**
 * 获取部门详情
 * @param {*} params
 */
export function deptGetAPI(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}
/**
 * 删除部门
 *
 */
export function deptDeleteAPI(deptId) {
  return request({
    url: '/system/dept/' + deptId,
    method: 'delete'
  })
}
/**
 * 新建部门
 * @param {*} data
 */
export function deptCreateAPI(data) {
  return request({
    url: '/system/dept',
    method: 'post',
    data
  })
}
/**
 * 更新部门
 * @param {*} data
 */
export function deptUpdateAPI(data) {
  return request({
    url: '/system/dept',
    method: 'put',
    data
  })
}
