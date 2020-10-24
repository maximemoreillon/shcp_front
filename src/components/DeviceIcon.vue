<template>

  <!-- wrapping in a div for click events-->
  <drag
    class="device_icon_wrapper"
    v-bind:transfer-data="transfer_data"
    v-bind:style="{left: device.position.x + '%',top: device.position.y + '%'}">

    <!-- The icon itself -->
    <!-- Manages drag evvents -->
    <!-- drag applied here otherwise overrides click events -->
    <!-- ID used to detect if dropped on itself -->
    <!-- dropped on itself = long press on mobile -->
    <div
      v-on:click="$emit('icon_clicked')"
      v-on:contextmenu.prevent="$emit('icon_right_clicked')"
      class="device_icon"
      v-bind:id="device._id"
      v-bind:class="{on: device_is_on, loading: device.loading}">

      <!-- the icon itself, again -->
      <slot name="icon"/>
      <help-icon v-if="!this.$slots.icon"/>

      <!-- Badges for disconnection -->
      <transition name="fade">
        <div
           v-if="device_disconnected"
           class="icon_badge warning_badge">
          <wifi-off-icon/>
        </div>
      </transition>

      <!-- Badge to indicate edit mode -->
      <transition name="fade">
        <div
           v-if="this.$store.state.edit_mode"
          class="icon_badge edit_badge">
          <pencil-icon/>
        </div>
      </transition>

      <!-- Badge to indicate loasing -->
      <transition name="fade">
        <div
           v-if="device.loading"
           class="icon_badge loading_badge">
          <loading-icon/>
        </div>
      </transition>

    </div>

  </drag>
</template>

<script>

import HelpIcon from 'vue-material-design-icons/Help.vue';
import WifiOffIcon from 'vue-material-design-icons/WifiOff.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import LoadingIcon from 'vue-material-design-icons/Loading.vue';


export default {
  name: 'DeviceIcon',
  props: {
    device: {
      type: Object,
      required: true,
    },
    icon_class: {
    },
  },
  components: {
    HelpIcon,
    PencilIcon,
    WifiOffIcon,
    LoadingIcon,
  },
  methods: {},
  computed: {
    device_is_on(){
      if(this.device.state && this.device.payload_on){
        if(this.device.state === this.device.payload_on){
          return true;
        }
      }
      return false;
    },

    device_disconnected(){
      /* this needs to be updated */

      // Check if the device has a parsable state (IP cameras do not)
      var state = null
      try {
        state = JSON.parse(this.device.state)
        if(state.state === 'disconnected') return true
        else return false
      } catch (e) {
        return false
      }

    },

    transfer_data(){
      // Data transfered using drag drop
      return {
        action: "update",
        data: this.device,
      }
    }
  }
}

</script>


<style>

.device_icon_wrapper{

  /* ensure above rest */
  z-index: 5;

  /* positioning */
  position: absolute;

  /* Position by center and not by corner */
  transform: translate(-50%,-50%);

  /* Misc visual */
  cursor: pointer;

}

.device_icon {

  /* padding to facilitate dropping on itself */
  padding: 2vmin;

  position: relative;

  /* default color */
  color: #535353;

  font-size: 5vmin;
  transition: color 0.5s;
}





.icon_badge{
  position: absolute;
  top: 10%;
  right: 10%;

  border: 0.3vmin solid white;
  border-radius: 50%;

  width: 1.5em;
  height: 1.5em;

  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2vmin;

}




.warning_badge {
  background-color: #c00000;
}

.edit_badge {
  background-color: #666666;
}

.on {
  color: #c00000;
}

.loading {
  color: #aaaaaa;
}

.loading_badge {

  background-color: #666666;


  animation-name: rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;


}


@keyframes rotation {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

</style>
