<template>
  <div id="app">

    <AppTemplate
      authenticate
      applicationName="SHCP"/>


  </div>
</template>

<script>

import AppTemplate from '@moreillon/vue_application_template_flex'

export default {
  name: 'App',
  components: {
    AppTemplate,
  },
  sockets: {
    connect() {
      // Acknowledge connection
      this.$store.commit('set_connected', true)

      // Check if possible to authentify using a JWT
      let jwt = this.$cookies.get('jwt')
      if(!jwt && this.$route.path !== '/login') {
        //return this.$router.push('/login')
        //return window.location.href = `${process.env.VUE_APP_AUTHENTICATION_FRONT_URL}`

        return
      }

      this.$socket.client.emit('authentication', {jwt})

      // Acknowledge current authentication attempt
      this.$store.commit('set_authenticating', true)

      // Does not need to go to the login screen
    },
    unauthorized(data) {
      this.$store.commit('set_authenticating', false)
      //this.$router.push('/login');
      //return window.location.href = `${process.env.VUE_APP_AUTHENTICATION_FRONT_URL}`
    },
    authenticated(data){

      // Save the JWT in cookies
      // Currently, JWT is obtained using HTTP API call
      /*
      if('jwt' in data) {
        console.log("[Auth] Received a JWT, storing in cookies")
        this.$cookies.set('jwt', data.jwt);
      }
      */

      // mark as no longer trying to authenticate
      this.$store.commit('set_authenticating', false)

      // Delete all devices because might be outdated
      this.$store.commit('delete_all_devices', {})

      // Get devices
      this.$socket.client.emit('get_all_devices', {})


      this.$store.commit('set_devices_loading', true)

      // Go back to home screen if not already here
      //if(this.$route.path !== '/') this.$router.push('/');
    },
    disconnect () {
      this.$store.commit('set_connected', false)
    },
    some_devices_added_or_updated(device_array) {
      this.$store.commit('add_or_update_some_devices', device_array)
    },
    device_deleted(device){
      this.$store.commit('delete_device', device)
    },
    all_devices(device_array) {
      this.$store.commit('delete_all_devices', device_array)
      this.$store.commit('add_or_update_some_devices', device_array)
      this.$store.commit('set_devices_loading', false)
    },

  },




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


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}


.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>
