<template>

  <device
    v-bind:device="device"
    v-on:icon_clicked="open_modal()"
    v-bind:form_fields="form_fields">

    <template v-slot:icon>
      <span
        class="sensor_reading"
        v-if="icon_additional_content">{{icon_additional_content}}</span>
      <gauge-icon v-else/>
    </template>

    <!-- This device features a modal used in the slot-->
    <Modal
      v-bind:open="modal_open"
      v-on:close_modal="close_modal()">

      <div class="sensor_modal_wrapper">

        <div class="sensor_modal_title">
          {{device.measurement_name}}
        </div>

        <div class="sensor_modal_content" v-if="this.device.json_key && this.device.state">
          {{JSON.parse(device.state.replace(/'/g,'"'))[device.json_key]}} {{device.unit}}
        </div>

        <div class="sensor_modal_content" v-else>
          {{device.state}}
        </div>

      </div>
    </Modal>

  </device>
</template>

<script>

import { device_shared_attributes } from '@/mixins/device_shared_attributes.js'
import { device_with_modal } from '@/mixins/device_with_modal.js'

import GaugeIcon from 'vue-material-design-icons/Gauge.vue'

export default {
  name: 'Sensor',
  mixins: [
    device_shared_attributes,
    device_with_modal
  ],
  components: {
    GaugeIcon
  },
  data () {
    return {

      form_fields: [
        { key: 'measurement_name', label: 'Measurement name' },
        { key: 'status_topic', label: 'Status topic' },
        { key: 'json_key', label: 'JSON key' },
        { key: 'unit', label: 'Unit' }
      ],

      modal_open: false

    }
  },
  computed: {
    icon_additional_content () {
      if (this.device.json_key && this.device.state) {
        if (JSON.parse(this.device.state.replace(/'/g, '"'))[this.device.json_key]) {
          return JSON.parse(this.device.state.replace(/'/g, '"'))[this.device.json_key] + this.device.unit
        }
      }
      return ''
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sensor_modal_wrapper{
  text-align: center;
}

.sensor_modal_wrapper > * {
  margin: 25px;
}
.sensor_modal_title {
  font-size: 150%;
}

.sensor_reading {
  font-size: 50%;
}
</style>
