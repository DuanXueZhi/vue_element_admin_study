import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 在生成路由（createRouter）中被调用，从而生成路由
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout, // 基础模板，子页面都隶属于此模板，只是改变app-main标签内容
    /**
     * 单页面多路由区域操作：
     * 1.主页面上写多个<router-view>标签
     * 2.<router-view name="right">name对应components属性内容
     * 3.路由中增加components属性，例: components: { left: helloWorld1, right: helloWorld2 }
     */
    hidden: true,
    children: [
      {
        /**
         * *：表示匹配之后所有路由
         * /redirect/book/create
         * /redirect/book, 没有*只能匹配到一级
         */
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    /**
     * redirect：重定向
     * 路由path: redirect: '/b'
     * 路由名name: redirect: { name: 'helloWorld' }
     * 方法：redirect: to => { // 方法接收 目标路由 作为参数 return 重定向的 字符串路径/路径对象 }
     */
    /**
     * alias：别名
     * url访问别名路径指向原页面，但是url没变（重定向要改变url）仅改变了<router-view>中的内容
     * *注意：不要再根路径（path: '/'）中使用，否则无效
     */
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * 编程式路由：
 * router.push(location, onComplete?, onAbort?) === <router-link :to="...">
 *   字符串：router.push('home')
 *   对象：router.push({ path: 'home' })
 *   命名的路由：router.push({ name: 'user', params: { userId: '123' } })
 *   带查询参数：router.push({ path: 'register', query: { plan: 'private' } })
 *   path带参数：router.push({ path: `/user/${userId}` }) // params不生效
 *  同样适用于router-link
 * router.replace(location, onComplete?, onAbort?) 与 router.push相同
 *   不同之处在于不会向history添加新纪录，而直接替换当前history记录
 * router.got(n) 类似 window.history.go(n)
 *   router.go(1) === history.forward() // 前进一步
 *   router.go(-1) === history.back() // 后退一步
 * push、replace、go在各类路由模式（history、hash和abstract）下表现一致
 */

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/book/create',
    meta: { title: '图书管理', icon: 'documentation', roles: ['admin', 'editor'] },
    alwaysShow: true,
    children: [
      {
        path: 'create',
        component: () => import('@/views/book/create'),
        meta: { title: '上传图书', icon: 'edit', roles: ['admin'] }
      },
      {
        path: 'manage',
        component: () => import('@/views/book/create'),
        meta: { title: '图书管理', icon: 'edit', roles: ['editor'], activeMenu: '/book/create' }
      }
    ]
  },
  {
    path: '/steps',
    component: Layout,
    meta: { title: '步骤条' },
    alwaysShow: true,
    children: [
      {
        path: 'scroll',
        component: () => import('@/views/steps/scrollDome'),
        name: 'StepsScroll',
        meta: { title: '滚动联动' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 创建路由【constantRoutes已经加载】
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
