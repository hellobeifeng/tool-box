<template>
  <div>
    <button id="btn" type="button" style="height:30px;width:60px;" @click="toggleShowing">{{ this.showing ? '隐藏' : '展示'}}</button>
    <alert-component></alert-component>
  </div>
</template>
<script>
import AlertComponent from './AlertComponent.vue'
export default {
  data () {
    return {
      showing: false
    }
  },
  components: {
    AlertComponent
  },
  methods: {
    toggleShowing () {
      this.showing = !this.showing
    }
  }
}
</script>
//数据


