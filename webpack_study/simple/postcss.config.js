/**
 *  * Created by dxz on 2020/8/10-10:33.
 *  explain: 后处理css，优化css代码
 */
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer() // 浏览器前缀
  ]
}