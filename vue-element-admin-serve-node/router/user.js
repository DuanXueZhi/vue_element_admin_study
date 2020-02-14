/**
 *  * Created by dxz on 2020/2/14-14:59.
 */
const express = require('express')

const router = express.Router()

router.get('/info', function(req, res, next) {
  res.json('user info...')
})

module.exports = router