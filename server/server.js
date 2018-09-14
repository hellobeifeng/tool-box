let express = require('express')
let path = require('path')
const bodyParser = require('body-parser')
const compression = require('compression')
const config = require('./config').getConfig()
let port = config.port
const router = require('./router')

let app = express()

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app
  .use(compression())
  .use(bodyParser.json({limit: '5mb'})) // 设置请求体最大大小为5M
  .use('/', router) // 注册业务逻辑处理模块

module.exports = app.listen(port, function (err) {
  if (err) {
      console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n', 'env', config)
})
