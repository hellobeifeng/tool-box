const path = require('path')
const express = require('express')
const router = express.Router()
const config = require('../config').getConfig()
let axios = require('axios')

router
    .get('/api/testProxy', function (req, res) {
      res.json({
        "data" : {
          "content": "from_server"
        },
        "message": {
          "message": "",
          "code": 0
        }
      })
    })
    // serve静态文件
    .use(express.static('../dist'))
    .use('/', express.static(path.resolve(__dirname, '../dist')))

module.exports = router
