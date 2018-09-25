import {
  CONFIRM
} from '../mutation-types'

const state = {
  alert: {
    name: '',
    title: '',
    type: 'default',
    show: false,
    msg: '',
    callback: null,
    isComfirm: false // isComfirm 为 true 的时候是 confirm
  }
}

const mutations = {
  [CONFIRM] (state, info) {
    state.alert.isComfirm = true
    generateNewAlert(state, info.msg, info.callback)
  }
}

export default {
  state,
  mutations
}

function generateNewAlert (state, msg, callback) {
  var title, type, name
  if (typeof msg === 'object') {
    title = msg.title
    name = msg.name
    type = msg.type
    msg = msg.msg
  }
  state.alert.msg = msg || ''
  state.alert.type = type || 'default'
  state.alert.title = title || null
  state.alert.name = name || '提示'
  state.alert.callback = callback || null
  state.alert.show = true
}
