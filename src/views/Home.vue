<template>
  <div class="home">

    <div class="floorplan_wrapper">
      <img
        class="floorplan"
        alt="floorplan"
        src="../assets/floorplan.svg"
        v-on:click="floorplan_clicked"/>


      <component
        v-for="device in devices"
        v-bind:device="device"
        v-bind:is="device.type"/>


      <NewDevice
        v-bind:device="new_device"
        v-bind:show="show_new_device"
        v-bind:modal_open="new_device_modal_open"
        v-on:close_new_device_modal="close_new_device_modal"/>


    </div>

    <div class="edit_button_wrapper">
      <button type="button" v-on:click="$store.commit('toggle_edit_mode')">edit mode</button>
    </div>




  </div>
</template>

<script>
// @ is an alias to /src

// Import devices types
import Light from '@/components/devices/Light.vue'
import ac from '@/components/devices/AC.vue'
import Heater from '@/components/devices/Heater.vue'
import Sensor from '@/components/devices/Sensor.vue'
import Camera from '@/components/devices/Camera.vue'
import Fan from '@/components/devices/Fan.vue'

import NewDevice from '@/components/NewDevice.vue'


export default {
  name: 'home',
  data () {
    return {
      devices: [],
      new_device: {
        _id: "new",
        position: {
          x : 0,
          y : 0
        }
      },
      show_new_device: false,
      new_device_modal_open: false,
    }
  },
  components: {
    Light,
    Camera,
    Sensor,
    Heater,
    ac, // Why can't AC be all caps?
    Fan,
    NewDevice,
  },
  methods: {
    banana(){
      console.log("banana")
    },
    floorplan_clicked(event) {
      if(this.$store.state.edit_mode){

        // Positioning the new device
        this.new_device.position.x = 100.00*event.offsetX/event.target.offsetWidth;
        this.new_device.position.y = 100.00*event.offsetY/event.target.offsetHeight;

        this.show_new_device = true;
        this.new_device_modal_open = true;
      }
    },
    close_new_device_modal(){
      this.show_new_device = false;
      this.new_device_modal_open = false;
    },
    delete_all_devices_in_front_end() {
      this.devices.splice(0,this.devices.length);
    },

    add_or_update_some_devices_in_front_end(incoming_device_array){
      // Update a device in the vue component data or create it if it does not exist already

      for(var incoming_device_index=0; incoming_device_index < incoming_device_array.length; incoming_device_index ++){
        // Check if device with this ID already exists locally
        var device_exists = false;
        for(var device_index=0; device_index < this.devices.length; device_index ++){
          if(this.devices[device_index]._id === incoming_device_array[incoming_device_index]._id){
            device_exists = true;

            // update the device
            this.$set(this.devices, device_index, incoming_device_array[incoming_device_index])

            // no need to go further in the loop
            break;
          }
        }
        // the device didn't exist already, so create it
        if(!device_exists){
          this.devices.push(incoming_device_array[incoming_device_index]);
        }
      }
    },

    delete_some_devices_in_front_end: function(devices_to_delete){
      // devices_to_delete is an array
      for(var index=0; index<devices_to_delete.length; index++){
        for(var device_index=0; device_index < this.devices.length; device_index ++){
          if(this.devices[device_index]._id === devices_to_delete[index]._id){

            // delete the device
            this.devices.splice(device_index,1);

            // no need to go further in the loop
            break;
          }
        }
      }
    },
  },
  // Handle websocket events
  // MAKE IT CONNECT ON MOUNT!!
  sockets: {
    add_or_update_some_in_front_end: function (device_array) {
      console.log("[WS] add_or_update_some_in_front_end");
      this.add_or_update_some_devices_in_front_end(device_array);
    },
    delete_and_create_all_in_front_end: function(device_array) {
      console.log("[WS] delete_and_create_all_in_front_end");
      this.delete_all_devices_in_front_end();
      this.add_or_update_some_devices_in_front_end(device_array);
    },
    delete_some_in_front_end: function(device_array){
      console.log("[WS] delete_some_in_front_end");
      this.delete_some_devices_in_front_end(device_array);
    }
  },


  mounted: function () {
    console.log("Home mounted");
    this.$socket.client.emit('get_all_devices_from_back_end', {});
  },
  beforeDestroy: function(){
    console.log("Home before destroyed");
  },

}
</script>

<style scoped>

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}



.floorplan_wrapper{
  /* used to position components absolutely */
  position: relative;

  /* used so that its size fits the content */
  display: inline-block;
}

.floorplan{
  height: 60vh;
}

.edit_button_wrapper{
  margin: 25px;
}


</style>
