<template>
<div class="acontainer">
  <p>下面是组件列表d</p>
  <div>
    <span>1.弹窗组件</span>
    <button @click="call_notify">点我弹窗</button>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    call_notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  }
}
</script>
<style lang="stylus">
  .acontainer {
    padding-left: 20px
  }
</style>


