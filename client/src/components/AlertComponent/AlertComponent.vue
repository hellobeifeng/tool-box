<template>
  <modal :show="show" @close="onClose" :title="name" width="320px" :callback="callback" :is-comfirm="isComfirm">
    <div slot="modal-body">
      <div class="top">
        <i v-if="type === 'info'" class="iconfont icon-chenggong success"></i>
        <i v-if="type === 'alert'" class="iconfont icon-zhuyi failed"></i>
        <span v-if="title && title !== ''">{{title}}</span>
      </div>
      <div v-if="msg && msg !== ''" class="content">{{msg}}</div>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal.vue'

export default {
  props: {
    name: {
      type: String,
      default: '提示'
    },
    title: String,
    type: {
      type: String,
      default: 'default' // 'default' || 'info' || 'alert'
    },
    msg: String,
    show: Boolean,
    isComfirm: Boolean,
    callback: Function
  },
  methods: {
    onClose () {
      this.$emit('close')
    }
  },
  components: {
    Modal
  }
}
</script>

<style lang="stylus" scoped>

.content {
  margin: 10px 20px 0 20px;
  text-align: center;
  color: #666666;
  font-size: 14px;
}
.success {
  color: #0cbe06;
}
.iconfont {
  font-size: 40px;
}
.failed {
  color: orange;
}
.top {
  text-align: center;
  line-height: 40px;
  vertical-align: middle;
  margin-top: 20px;
  span {
    vertical-align: top;
    margin-left: 10px;
    font-size: 18px;
  }
}
</style>
