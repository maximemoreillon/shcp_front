<template>
  <device
    v-bind:device="device"
    v-on:icon_clicked="toggle()"
    v-bind:form_fields="form_fields"
  >
    <template v-slot:icon>
      <lightbulb-icon />
    </template>
  </device>
</template>

<script>
// Importing mixins
import { device_shared_attributes } from "@/mixins/device_shared_attributes.js";
import { togglable } from "@/mixins/togglable.js";

import LightbulbIcon from "vue-material-design-icons/Lightbulb.vue";

export default {
  name: "Light",
  mixins: [device_shared_attributes, togglable],
  components: {
    LightbulbIcon,
  },
  data() {
    return {
      form_fields: [
        { key: "command_topic", label: "Command topic" },
        { key: "status_topic", label: "Status topic" },
        { key: "payload_on", label: "Payload ON" },
        { key: "payload_off", label: "Payload OFF" },
      ],
    };
  },
};
</script>
