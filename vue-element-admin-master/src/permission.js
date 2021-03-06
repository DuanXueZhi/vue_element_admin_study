import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration 【顶部右侧加载进度环】

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist 白名单

router.beforeEach(async(to, from, next) => { // 所有路由将经过该方法
  // start progress bar【进度条】
  NProgress.start() // 记得关闭 NProgress.done()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' }) // 重定向到'/'同样要进入router.beforeEach拦截
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles) // 判断身份生成动态路由

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // throw new Error('出错了') // test

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record【不会保存新的history记录】
          next({ ...to, replace: true }) // 【replace: true】回退以后直接到空白页面
        } catch (error) { // 出错直接清空token并返回login
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    // 白名单判断
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
