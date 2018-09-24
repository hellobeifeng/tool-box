<template>
<div class="acontainer">
  <p>下面是组件列表d</p>
  <div>
    <span>1.弹窗组件</span>
    <button @click="call_notify">点我弹窗</button>
    <hr>
  </div>
  <div>
    <span>2.视频上传模块</span>
    <video-upload></video-upload>
    <hr>
  </div>
  <div>
    <span>3.JSON 比对模块</span>
    <json-diff></json-diff>
    <hr>
  </div>
  <div>
    <span>4.ele 升级版下拉菜单</span>
      <ele-multi-selection></ele-multi-selection>
    <hr>
  </div>
  <div>
    <span>5.ele 升级版表格</span>
      <ele-can-search-table></ele-can-search-table>
    <hr>
  </div>
</div>
</template>
<script>
import VideoUpload from 'comp/VideoUploader/index.vue'
import JsonDiff from 'comp/JsonDiff/index.vue'
import EleMultiSelection from 'comp/EleMultiSelection/index.vue'
import EleCanSearchTable from 'comp/EleCanSearchTable/index.vue'

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
    VideoUpload,
    JsonDiff,
    EleMultiSelection,
    EleCanSearchTable
  }
}
</script>
<style lang="stylus">
  .acontainer {
    padding-left: 20px;
    padding-bottom: 50px;
  }
</style>


