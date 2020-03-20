<template>
  <device
    v-bind:device="device"
    v-bind:icon_class="icon_class"
    v-on:icon_clicked="toggle"
    v-bind:form_fields="form_fields">

    <template v-slot:icon>
      <radiator-icon />
    </template>

  </device>
</template>

<script>

import {device_shared_attributes} from '@/mixins/device_shared_attributes.js'
import {togglable} from '@/mixins/togglable.js'

import RadiatorIcon from 'vue-material-design-icons/Radiator.vue';


export default {
  name: 'Heater',
  mixins: [
    device_shared_attributes,
    togglable,
  ],
  components: {
    RadiatorIcon
  },
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      form_fields: [
        {key: "command_topic", label:"Command topic"},
        {key: "status_topic", label:"Status topic"},
        {key: "payload_on", label:"Payload ON"},
        {key: "payload_off", label:"Payload OFF"}
      ],
    }
  },
  computed: {
    // Would be nice to simplify this a bit
    // Maybe put that in a mixin
    icon_class(){
      if(this.device.state && this.device.payload_on){
        if(this.device.state === this.device.payload_on){
          return "on"
        }
      }
      return "";
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
