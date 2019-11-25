<template>
  <div class="home">

    <span class="mdi mdi-plus new_devices_area_open_button" v-on:click="new_devices_menu_open = true"/>

    <!-- Menu to add devices -->
    <div class="new_device_area_wrapper" v-if="new_devices_menu_open">
      <span class="mdi mdi-close" v-on:click="new_devices_menu_open = false"/>
      <NewDeviceIcon
        v-for="device_type in device_types"
        v-bind:device_type="device_type"/>
    </div>


    <drop
      class="floorplan_wrapper"
      v-on:drop="drop"
      v-on:dragenter="dragenter">

      <img
        id="floorplan"
        class="floorplan droptarget"
        alt="floorplan"
        src="../assets/floorplan.svg"
        v-on:click="floorplan_clicked($event)"
        v-on:contextmenu.prevent="floorplan_right_clicked()"/>

      <!-- Devices are stored in Vuex -->
      <component
        v-for="(device,index) in $store.state.devices"
        v-bind:key="device._id"
        v-bind:device="device"
        v-bind:is="device.type"/>


      <NewDevice
        v-bind:device="new_device"
        v-bind:show="show_new_device"
        v-bind:modal_open="new_device_modal_open"
        v-on:close_new_device_modal="close_new_device_modal()"/>

      <!-- TODO: Restore -->
      <span class="devices_loader" v-if="false"/>

    </drop>

    <!-- Button to put the app in edit mode -->
    <!--
    <span
      class="edit_button mdi mdi-pencil"
      v-on:click="$store.commit('toggle_edit_mode')"/>
    -->



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
import NewDeviceIcon from '@/components/NewDeviceIcon.vue'

export default {
  name: 'home',
  data () {
    return {

      new_devices_menu_open: false,

      // icons in the new device area
      device_types : [
        {label: "MQTT light", component: "Light", icon:"lightbulb"},
        {label: "IP camera", component: "Camera", icon:"cctv"},
        {label: "MQTT sensor", component: "Sensor", icon:"gauge"},
        {label: "MQTT heater", component: "Heater", icon:"radiator"},
        {label: "MQTT air conditioner", component: "ac", icon:"air-conditioner"},
        {label: "MQTT fan", component: "Fan", icon:"fan"},
      ],

      // Not needed anymore thanks to drag and drop
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
    NewDeviceIcon,
  },
  methods: {
    floorplan_clicked(event) {
      if(this.$store.state.edit_mode){

        /*
        // Positioning the new device
        this.new_device.position.x = 100.00*event.offsetX/event.target.offsetWidth;
        this.new_device.position.y = 100.00*event.offsetY/event.target.offsetHeight;

        this.show_new_device = true;
        this.new_device_modal_open = true;
        */

        this.$store.commit('toggle_edit_mode')

      }
    },
    close_new_device_modal(){
      this.show_new_device = false;
      this.new_device_modal_open = false;
    },
    floorplan_right_clicked(){
      alert('right')
    },
    dragenter(){
      this.new_devices_menu_open = false;
    },

    drop(transfer_data, event) {

      if(event.target.id === "floorplan"){
        // Device has been dropped on the floorplan

        let position = {
          x: 100*event.offsetX / event.target.width,
          y: 100*event.offsetY / event.target.height,
        }

        if(transfer_data.action === "create"){
          // Create a new device
          this.$socket.client.emit('add_one_device_in_back_end', {
            _id: "new",
            position: position,
            type: transfer_data.data.component
          });
        }
        else if(transfer_data.action === "update"){
          // Update an existing device

          console.log("[WS] edit_one_device_in_back_end");
          let device = transfer_data.data;
          device.position = position
          this.$socket.client.emit('edit_one_device_in_back_end', device);


        }


      }
      else if(event.target.id === transfer_data.data._id){
        // Device dropped on itself
        // this isequivalent to a long press on mobile
        console.log("dropped on itself")

        this.$store.commit('toggle_edit_mode')


      }
    },
  },
}
</script>

<style scoped>

.home {

}

.floorplan_wrapper{
  /* used to position components absolutely */
  position: relative;

  /* alignment*/
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;

  /* used so that its size fits the content */
  width: 50vmin;
  /* height is set by content */
}

.floorplan{
  width: 100%;
  /* height not set so as to preserve aspect ratio */
}

.edit_button_wrapper{
  margin: 25px;
}


.edit_button {
  font-size: 200%;
  cursor: pointer;
  color: #444444;
}

.devices_loader{
  z-index: 29;
  width: 20vmin;
  height: 20vmin;
  position: absolute;
  top: 50%;
  left: 50%;

  border-radius: 50%;
  border-width: 4px;
  border-style: solid;
  border-color: #c00000 transparent #c00000 transparent;
  /* Position by center and not by corner */
  transform: translate(-50%,-50%);

  animation-name: rotation;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

}

@keyframes rotation {
  0% {transform: translate(-50%,-50%) rotate(0deg);}
  100% {transform: translate(-50%,-50%) rotate(360deg);}
}

.new_device_area_wrapper{


  position: absolute;
  top: 0;
  height: 100%;



  background: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 200%;



}


.new_device_area_wrapper > * {
  padding: 15px;
}


.new_devices_area_open_button {
  padding: 15px;
  position: absolute;
  top: 0;
  font-size: 200%;
}

</style>
