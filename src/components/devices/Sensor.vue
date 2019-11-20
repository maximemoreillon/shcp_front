<template>
  <device
    v-bind:device="device"
    v-bind:icon_class="icon_class"
    v-on:icon_clicked="toggle"
    v-bind:form_fields="form_fields"
  >
    <!-- This device features a modal -->
    <Modal
      v-bind:open="modal_open"
      v-on:close_modal="close_modal"
    >
      <div class="camera_image_wrapper">
        {{device.state}}
      </div>
    </Modal>

  </device>
</template>

<script>

import {device_shared_attributes} from '@/mixins/device_shared_attributes.js'
import {device_with_modal} from '@/mixins/device_with_modal.js'

export default {
  name: 'Sensor',
  mixins: [
    device_shared_attributes,
    device_with_modal
  ],
  data: function () {
    return {
      icon_class: "mdi-gauge",
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
