<template>
  <div class="">

    <DeviceIcon
      v-bind:device="device"
      v-if="show"
      v-bind:icon_class="icon_class"/>



    <!-- MODAL NOT OPENING -->
    <Modal
      v-bind:open="modal_open"
      v-on:close_modal="close_modal()">

      <div class = "properties_container">
        <table>
          <tr>
            <td>Type</td>
            <td>
              <select v-model="selected_type">

                <option
                  v-for="(device_type, index) in device_types"
                  v-bind:key="index"
                  v-bind:value="device_type.component">
                  {{device_type.label}}
                </option>

              </select>
            </td>
          </tr>
        </table>

        <div class="buttons_container">
          <button v-on:click="add_device_in_back_end()">Create device HUHUHU</button>
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
    Modal,
  },
  props: {
    device: Object,
    show: Boolean,
    modal_open: Boolean,
  },
  data () {
    return {
      icon_class : "mdi-plus-circle-outline",

      selected_type: "Light",

      device_types : [
        {label: "MQTT light", component: "Light"},
        {label: "IP camera", component: "Camera"},
        {label: "MQTT sensor", component: "Sensor"},
        {label: "MQTT heater", component: "Heater"},
        {label: "MQTT air conditioner", component: "ac"},
        {label: "MQTT fan", component: "Fan"},
      ],

      device_copy: {},

    }
  },
  methods: {
    close_modal(){
      this.$emit('close_new_device_modal');
    },
    add_device_in_back_end() {
      console.log("[WS] add_one_device_in_back_end");

      this.device_copy = JSON.parse(JSON.stringify(this.device));
      this.device_copy.type = this.selected_type

      this.$socket.client.emit('add_one_device_in_back_end', this.device_copy);
      this.$emit('close_new_device_modal');
    },
  },

}
</script>

<style scoped>

</style>
