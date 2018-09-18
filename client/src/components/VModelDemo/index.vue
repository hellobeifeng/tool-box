<template>
  <div>
    <p>父组件属性 {{price}}</p>
    <!-- v-model 语法糖写法 -->
    <price-input v-model="price"></price-input>
    <!-- 实际实现写法 -->
    <!-- <price-input :value="price" @input="onInput"></price-input> -->
  </div>
</template>
<script>
import PriceInput from './PriceInput.vue'
export default {
  data () {
    return {
      price: 'default'
    }
  },
  methods: {
    onInput: function (val) {
      this.price = val
    }
  },
  components: {
    PriceInput
  }
}
</script>

