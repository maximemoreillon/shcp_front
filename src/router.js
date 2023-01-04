import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import DeviceList from "./views/DeviceList.vue";
import DeviceDetails from "./views/DeviceDetails.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/dragdrop",
      name: "dragdrop",
      component: () => import("./views/DragDropTest.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
    },
    {
      path: "/device_list",
      name: "device_list",
      component: DeviceList,
    },
    {
      path: "/device_details",
      name: "device_details",
      component: DeviceDetails,
    },
  ],
});
