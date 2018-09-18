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
    var upload

    input.addEventListener('change', function () {
      var blob = this.files[0]
      upload = new VideoUpload(blob)

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
  },
  watch: {
  },
  methods: {
    upload (file) {
      let param = new FormData() // eslint-disable-line
      param.append('files', file, file.name)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      return this.axios.post('/adfe/avm/upload', param, config).then(res => res.data)
    }
  }
}
</script>

<style scoped>
input:hover {
  cursor: pointer;
}
</style>
