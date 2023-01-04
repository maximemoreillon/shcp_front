import DeviceState from "@/mixins/DeviceState.js";

export const togglable = {
  mixins: [DeviceState],
  methods: {
    async toggle() {
      this.$set(this.device, "loading", true);

      const { command_topic: topic, payload_off, payload_on } = this.device;
      const payload = this.device_is_on ? payload_off : payload_on;

      try {
        await this.axios.post(`/mqtt`, { topic, payload });
      } catch (error) {
        console.error(error);
        alert("Failed to toggle device");
      }
    },
  },
};
