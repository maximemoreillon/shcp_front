<template>
  <div class="home">

    <!-- Button to open side menu -->
    <span
      class="mdi mdi-pencil new_devices_area_open_button"
      v-on:click="$store.commit('set_edit_mode', true)"/>

    <!-- Menu to add devices -->
    <div
      class="new_device_area_wrapper"
      v-bind:class="{open: $store.state.edit_mode}">

      <!-- close button -->
      <span
      class="mdi mdi-pencil-off new_devices_area_close_button"
      v-on:click="$store.commit('set_edit_mode', false)"/>

      <!-- divider -->
      <div class="divider"/>

      <!-- Icons for new devices -->
      <NewDeviceIcon
        v-for="device_type in device_types"
        v-bind:device_type="device_type"/>
    </div>

    <!-- the floorplan -->
    <drop
      class="floorplan_wrapper"
      v-on:drop="drop"
      v-on:dragenter="dragenter">

      <!-- is ID needed? -->
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

      <!-- TODO: Restore -->
      <span class="devices_loader" v-if="false"/>

    </drop>


    <!-- Diconnection warning modal -->
    <DisconnectionWarning />

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

import NewDeviceIcon from '@/components/NewDeviceIcon.vue'
import DisconnectionWarning from '@/components/DisconnectionWarning.vue'

export default {
  name: 'home',
  data () {
    return {

      // icons in the new device area
      device_types : [
        {label: "MQTT light", component: "Light", icon:"lightbulb"},
        {label: "IP camera", component: "Camera", icon:"cctv"},
        {label: "MQTT sensor", component: "Sensor", icon:"gauge"},
        {label: "MQTT heater", component: "Heater", icon:"radiator"},
        {label: "MQTT air conditioner", component: "ac", icon:"air-conditioner"},
        {label: "MQTT fan", component: "Fan", icon:"fan"},
      ],

    }
  },
  components: {
    // Devices
    Light,
    Camera,
    Sensor,
    Heater,
    ac, // Why can't AC be all caps?
    Fan,

    // Additional stuff
    NewDeviceIcon,
    DisconnectionWarning,
  },
  mounted(){
  },
  methods: {
    floorplan_clicked(event) {
      if(this.$store.state.edit_mode){
        this.$store.commit('set_edit_mode', false)
      }
    },

    floorplan_right_clicked(){
      this.$store.commit('set_edit_mode', true)
    },
    dragenter(){
      //this.new_devices_menu_open = false;
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
          // Update an existing device (i.e. move it)

          if(this.$store.state.edit_mode){

            let device = transfer_data.data;
            device.position = position
            this.$socket.client.emit('edit_one_device_in_back_end', device);

          }
        }
      }
      else if(event.target.id === transfer_data.data._id){
        // Device dropped on itself
        // this isequivalent to a long press on mobile
        this.$store.commit('set_edit_mode', true)

      }
    },
  },
  computed: {

  }
}
</script>

<style scoped>

.home {

  /* Using flex so that wrapper takes dimensions of content */
  display: flex;
  justify-content: center;
}

.floorplan_wrapper{

  /* used to position components absolutely */
  position: relative;

  /* alignment*/
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;

}

.floorplan{
  /* Dimensions set using Vue */
  width: 60vmin;

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

  color: #444444;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  /* lucky that it works ... */
  height: 100%;


  transition: transform 0.5s;

  background: white;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 200%;

}

.new_device_area_wrapper:not(.open) {
  transform: translateX(-100%);

}

.new_device_area_wrapper > *:not(.divider) {
  padding: 15px;
}

.new_device_area_wrapper .divider {
  width: 75%;
  border-bottom: 1px solid #dddddd;
}


.new_devices_area_open_button {
  color: #444444;
  padding: 15px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 200%;

  cursor: pointer;
  transition: color 0.25s;
}

.new_devices_area_close_button {
  cursor: pointer;
  transition: color 0.25s;
}


.new_devices_area_close_button {
  cursor: pointer;
  transition: color 0.25s;
}

.new_devices_area_open_button:hover, .new_devices_area_close_button:hover {
  color: #c00000;
}

.new_device_area_wrapper_background{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;
}

.new_device_area_wrapper_background.visible {
  opacity: 0.5;
  visibility: visible;;
}
.new_device_area_wrapper_background > div {
  width: 100%;
  height: 100%;
}
</style>
