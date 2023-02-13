<template>
  <AppTemplate :options="options" @user="user_changed($event)">
    <template v-slot:header>
      <router-link :to="{ name: 'about' }">
        <InformationOutlineIcon />
      </router-link>
    </template>
  </AppTemplate>
</template>

<script>
import AppTemplate from "@moreillon/vue_application_template";
import InformationOutlineIcon from "vue-material-design-icons/InformationOutline.vue";

export default {
  name: "App",
  components: {
    AppTemplate,
    InformationOutlineIcon,
  },
  data() {
    return {
      options: {
        authenticate: true,
        title: "SHCP",
        skip_greetings: process.env.NODE_ENV === "development",
        login_url: process.env.VUE_APP_LOGIN_URL,
        identification_url: process.env.VUE_APP_IDENTIFICATION_URL,
      },
    };
  },
  methods: {
    user_changed(user) {
      this.$store.commit("set_user", user);
      if (user) this.ws_auth();
    },
    ws_auth() {
      // Check if possible to authentify using a JWT
      const jwt = this.$cookie.get("jwt");
      if (!jwt) return;

      this.$socket.client.emit("authentication", { jwt });

      // Acknowledge current authentication attempt
      this.$store.commit("set_authenticating", true);
    },
    async get_devices() {
      this.$store.commit("set_devices_loading", true);
      try {
        const { data: devices } = await this.axios.get("/devices");
        this.$store.commit("delete_all_devices", devices); // Deleting all probably not necessary
        this.$store.commit("add_or_update_some_devices", devices);
      } catch (error) {
        console.error(error);
        alert("Failed to query devices");
      } finally {
        this.$store.commit("set_devices_loading", false);
      }
    },
  },
  sockets: {
    connect() {
      // Acknowledge connection
      this.$store.commit("set_connected", true);
      this.ws_auth();
    },
    unauthorized(data) {
      this.$store.commit("set_authenticating", false);
    },
    authenticated(data) {
      this.$store.commit("set_authenticating", false);
      this.get_devices();
    },
    disconnect() {
      this.$store.commit("set_connected", false);
    },
    some_devices_added_or_updated(device_array) {
      this.$store.commit("add_or_update_some_devices", device_array);
    },
    device_deleted(device) {
      this.$store.commit("delete_device", device);
    },
  },
};
</script>
<style>
.material-design-icon__svg {
  bottom: 0 !important;
}
main {
  /* override template */
  margin: 0 !important;
}

header a {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
