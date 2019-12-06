import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import io from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';
import VueCookies from 'vue-cookies'

import '@mdi/font/css/materialdesignicons.css';


import VueDragDrop from 'vue-drag-drop';
Vue.use(VueDragDrop);

const socket = io('https://shcp.maximemoreillon.com');

axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

Vue.use(VueAxios, axios)
Vue.use(VueSocketIOExt, socket);
Vue.use(VueCookies)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
