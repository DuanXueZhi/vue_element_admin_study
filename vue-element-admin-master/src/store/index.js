import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// 挂载Vuex
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// 创建vuex对象
const store = new Vuex.Store({
  modules,
  getters
})

/**
 * 成员列表
 * 1.state：存放状态
    增删state中的成员：
      Vue.set(state, "age", 15)
      Vue.delete(state, 'age')
 * 2.mutations：state成员操作【可以直接在组件内提交状态中的Mutations中自己编写的方法来达成对state成员的操作】
      ([state] [,payload])
      state是当前VueX对象中的state
      payload是该方法在被调用时传递参数使用的
      调用方法：this.$store.commit({
                  type:'edit',
                  payload:{
                    age:15,
                    sex:'男'
                  }
                })
 * 3.getters：加工state成员为外界
      参数：
      state：vuex对象中的状态对象state
      getters：当前getters对象，用于将getters下的其他getters拿来用
      写法：
      getters:{
        nameInfo(state){
            return "姓名:"+state.name
        },
        fullInfo(state, getters){
            return getters.nameInfo+'年龄:'+state.age
        }
      }
      调用方法：this.$store.getters.fullInfo
 * 4.actions：异步操作（dispatch）【action的存在就是为了让mutations中的方法能在异步操作中起作用】
      参数:
        contest：上下文（this）对象
        payload：挂载参数
      写法：
        actions:{
          aEdit(context,payload){
            setTimeout(()=>{
              context.commit('edit',payload)
            },2000)
          }
        }
      调用方法：this.$store.dispatch('aEdit', { age: 15 })
 * 5.modules：模块化状态管理
      模块中mutations和getters中的方法接受的第一个参数是自身局部模块内部的state
      getters中方法的第三个参数是根节点状态
      actions中方法获取局部模块状态是context.state,根节点状态是context.rootState
 */

export default store
