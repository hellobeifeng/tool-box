<template>
  <div>
    <button id="btn" type="button" style="height:30px;width:60px;" @click="toggleShowing">{{ this.showing ? '隐藏' : '展示'}}</button>
    <drag-component v-if="showing"></drag-component>
  </div>
</template>
<script>
import DragComponent from './DragComponent.vue'
export default {
  data () {
    return {
      showing: false
    }
  },
  components: {
    DragComponent
  },
  methods: {
    toggleShowing () {
      this.showing = !this.showing
    }
  }
}
</script>



