<template>
  <div class="">

    <DeviceIcon
      v-bind:device="device"
      v-bind:icon_class="icon_class"
      v-on:icon_clicked="icon_clicked"
    />

    <Modal
      v-bind:show="modal_open"
      v-on:close_modal="close_modal"
    >
      <div class = "properties_container">
        <table>
          <tr>
            <td>Type</td>
            <td>
              SELECT
            </td>
          </tr>
        </table>

        <div class="buttons_container">
          <button v-on:click="add_device_in_back_end">Create device</button>
        </div>
      </div>
    </Modal>

  </div>
</template>

<script>

import DeviceIcon from '@/components/DeviceIcon.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'NewDevice',
  components: {
    DeviceIcon,
    Modal
  },
  props: {
    device: Object,
    show: Boolean,
    modal_open: Boolean
  },
  data: function () {
    return {

    }
  },
  methods: {
    close_modal: function () {
      this.$emit('close_new_device_modal')
    },
    add_device_in_back_end: function () {
      console.log('[WS] add_one_device_in_back_end')
      console.log('TO BE IMPLEMENTED')
      // socket.emit('add_one_device_in_back_end', this.device_copy);
      this.$emit('close_new_device_modal')
    }
  }

}
</script>

<style scoped>

</style>
