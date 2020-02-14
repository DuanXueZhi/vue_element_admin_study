/**
 *  * Created by dxz on 2020/2/13-21:32.
 */
const express = require('express')
const router = require('./router')

// 创建 express 应用
const app = express()

// 中间件（一般前置）
// function myLogger(req, res, next) {
//   console.log('myLogger')
//   next()
// }
//
// app.use(myLogger)

// 监听 / 路径的 get 请求
// app.get('/', function(req, res) {
//   throw new Error('error...')
//   // res.send('hello node')
// })

app.use('/', router)

// 异常处理（必须后置）【路由抛出异常后还要执行找到异常处理部分然后返回异常】
// function errorHandler(err, req, res, next) {
//   console.log(err)
//   res.status(500).json({
//     error: -1,
//     msg: err.toString()
//   })
// }

// app.use(errorHandler)

const server = app.listen(5000, function() {
  console.log(server.address())
  const { address, port } = server.address()
  console.log('http server is running on http://%s:%s', address, port)
})