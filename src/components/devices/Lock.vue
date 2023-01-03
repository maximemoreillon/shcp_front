<template>
  <device
    v-bind:device="device"
    v-on:icon_clicked="toggle()"
    v-bind:form_fields="form_fields">

    <template v-slot:icon>
      <lock-icon />
    </template>

  </device>
</template>

<script>

// Importing mixins
import { device_shared_attributes } from '@/mixins/device_shared_attributes.js'
import { togglable } from '@/mixins/togglable.js'

import LockIcon from 'vue-material-design-icons/Lock.vue'

export default {
  name: 'Light',
  mixins: [
    device_shared_attributes,
    togglable

    // LightbulbIcon,
  ],
  components: {
    LockIcon
  },
  data () {
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
