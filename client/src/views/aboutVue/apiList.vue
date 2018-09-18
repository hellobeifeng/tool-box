<template>
<div class="acontainer">
  <p>下面是练习vue api 的集合</p>
  <div>
    <span>1.练习v-model</span>
    <v-model-demo></v-model-demo>
  </div>
</div>
</template>
<script>
import VModelDemo from 'comp/VModelDemo/index.vue'
export default {
  components: {
    VModelDemo
  }
}
</script>
<style lang="stylus">
  .acontainer {
    padding-left: 20px
  }
</style>


