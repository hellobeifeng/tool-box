<template>
<div class="acontainer">
  <p>下面是组件列表d</p>
  <div>
    <p>1.弹窗组件</p>
    <notify :content="'我是弹窗组件'"></notify>
  </div>
</div>
</template>
<script>
import notify from 'comp/notification/notification.vue'
export default {
  components: {
    notify
  }
}
</script>
<style lang="stylus">
  .acontainer {
    padding-left: 20px
  }
</style>


