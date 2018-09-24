<template>
  <div>
    <p>父组件属性 {{optionsSelectValue}}</p>
    <ele-mult-selection @changeValue=setSelectResult :options=optionsCopy></ele-mult-selection>
  </div>
</template>
<script>
import EleMultSelection from './EleMultSelection.vue'
let formData = {
  options: [
    { value: 'ALL_SELECT', label: 'ALL' },
    { value: '1', label: 'liablePerson1' },
    { value: '2', label: 'liablePerson2' },
    { value: '3', label: 'liablePerson3' },
    { value: '4', label: 'liablePerson4' },
    { value: '5', label: 'liablePerson5' }
  ],
  optionsSelectValue: []
}
export default {
  data () {
    return {
      optionsCopy: [],
      optionsSelectValue: []
    }
  },
  mounted () {
    var optionsCopy = JSON.parse(JSON.stringify(formData.options)) // 克隆一份表单对象数据
    this.optionsCopy = optionsCopy
  },
  components: {
    EleMultSelection
  },
  methods: {
    setSelectResult (val) {
      this.optionsSelectValue = val
      formData.optionsSelectValue = val
    }
  }
}
</script>
//数据


