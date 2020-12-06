import { constantRoutes } from '@/router'
import { getRoutersAPI } from '@/api/menu'
import Layout from '@/layout/index'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}
/**
 * 构造页面加载器
 * by wlfei
 * @param {*} view
 */
export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 * by wlfei
 * @param {*} routes
 */
export function filterAsyncRouter(routes) {
  return routes.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component.toLowerCase() === 'layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    // 删除等于null的children，不然路由加载会报错
    if (route.children === null) {
      delete route.children
    }
    return true
  })
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log('start get router')
    return new Promise(resolve => {
      // wlfei add start
      console.log('getRoutersAPI...')
      getRoutersAPI().then(res => {
        const accessedRoutes = filterAsyncRouter(res.data)
        accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(e => {
        console.log('catch error', e)
        removeToken() // must remove  token  first
        resetRouter()
        // commit('RESET_STATE')
        resolve()
      })
      console.log('getRoutersAPI...down')

      // wlfei add end
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
