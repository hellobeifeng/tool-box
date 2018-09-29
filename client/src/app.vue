<template>
  <div id="app">
    <div id="cover"></div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <alert :name="alert.name" :type="alert.type" :title="alert.title" :msg="alert.msg" :callback="alert.callback" :show="alert.show" :is-comfirm="alert.isComfirm" @close="onClose"></alert>
  </div>
</template>
<script>
import Alert from 'comp/AlertComponent/AlertComponent.vue'
import { mapState, mapActions } from 'vuex'
export default {
  metaInfo: {
    title: '脚手架'
  },
  computed: {
    ...mapState({
      alert: state => state.common.alert
    })
  },
  methods: {
    ...mapActions({
      closeAlert: 'closeAlert'
    }),
    onClose () {
      this.closeAlert()
    }
  },
  components: {
    Alert
  }
}
</script>

<style lang="stylus" scoped>
</style>
