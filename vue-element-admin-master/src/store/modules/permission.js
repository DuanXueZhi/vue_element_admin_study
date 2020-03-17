import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) { // meta: { roles: ['admin'] }
    /**
     * 当前用户身份数组：roles: ['admin', 'editor']
     * 遍历当前用户身份：role: 'admin' and 'editor'
     * 当前路由：route: meta: { title: 'xxx', icon: 'xxx', roles: ['admin', 'ccc'] }
     */
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes // 用：作缓存
    state.routes = constantRoutes.concat(routes) // 用：侧边栏
  }
}

const actions = {
  generateRoutes({ commit }, roles) { // 生成路由
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) { // 用户身份包含admin权限【默认全部访问】
        accessedRoutes = asyncRoutes || []
      } else { // 用户身份不包含admin权限
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes) // 将路由存储
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
