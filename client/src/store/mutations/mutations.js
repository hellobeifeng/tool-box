import Cookies from 'js-cookie'

export default {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
