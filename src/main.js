import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';


const socket = io('https://shcp.maximemoreillon.com');

Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
