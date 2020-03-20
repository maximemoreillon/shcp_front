<template>
  <div id="app">

    <AppTemplate applicationName="SHCP"/>

  </div>
</template>

<script>

import AppTemplate from '@moreillon/vue_application_template'

export default {
  name: 'App',
  components: {
    AppTemplate,
  },
  methods: {

  },
  sockets: {
    connect() {
      console.log('[WS] Connected');

      // Acknowledge connection
      this.$store.commit('set_connected', true);

      // Check if possible to authentify using a JWT
      if(this.$cookies.get('jwt')){
        console.log("[Auth] JWT is present in cookies")

        this.$socket.client.emit('authentication', {
          jwt: this.$cookies.get('jwt')
        })

        // Acknowledge current authentication attempt
        this.$store.commit('set_authenticating', true);

        // Does not need to go to the login screen

      }
      else {
        // if no JWT exists, then the client must authenticate using credentials
        console.log("[Auth] JWT is NOT present in cookies")
        if(this.$route.path !== '/login') this.$router.push('/login')
      }

    },
    unauthorized(data) {
      console.log(data);
      this.$router.push('/login');
    },
    authenticated(data){
      console.log('[WS] Authenticated');

      // Save the JWT in cookies
      if('jwt' in data) {
        console.log("[Auth] Received a JWT, storing in cookies")
        this.$cookies.set('jwt', data.jwt);
      }

      // mark as no longer trying to authenticate
      this.$store.commit('set_authenticating', false);

      // Get devices
      this.$socket.client.emit('get_all_devices_from_back_end', {});

      this.$store.commit('set_devices_loading', true);

      // Go back to home screen if not already here
      //if(this.$route.path !== '/') this.$router.push('/');
    },
    disconnect () {
      console.log('[WS] disconnected');
      this.$store.commit('set_connected', false);
    },
    add_or_update_some_in_front_end(device_array) {
      console.log("[WS] add_or_update_some_in_front_end");
      this.$store.commit('add_or_update_some_devices', device_array);
    },
    delete_and_create_all_in_front_end(device_array) {
      console.log("[WS] delete_and_create_all_in_front_end");
      this.$store.commit('delete_all_devices', device_array);
      this.$store.commit('add_or_update_some_devices', device_array);
      this.$store.commit('set_devices_loading', false);
    },
    delete_some_in_front_end(device_array){
      console.log("[WS] delete_some_in_front_end");
      this.$store.commit('delete_some_devices', device_array);
    },
  },




}
</script>
<style>
.floorplan_wrapper .material-design-icon > .material-design-icon__svg {
  height: 6vmin;
  width: 6vmin;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}


.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>
