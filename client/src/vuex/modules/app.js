import Cookies from 'js-cookie'

import {
  TOGGLE_SIDEBAR,
  START_LOADING,
  END_LOADING
} from '../mutation-types'

const state = {
  loading: false,
  sidebar: {
    opened: !+Cookies.get('sidebarStatus')
  }
}

const mutations = {
  [TOGGLE_SIDEBAR]: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  [START_LOADING] (state) {
    state.loading = true
  },
  [END_LOADING] (state) {
    state.loading = false
  }
}

export default {
  state,
  mutations
}
