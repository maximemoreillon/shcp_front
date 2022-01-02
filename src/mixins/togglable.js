export const togglable = {
  computed: {
    device_is_on(){

      try {
        const parsed_state = JSON.parse(this.device.state)
        return parsed_state.state.toLowerCase() === 'on'
      } catch (e) {
        return this.device.state
          && this.device.payload_on
          && this.device.state === this.device.payload_on
      }


    },
  },
  methods: {
    toggle(){
      var message = {};
      message.command_topic = this.device.command_topic

      // Just send the opposite state
      if(this.device_is_on) message.payload = this.device.payload_off
      else message.payload = this.device.payload_on

      this.$socket.client.emit('front_to_mqtt', message)

      // Mark device as loading
      this.$set(this.device, 'loading', true)
    }
  },


};
