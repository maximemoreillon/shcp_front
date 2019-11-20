<template>
  <device
    v-bind:device="device"
    v-bind:icon_class="icon_class"
  ></device>
</template>

<script>

import Device from '@/components/Device.vue'

export default {
  name: 'Heater',
  components: {
    Device,
  },
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
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
