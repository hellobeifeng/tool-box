<template>
  <div>
    <p>子组件内容{{ value}}</p>
    <input type="text" @input="$emit('input', $event.target.value)" :value=value >
  </div>
</template>
<script>
export default {
  props: ['value']
}
</script>
