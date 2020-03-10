<template>
  <device
    v-bind:device="device"
    v-bind:icon_class="icon_class"
    v-on:icon_clicked="open_modal()"
    v-bind:form_fields="form_fields"
  >

    <!-- This device features a modal -->
    <Modal
      v-bind:open="modal_open"
      v-on:close_modal="close_modal()"
    >
      <div class="camera_image_wrapper">

        <img
          v-if="camera_image_url"
          class="camera_image"
          v-bind:src="camera_image_url">

        <span v-else class="mdi mdi-cctv"/>

      </div>

    </Modal>

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
  data() {
    return {
      form_fields: [
        {key: "stream_url", label:"Stream URL"},
      ],
      icon_class: "mdi-cctv",
      modal_open: false,
      camera_image_url: null,
    }
  },
  methods: {
    open_modal(){
      this.modal_open = true;
      this.camera_image_url = "https://shcp.maximemoreillon.com/camera"
        +"?_id="+ this.device._id
        +"&jwt="+ this.$cookies.get('jwt');
    },
    close_modal(){
      this.modal_open = false;
      this.camera_image_url = null
    }
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
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
}

</style>
