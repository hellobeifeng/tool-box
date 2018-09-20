<template>
    <body>
      <button id="btn" type="button" style="height:30px;width:60px;" @click="toggleShowing">{{ this.showing ? '隐藏' : '展示'}}</button>
      <div id="visual" v-show=showing ></div>
    </body>
</template>

<script>
import left from './left.js'
import right from './right.js'
export default {
  data () {
    return {
      showing: false
    }
  },
  mounted () {
    // https://github.com/benjamine/jsondiffpatch
    var delta = window.jsondiffpatch.diff(left, right)
    document.getElementById('visual').innerHTML = window.jsondiffpatch.formatters.html.format(delta, left)
  },
  methods: {
    toggleShowing () {
      this.showing = !this.showing
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/assets/styles/jsondiff"
</style>
