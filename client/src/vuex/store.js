import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import app from './modules/app'
import * as actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  modules: {
    app,
    common
  }
})

export default store
