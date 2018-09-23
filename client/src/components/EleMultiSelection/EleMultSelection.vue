<template>
  <el-select v-model="choosePerson" multiple collapse-tags placeholder="请选择" style="width: 75%;border-radius: 20px;" @change='selectAll'>
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>
<script>
export default {
  props: ['options'],
  data () {
    return {
      oldOptions: [],
      choosePerson: []
    }
  },
  methods: {
    selectAll (val) {
      const allValues = []
      // 保留所有值
      for (const item of this.options) {
        allValues.push(item.value)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : []

      console.log(this.oldOptions.length)
      console.log('JSON.stringify(val) ', JSON.stringify(val))
      console.log('start JSON.stringify(oldVal)', JSON.stringify(oldVal))

      if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) { // 上次选的全部，这次选的全部
        console.log('##1')
        const index = val.indexOf('ALL_SELECT')
        val.splice(index, 1) // 排除第一个无效全选选项
        this.choosePerson = val
      } else if (val.includes('ALL_SELECT')) { // 首次选择全部, 设置全部属性
        console.log('##2')
        this.choosePerson = allValues
      } else if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) { // 取消全部选中： 上次有 当前没有 表示取消全选
        console.log('##3')
        this.choosePerson = []
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        console.log('##4')
        if (val.length === allValues.length - 1) this.choosePerson = ['ALL_SELECT'].concat(val)
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldOptions[0] = this.choosePerson
      console.log('##end this.oldOptions[0] ', this.oldOptions[0])
      this.$emit('lala', this.choosePerson)
    }
  }
}
</script>
