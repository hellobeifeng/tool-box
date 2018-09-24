<template>
  <div>
    <button id="btn" type="button" style="height:30px;width:60px;" @click="toggleShowing">{{ this.showing ? '隐藏' : '展示'}}</button>
    <ele-can-search-table v-if="showing"></ele-can-search-table>
  </div>
</template>
<script>
import EleCanSearchTable from './EleCanSearchTable.vue'
export default {
  data () {
    return {
      showing: false
    }
  },
  components: {
    EleCanSearchTable
  },
  methods: {
    toggleShowing () {
      this.showing = !this.showing
    }
  }
}
</script>
//数据


