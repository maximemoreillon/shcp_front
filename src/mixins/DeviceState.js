export default {
  computed: {
    device_is_on(){

      try {
        // Try to parse the device state in JSON
        const parsed_state = JSON.parse(this.device.state)

        try {
          const parsed_payload_on = JSON.parse(this.device.payload_on)
          return parsed_state.state.toLowerCase() === parsed_payload_on.state.toLowerCase()
        } catch (e) {
          return parsed_state.state.toLowerCase() === 'on'
        }

      }
      catch (e) {
        // If the device state is NOT in JSON format
        return this.device.state
          && this.device.payload_on
          && this.device.state === this.device.payload_on
      }


    },

    device_is_disconnected(){

      try {
        const state = JSON.parse(this.device.state)

        return state.state === 'disconnected'
          || state.connected === false

      } catch (e) {
        return false
      }

    },
  }
}
