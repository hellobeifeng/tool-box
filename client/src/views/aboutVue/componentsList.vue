<template>
<div class="acontainer">
  <p>下面是组件列表d</p>
  <div>
    <span>1.弹窗组件</span>
    <button @click="call_notify">点我弹窗</button>
  </div>
  <div>
    <span>1.视频上传模块</span>
    <video-upload></video-upload>
  </div>
</div>
</template>
<script>
import VideoUpload from 'comp/VideoUploader/index.vue'
export default {
  methods: {
    call_notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  },
  components: {
    VideoUpload
  }
}
</script>
<style lang="stylus">
  .acontainer {
    padding-left: 20px
  }
</style>


