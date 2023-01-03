<template>
  <AppTemplate
    :options="options"
    @user="user_changed($event)">

    <template v-slot:header>
      <router-link :to="{ name: 'about' }">
        <InformationOutlineIcon />
      </router-link>
    </template>

  </AppTemplate>
</template>

<script>

import AppTemplate from '@moreillon/vue_application_template'
import InformationOutlineIcon from 'vue-material-design-icons/InformationOutline.vue'

export default {
  name: 'App',
  components: {
    AppTemplate,
    InformationOutlineIcon
  },
  data () {
    return {
      options: {
        authenticate: true,
        title: 'SHCP',
        skip_greetings: process.env.NODE_ENV === 'development',
        login_url: process.env.VUE_APP_LOGIN_URL,
        identification_url: process.env.VUE_APP_IDENTIFICATION_URL

      }
    }
  },
  methods: {
    user_changed (user) {
      this.$store.commit('set_user', user)
      this.ws_auth()
    },
    ws_auth () {
      // Check if possible to authentify using a JWT
      const jwt = this.$cookie.get('jwt')
      if (!jwt) return

      this.$socket.client.emit('authentication', { jwt })

      // Acknowledge current authentication attempt
      this.$store.commit('set_authenticating', true)
    }
  },
  sockets: {
    connect () {
      // Acknowledge connection
      this.$store.commit('set_connected', true)
      this.ws_auth()
    },
    unauthorized (data) {
      this.$store.commit('set_authenticating', false)
    },
    authenticated (data) {
      // mark as no longer trying to authenticate
      this.$store.commit('set_authenticating', false)

      // Delete all devices because might be outdated
      this.$store.commit('delete_all_devices', {})

      // Get devices
      this.$socket.client.emit('get_all_devices', {})

      this.$store.commit('set_devices_loading', true)
    },
    disconnect () {
      this.$store.commit('set_connected', false)
    },
    some_devices_added_or_updated (device_array) {
      this.$store.commit('add_or_update_some_devices', device_array)
    },
    device_deleted (device) {
      this.$store.commit('delete_device', device)
    },
    all_devices (device_array) {
      this.$store.commit('delete_all_devices', device_array)
      this.$store.commit('add_or_update_some_devices', device_array)
      this.$store.commit('set_devices_loading', false)
    }

  }

}
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>
