<template>
  <device
    v-bind:device="device"
    v-bind:icon_class="icon_class"
    v-on:icon_clicked="toggle"
    v-bind:form_fields="form_fields"/>
</template>

<script>

import {device_shared_attributes} from '@/mixins/device_shared_attributes.js'
import {togglable} from '@/mixins/togglable.js'


export default {
  name: 'ac',
  mixins: [
    device_shared_attributes,
    togglable,
  ],
  props: {
    device: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      icon_class: "mdi-air-conditioner",
      form_fields: [
        {key: "command_topic", label:"Command topic"},
        {key: "status_topic", label:"Status topic"},
        {key: "payload_on", label:"Payload ON"},
        {key: "payload_off", label:"Payload OFF"}
      ],
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
