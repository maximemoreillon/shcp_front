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
  sockets: {
    connect() {
      console.log('[WS] Connected')
    },
    authenticated(){
      console.log('[WS] Authenticated');
    },
    disconnect () {
      console.log('[WS] disconnected')
    },
  },




}
</script>
<style>

</style>
