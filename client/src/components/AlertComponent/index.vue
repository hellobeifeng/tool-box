<template>
  <div>
    <button id="btn" type="button" style="height:30px;width:60px;" @click="toggleShowing">{{ this.showing ? '隐藏' : '展示'}}</button>
    <div v-if="showing">
      <span>confirm 触发内容{{ count }}</span>
      <button @click="alertString">Alert窗1</button>
      <button @click="alertObj">Alert窗2</button>
      <button @click="confirmFunc">确认窗</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      showing: false,
      count: 0
    }
  },
  methods: {
    ...mapActions([
      'alert',
      'confirm'
    ]),
    toggleShowing () {
      this.showing = !this.showing
    },
    alertString () {
      this.alert({
        msg: '字符串啊字符串'
      })
    },
    alertObj () {
      this.alert({
        msg: {
          type: 'info',
          title: '成功了',
          msg: '对象内容成功了'
        }
      })
    },
    confirmFunc () {
      this.confirm({
        msg: {
          type: 'alert',
          msg: '删除后无法恢复，确认删除吗？'
        },
        callback: (res) => {
          if (res) {
            this.countAdd()
          }
        }
      })
    },
    countAdd () {
      this.count = this.count + 1
    }
  }
}
</script>
//数据


