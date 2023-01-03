<template>
  <device
    v-bind:device="device"
    v-on:icon_clicked="toggle()"
    v-bind:form_fields="form_fields">

    <template v-slot:icon>
      <fan-icon />
    </template>

  </device>
</template>
<script>

import { device_shared_attributes } from '@/mixins/device_shared_attributes.js'
import { togglable } from '@/mixins/togglable.js'

import FanIcon from 'vue-material-design-icons/Fan.vue'

export default {
  name: 'Fan',
  mixins: [
    device_shared_attributes,
    togglable
  ],
  components: {
    FanIcon
  },
  data: function () {
    return {
      form_fields: [
        { key: 'command_topic', label: 'Command topic' },
        { key: 'status_topic', label: 'Status topic' },
        { key: 'payload_on', label: 'Payload ON' },
        { key: 'payload_off', label: 'Payload OFF' }
      ]
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
