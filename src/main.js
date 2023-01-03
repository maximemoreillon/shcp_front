import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import io from "socket.io-client";
import VueSocketIOExt from "vue-socket.io-extended";

import VueCookie from "vue-cookie";
import VueDragDrop from "vue-drag-drop";

import "./registerServiceWorker";

axios.defaults.baseURL = process.env.VUE_APP_SHCP_API_URL;

const socket = io(`${process.env.VUE_APP_SHCP_API_URL}`);

Vue.use(VueAxios, axios);
Vue.use(VueSocketIOExt, socket);
Vue.use(VueCookie);
Vue.use(VueDragDrop);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
