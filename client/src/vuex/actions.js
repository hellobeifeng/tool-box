import * as types from './mutation-types'

export const confirm = makeAction(types.CONFIRM)
export const alert = makeAction(types.ALERT)
export const closeAlert = makeAction(types.CLOSE_ALERT)

function makeAction (type) {
  return ({ commit }, args) => commit(type, args)
}

export const toggleSideBar = ({ commit }) => {
  commit('TOGGLE_SIDEBAR')
}
