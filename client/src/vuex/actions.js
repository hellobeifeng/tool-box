import * as types from './mutation-types'

export const confirm = makeAction(types.CONFIRM)

function makeAction (type) {
  return ({ commit }, args) => commit(type, args)
}

export const toggleSideBar = ({ commit }) => {
  commit('TOGGLE_SIDEBAR')
}
