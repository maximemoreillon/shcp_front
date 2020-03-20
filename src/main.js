import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import io from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';
import VueCookies from 'vue-cookies'


import VueDragDrop from 'vue-drag-drop';
Vue.use(VueDragDrop);

var socket = null
if(process.env.VUE_APP_SOCKETIO_SERVER_URL) socket = io(process.env.VUE_APP_SOCKETIO_SERVER_URL)
else socket = io()


Vue.use(VueAxios, axios)
Vue.use(VueSocketIOExt, socket);
Vue.use(VueCookies)

Vue.$cookies.config('30d')

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
