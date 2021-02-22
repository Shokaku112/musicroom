import Vue from 'vue'
import svgIcon from './views/component/icon.vue'
import App from './App.vue'
import router from './router'
import SocketIO from 'vue-socket.io'
import ClientSocketIO from 'socket.io-client'
import Vuex from 'vuex'
import store from './store'
import $ from 'jquery'
// import Vuetify from 'vuetify/lib'
import vuetify from '@/plugins/vuetify'
// 获取svg路径
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContent => requireContent.keys().map(requireContent)
requireAll(req)
Vue.component('svg-icon',svgIcon)
Vue.config.productionTip = false
Vue.prototype.$=$;
Vue.use(Vuex)
// Vue.prototype.$socket=
// Vue.use(Vuetify)
Vue.use(new SocketIO({
  debug: true,
  autoConnect: false,
  connection: ClientSocketIO.connect('http://localhost:3000/',{
    transports:['websocket']
  })
}))
new Vue({
  
  /* eslint-disable */
  store,
  vuetify,
  router,
  
  render: h => h(App)
}).$mount('#app')
