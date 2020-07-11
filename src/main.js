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

const socket = io(process.env.VUE_APP_SHCP_API_URL)


Vue.use(VueAxios, axios)
Vue.use(VueSocketIOExt, socket);
Vue.use(VueCookies)

Vue.$cookies.config('30d')

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {

  if(Vue.$cookies.get("jwt")) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Vue.$cookies.get('jwt')}`
    next();
  }
  else {
    delete axios.defaults.headers.common['Authorization']
    window.location.href = process.env.VUE_APP_AUTHENTICATION_FRONT_URL;
  }

});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
