// const VideoUpload = require('video-upload')
// let videoUpload = new VideoUpload(file) // 触发上传
// videoUpload.on('ready',data => {}) // 开始上传，格式校验通过等
// videoUpload.on('uploading',data => {}) // 上传中，回调第一个参数为上传进度，值为整数（0 - 100）
// videoUpload.on('success',data => {}) // 上传成功，回调第一个参数为视频的奇传ID
// videoUpload.on('error',error => {}) // 上传失败，回调第一个参数为失败原因
// videoUpload.cancel() // 取消视频上传

// videoupload 文件
function VideoUpload (file, option) {
  this.eventList = {} // 待注册的事件仓库
  this.fileMeta = { // 保存模块中的文件属性信息
    file: file // new 对象时候传入的文件流对象
  }
  this.uploadingStatus = { // 保存上传状态
    hadUpload: 0, // 已上传的文件大小
    startUploadingTime: 0, // 第一次开始上传的时间，用于计算带宽
    estimatespeed: 0, // 预估带宽，单位：( 字节数 / 毫秒)
    hadArrived: false // 是否有某次的切片传输成功返回过
  }
  var defaultOption = { // 模块的配置信息，实例化的时候传入，不传则使用默认配置
    fileSizeLimit: 500 * 1024 * 1024, // 默认上传视频大小限制为 500 M
    durationLimit: 30 * 60, // 默认播放时长限制为 30 分钟
    bytesPerPiece: 10 * 1024 * 1024, // 默认视频每片的切片大小为 10M
    advertisingMode: ['native_video'] // 广告投放形式  1 原生视频  2  贴片广告  3 原生视频+ 贴片广告
  }
  this.option = Object.assign(defaultOption, option)
}

VideoUpload.prototype.init = function () {
  var that = this
  checkFileByType(this)
    .then(function () {
      console.log('## 进入调用开始请求接口阶段')
      return StartSplitUploadRequest(that)
    })
    .then(function () {
      console.log('## 进入分片请求阶段')
      return SplitUploadRequetAll(that)
    })
    .then(function () {
      console.log('## 进入请求成功阶段')
      return splitUploadFinish(that)
    })
    .catch(function (data) {
      console.log('## 模块捕获到了异常')
      that.trigger('error', data)
    })
}

VideoUpload.prototype.on = function (key, fn) {
  if (!this.eventList[key]) {
    this.eventList[key] = []
  }
  this.eventList[key].push(fn)
}

VideoUpload.prototype.trigger = function () {
  var key = Array.prototype.shift.call(arguments)
  var fns = this.eventList[key]

  if (!fns || fns.length === 0) {
    return false
  }
  for (var i = 0; i < fns.length; i++) {
    let fn = fns[i]
    fn.apply(this, arguments)
  }
}

// 清除上传模块内部属性同时清除上传模块内部注册的事件
VideoUpload.prototype.cancel = function () {
  this.eventList = {} // 待注册的事件仓库
  this.fileMeta = {
    file: {}
  }
  this.uploadingStatus = {}
  console.log('## after cancle this: ', JSON.stringify(this))
}

// checkFileByType
function checkFileByType (upload) {
  if (upload.option.advertisingMode.indexOf('roll') !== -1) {
    // 包含原生视频，严格校验，校验分辨率和宽高比
    return checkFileValidRoll(upload)
  } else {
    // 不包含checkFileValid原生视频，只处理时长
    return checkFileValidOther(upload)
  }
}

// 检查文件是否符合要求
function checkFileValidOther (upload) {
  return new Promise(function (resolve, reject) {
    var blob = upload.fileMeta.file
    var option = upload.option

    var metaInfo = {
      fileSize: blob.size, // 文件流大小
      filename: blob.name, // 文件名称
      fileType: getFileTypeByName(blob.name)
    }
    console.log('## after onloadedmetadata completed: ', metaInfo)
    var result = fileLengthIsValid(metaInfo.fileSize, option)
    if (!result) {
      upload.fileMeta = Object.assign(upload.fileMeta, metaInfo)
      resolve()
    } else {
      reject(result)
    }
  })
}

function checkFileValidRoll (upload) {
  return new Promise(function (resolve, reject) {
    window.URL = window.URL || window.webkitURL
    var video = document.createElement('video')

    var blob = upload.fileMeta.file
    var option = upload.option
    var fileType = getFileTypeByName(blob.name)
    if (fileType === 'mp4') {
      video.preload = 'metadata'
      video.onloadedmetadata = function (e) {
        var targetFile = e.target
        var metaInfo = {
          fileSize: blob.size, // 文件流大小
          duration: targetFile.duration, // 文件流播放时长
          filename: blob.name, // 文件名称
          fileType: getFileTypeByName(blob.name),
          fileVideoWidth: targetFile.videoWidth,
          fileVideoHeight: targetFile.videoHeight
        }
        console.log('## after onloadedmetadata completed: ', metaInfo, e)
        var result = fileMetaValid(metaInfo, option)
        if (!result) {
          upload.fileMeta = Object.assign(upload.fileMeta, metaInfo)
          resolve()
        } else {
          reject(result)
        }
      }
      video.onerror = function (e) {
        console.log('上传errore', e)
      }
      video.src = URL.createObjectURL(new Blob([blob])) // eslint-disable-line
      console.log('### url', video.src)
    } else {
      reject({
        code: 'A00001',
        msg: '上传视频类型只能为 mp4 格式'
      })
    }
  })
}

// 校验文件大小和文件播放时长，是否符合要求
function fileMetaValid (meta, option) {
  var result = ''
  var duration = meta.duration
  var fileSize = meta.fileSize
  var fileVideoWidth = meta.fileVideoWidth
  var fileVideoHeight = meta.fileVideoHeight
  var videoWidthHeightPercentVaild = fileVideoWidth * 9 === fileVideoHeight * 16 // 宽高比是 16 / 9

  if (fileSize > option.fileSizeLimit) {
    result = {
      code: 'A00001',
      msg: '上传视频体积不能大于' + option.fileSizeLimit / (1024 * 1024) + 'M'
    }
    return result
  }

  if (duration > option.durationLimit) {
    result = {
      code: 'A00001',
      msg: '上传视频时长不能大于' + option.durationLimit / 60 + 's'
    }
    return result
  }

  if (duration > option.durationLimit) {
    result = {
      code: 'A00001',
      msg: '上传视频时长不能大于' + option.durationLimit / 60 + 's'
    }
    return result
  }

  if (!videoWidthHeightPercentVaild) {
    result = {
      code: 'A00001',
      msg: '上传视频宽高比需要满足 16：9 '
    }
    return result
  }

  if (fileVideoWidth < 1280 || fileVideoHeight < 720) {
    result = {
      code: 'A00001',
      msg: '上传视频分辨率不能低于 1280 X 720 '
    }
    return result
  }

  return result
}

// 校验文件大小和文件播放时长，是否符合要求
function fileLengthIsValid (fileSize, option) {
  fileSize = fileSize || Infinity
  // duration = duration || 0
  var result = ''

  if (fileSize > option.fileSizeLimit) {
    result = {
      code: 'A00001',
      msg: '上传视频体积不能大于' + option.fileSizeLimit / (1024 * 1024) + 'M'
    }
  }

  return result
}

// 调用开始上传接口
function StartSplitUploadRequest (upload) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (tryByRandom(10)) {
        var result = {
          'file_id': 'ca75876b38364bc493869a87ae145ff6'// 文件id
        }
        upload.fileMeta = Object.assign(upload.fileMeta, result) // 文件奇传id
        upload.trigger('ready', {
          filename: upload.fileMeta.filename,
          size: upload.fileMeta.fileSize,
          id: result.file_id,
          duration: upload.fileMeta.duration,
          fileVideoWidth: upload.fileMeta.fileVideoWidth,
          fileVideoHeight: upload.fileMeta.fileVideoHeight
        })
        resolve()
      } else {
        reject({
          code: 'A00002',
          msg: '奇传开始上传接口请求异常'
        })
      }
    })
  }, 2000)
}

// 并发调用分片上传接口
function SplitUploadRequetAll (upload) {
  // 对 file 文件流进行分片
  var fileMeta = upload.fileMeta
  var file = fileMeta.file
  var filesize = fileMeta.fileSize
  var bytesPerPiece = upload.option.bytesPerPiece
  console.log('## 每一片的大小： ', bytesPerPiece)
  // 分片时的内部属性
  var start = 0
  var end
  var index = 0
  var totalPieces = Math.ceil(filesize / bytesPerPiece)
  var promiseArr = []

  while (start < filesize) {
    end = start + bytesPerPiece
    if (end > filesize) {
      end = filesize
    }

    var chunk = file.slice(start, end) // 切割文件
    var md5Chunk = 'md5_12345'
    // var formData = new FormData(); // inportant
    // formData.append("file", chunk, filename);
    // console.log('## 分片规则如下：共有 ' + totalPieces + '片，第', ( index + 1 ), ' 片，从', start, '开始，到 ', end, '结束, 大小为 ', chunk, ', md5 的值为', md5Chunk)
    promiseArr.push(SplitUploadRequestOne(upload, start + '-' + (end - 1), index, totalPieces, chunk, md5Chunk))
    start = end
    index++
  }
  return new Promise(function (resolve, reject) {
    console.log('### on no !!!')
    upload.uploadingStatus.startUploadingTime = new Date().getTime() // 初始化开始上传时间
    Promise.all(promiseArr)
      .then(function (result) {
        resolve()
      })
      .catch(function (data) {
        reject(data)
      })
  })
}

// 调用分片上传接口
// 计算本次上传的累计上传大小数据和剩余传输时间数据
function SplitUploadRequestOne (upload, range, tag, totalPieces, chunk, chunkMd5) {
  return new Promise(function (resolve, reject) {
    // var formData = new FormData(); // inportant
    // formData.append("file", chunk, filename);
    // ajax
    setTimeout(function () {
      if (tryByRandom(100)) {
        var fileMeta = upload.fileMeta
        var filesize = fileMeta.fileSize
        var filename = fileMeta.filename
        var id = fileMeta.file_id

        upload.uploadingStatus.hadUpload = upload.uploadingStatus.hadUpload || 0
        upload.uploadingStatus.hadUpload += chunk.size

        var nowtime = new Date().getTime()
        var remainTime

        if (!upload.uploadingStatus.hadArrived) { // 表示是第一次上传返回来的
          upload.uploadingStatus.estimatespeed = chunk.size / (nowtime - upload.uploadingStatus.startUploadingTime) // 用第一次任意某片上传成功，计算预估速度
          upload.uploadingStatus.hadArrived = true
        }

        remainTime = parseInt((filesize - upload.uploadingStatus.hadUpload) / upload.uploadingStatus.estimatespeed)

        // console.log('##第 ' +  ( tag + 1 ) + '片返回了，当前分片大小',  chunk.size, ' , 带宽为 ', upload.uploadingStatus.estimatespeed , '剩余上传时间 ', remaining)
        // console.log('##当前时间', nowtime, ' , 剩余体积 ', ( filesize - upload.uploadingStatus.hadUpload ))

        upload.trigger('uploading', {
          filename: filename,
          size: filesize,
          id: id,
          progress: (tag + 1) / totalPieces,
          uploaded: upload.uploadingStatus.hadUpload,
          remaining: remainTime
        })
        resolve()
      } else {
        reject({
          code: 'A00001',
          msg: '奇传分片上传接口请求异常：第' + tag + '片视频上传失败'
        })
      }
    }, (tag + 1) * 2000)
  })
}

// 调用上传成功接口
function splitUploadFinish (upload) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      upload.trigger('success', {
        id: upload.fileMeta.file_id
      })
      resolve()
    }, 2000)
  })
}

function tryByRandom (targetNum) {
  targetNum = targetNum || 5
  var radnum = Math.floor(Math.random() * 10 + 1)
  return radnum < targetNum
}

function getFileTypeByName (filename) {
  var startIndex = filename.lastIndexOf('.')
  if (startIndex !== -1) {
    return filename.substring(startIndex + 1, filename.length).toLowerCase()
  } else {
    return ''
  }
}
