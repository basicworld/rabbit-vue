import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/personal/login',
    method: 'post',
    data
  })
}

// 获取验证码
export function captchaGetAPI() {
  return request({
    url: '/captcha',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/personal/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/personal/logout',
    method: 'post'
  })
}

/**
 * 修改密码
 * @param {*} data
 */
export function userPasswordUpdateApi(data) {
  return request({
    url: '/personal/password',
    method: 'put',
    data
  })
}
/**
 * 修改用户信息
 * @param {*} data
 */
export function userInfoUpdateAPI(data) {
  return request({
    url: '/personal/info',
    method: 'put',
    data
  })
}
