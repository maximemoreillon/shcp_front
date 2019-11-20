<template>
  <device
    v-bind:device="device"
    v-bind:icon_class="icon_class"
    v-on:icon_clicked="open_modal"
    v-bind:form_fields="form_fields"
  >

    <!-- This device features a modal -->
    <modal
      v-bind:open="modal_open"
      v-on:close_modal="close_modal"
    >
      <div class="camera_image_wrapper">
        <img class="camera_image" v-bind:src="camera_image_url">
      </div>
    </modal>

  </device>
</template>

<script>

import {device_shared_attributes} from '@/mixins/device_shared_attributes.js'
import {device_with_modal} from '@/mixins/device_with_modal.js'

export default {
  name: 'Camera',
  mixins: [
    device_with_modal,
    device_shared_attributes,
  ],
  data: function () {
    return {
      form_fields: [
        {key: "stream_url", label:"Stream URL"},
      ],
      icon_class: "mdi-cctv",
      modal_open: false,
      camera_image_url: "images/devices/cctv.svg",
    }
  },
  methods: {

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.camera_image_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.camera_image {
  max-width: 100%;
}

</style>
