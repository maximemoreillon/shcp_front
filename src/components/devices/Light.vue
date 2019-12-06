<template>
  <device
    v-bind:device="device"
    v-bind:icon_class="icon_class"
    v-on:icon_clicked="toggle()"
    v-bind:form_fields="form_fields"/>
</template>

<script>

// Importing mixins
import {device_shared_attributes} from '@/mixins/device_shared_attributes.js'
import {togglable} from '@/mixins/togglable.js'

export default {
  name: 'Light',
  mixins: [
    device_shared_attributes,
    togglable,
  ],
  data() {
    return {
      form_fields: [
        {key: "command_topic", label:"Command topic"},
        {key: "status_topic", label:"Status topic"},
        {key: "payload_on", label:"Payload ON"},
        {key: "payload_off", label:"Payload OFF"}
      ],
    }
  },
  methods: {

  },
  computed: {
    // Would be nice to simplify this a bit
    // Maybe put that in a mixin
    icon_class(){
      var icon_class = ["mdi-lightbulb"];
      if(this.device.state && this.device.payload_on){
        if(this.device.state === this.device.payload_on){
          icon_class.push("on");
        }
      }
      return icon_class;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
