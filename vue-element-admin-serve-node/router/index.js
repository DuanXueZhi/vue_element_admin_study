/**
 *  * Created by dxz on 2020/2/14-14:58.
 */
const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const {
  CODE_ERROR
} = require('../utils/constant')

// 注册路由
const router = express.Router()

router.get('/', function(req, res) {
  res.send('get /')
})

router.use('/user', userRouter)

/**
 * 集中处理404请求中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则，会拦截正常请求
 */
router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})

/**
 * 自定义路由异常处理中间件【返回错误信息，并保证服务器正常运行】
 * 注意两点：
 * 1.方法参数不能少
 * 2.方法必须放在路由最后
 */
router.use((err, req, res, next) => {
  console.log(err)
  const msg = (err && err.message) || '系统错误'
  const statusCode = (err.output && err.output.statusCode) || 500
  const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message
  res.status(statusCode).json({
    code: CODE_ERROR,
    msg,
    error: statusCode,
    errorMsg
  })
})

module.exports = router