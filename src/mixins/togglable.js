export const togglable = {

  methods: {
    toggle(){
      var message = {};
      message.command_topic = this.device.command_topic;

      // Just send the opposite state
      if(this.device.state == this.device.payload_on) {
        message.payload = this.device.payload_off;
      }
      else {
        message.payload = this.device.payload_on;
      }

      console.log('[WS] toggle_device_state');
      this.$socket.client.emit('front_to_mqtt', message);
    }
  },

  
};
