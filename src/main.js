import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import io from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';
import '@mdi/font/css/materialdesignicons.css';


import VueDragDrop from 'vue-drag-drop';
Vue.use(VueDragDrop);

const socket = io('https://shcp.maximemoreillon.com');

axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

Vue.use(VueAxios, axios)
Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false


// TODO: REMOVE THIS
router.beforeEach((to, from, next) => {
  // Authentication
  axios.post('https://authentication.maximemoreillon.com/status')
  .then(response => {
    if(response.data.logged_in) {
      console.log("Authenticated")
      next();
    }
    else window.location.href = "https://authentication.maximemoreillon.com/";
  })
  .catch(error => console.log(error))

});

new Vue({
  router,
  store,
  bus: new Vue(), // used for drag and drop
  render: h => h(App)
}).$mount('#app')
