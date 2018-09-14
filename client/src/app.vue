<template>
  <div id="app">
    <div id="cover"></div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '脚手架'
  },
  methods: {},
  components: {
  },
  computed: {
  }
}
</script>

<style lang="stylus" scoped>
</style>
