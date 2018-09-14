var path = require('path')

module.exports = {
  development: {
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '^/api/(\\w+)': '/debug/$1.json'
        }
      }
    }
  },
  debug: {
    proxyTable: {
      '/api': {
        target: 'http://127.0.0.1:8099'
      }
    }
  },
  release: {
    proxyTable: {
      '/api': {
        target: 'https://127.0.0.1:8099'
      }
    }
  }
}
