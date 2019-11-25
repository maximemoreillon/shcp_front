<template>
  <div id="app">

    <AppTemplate applicationName="SHCP"/>

  </div>
</template>

<script>

import AppTemplate from '@/components/vue_application_template/AppTemplate.vue'

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
      this.$socket.client.emit('get_all_devices_from_back_end', {});
    },
    authenticated(){
      console.log('[WS] Authenticated');
    },
    disconnect () {
      console.log('[WS] disconnected')
    },
    add_or_update_some_in_front_end(device_array) {
      console.log("[WS] add_or_update_some_in_front_end");
      this.$store.commit('add_or_update_some_devices', device_array);
    },
    delete_and_create_all_in_front_end(device_array) {
      console.log("[WS] delete_and_create_all_in_front_end");
      this.$store.commit('delete_all_devices', device_array);
      this.$store.commit('add_or_update_some_devices', device_array);
    },
    delete_some_in_front_end(device_array){
      console.log("[WS] delete_some_in_front_end");
      this.$store.commit('delete_some_devices', device_array);
    },
  },




}
</script>
<style>

</style>
