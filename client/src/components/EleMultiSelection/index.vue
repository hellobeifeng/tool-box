<template>
  <div>
    <p>父组件属性 {{value5}}</p>
    <ele-mult-selection @lala=setSelectResulot :options=options></ele-mult-selection>
  </div>
</template>
<script>
import EleMultSelection from './EleMultSelection.vue'
export default {
  data () {
    return {
      options: [
        { value: 'ALL_SELECT', label: 'ALL' },
        { value: '1', label: 'liablePerson1' },
        { value: '2', label: 'liablePerson2' },
        { value: '3', label: 'liablePerson3' },
        { value: '4', label: 'liablePerson4' },
        { value: '5', label: 'liablePerson5' }
      ],
      value5: []
    }
  },
  components: {
    EleMultSelection
  },
  methods: {
    setSelectResulot (val) {
      this.value5 = val
    }
  }
}
</script>
//数据


