import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

 const store=new Vuex.Store({
  state: {
    /* eslint-disable */
    getdialog:false,
    navigationbar:false,
    isfirstlogin:true,
    songlistdata:{},
    playlistdata:{},
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
export default store
