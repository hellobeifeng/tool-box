exports.getEnv = function () {
  return process.argv[2]
}

exports.getConfig = function (env) {
  env = env || exports.getEnv() || 'test'
  return ({
    test: {
      port: 8099,
      interfaceUrl: 'url_test'
    },
    release: {
      port: 8099,
      interfaceUrl: 'url_release'
    }
  })[env]
}
