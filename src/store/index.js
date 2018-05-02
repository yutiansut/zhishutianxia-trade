/**
 * Created by Administrator on 2017/6/5.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
const state = {
  direction: 'forward',
};
/*更新路由方向*/
//const UPDATE_DIRECTION = 'UPDATE_DIRECTION';
const mutations = {
  UPDATE_DIRECTION(state,payload) {
    state.direction = payload.direction
  },
};


export default new Vuex.Store({
  state: {
    direction: 'forward',
  },
  mutations: {
    ['UPDATE_DIRECTION'](state,payload) {
      state.direction = payload.direction
    },
  },
  actions: {

  }
});
