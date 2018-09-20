<template>
  <div>
    <input id='videofile' type="file" multiple>
    <button id="cancel">取消上传</button>
  </div>
</template>

<script>

import VideoUpload from './VideoUpload.js'

export default {
  name: 'VideoUploader',
  data () {
    return {
    }
  },
  mounted () {
    console.log(VideoUpload)
    var input = document.getElementById('videofile')
    var upload = null

    input.addEventListener('change', function () {
      var blob = this.files[0]
      upload = new VideoUpload(blob, {
        mode: 1
      })

      upload.on('ready', function (msg) {
        console.log('监听到事件 ready= ', msg)
      })

      upload.on('uploading', function (data) {
        console.log('监听到事件 uploading= ', data)
      })

      upload.on('success', function (data) {
        console.log('监听到事件 success= ', data)
      })

      upload.on('error', function (err, msg) {
        console.log('监听到事件 error= ', err)
      })

      upload.init()
    })

    document.getElementById('cancel').addEventListener('click', function () {
      input.value = ''
      upload.cancel()
      // 客户端指控其他页面状态
    })
  }
}
</script>

<style scoped>
input:hover {
  cursor: pointer;
}
</style>
