<template>

  <!-- wrapping in a div for click events-->
  <div
    class="device_icon_wrapper"
    v-bind:style="{left: device.position.x + '%',top: device.position.y + '%'}"
    v-on:click="$emit('icon_clicked')"
    v-on:contextmenu.prevent="$emit('icon_right_clicked')">

    <!-- The icon itself -->
    <!-- drag applied here otherwise overrides click events -->
    <!-- ID used to detect if dropped on itself -->
    <!-- dropped on itself = longpress on mobile -->
    <drag
      class="device_icon mdi"
      v-bind:id="device._id"
      v-bind:transfer-data="transfer_data"
      v-on:dragend="dragend"
      v-bind:class="icon_class">

      <!-- Badges for additional info -->
      <div
        class="icon_badge warning_badge mdi mdi-wifi-off"
        v-if="device_disconnected"/>

      <!-- Badge to indicate edit mode -->
      <transition name="fade">
        <div
          class="icon_badge edit_badge mdi mdi-pencil"
          v-if="this.$store.state.edit_mode"/>
      </transition>

    </drag>

  </div>
</template>

<script>

export default {
  name: 'DeviceIcon',
  props: {
    device: {
      type: Object,
      required: true,
    },
    icon_class: {
      type: [Array, String],
      default: "mdi-help"
    },
  },
  methods: {
    // used to check if the component is dropped on itself
    // This is used for mobile applications where contextmenu is overriden by drag and drop
    dragend(data, event){


      // check if dropped on itself
      // NOT WORKING!


    }
  },
  computed: {
    device_disconnected(){
      if(this.device.state){
        if(this.device.state === "{'state':'disconnected'}") return true;
      }
      return false;
    },
    transfer_data(){
      return {
        action: "update",
        data: this.device,
      }
    }
  }
}

</script>


<style scoped>

.device_icon_wrapper{

  /* ensure above rest */
  z-index: 5;

  /* positioning */
  position: absolute;

  /* Position by center and not by corner */
  transform: translate(-50%,-50%);

  /* Misc visual */
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

}

.device_icon {

  position: relative;

  /* default color */
  color: #535353;

  font-size: 6vmin;
  transition: color 0.5s;

}

.icon_badge{
  position: absolute;
  top: 20%;
  left: 80%;

  transform: translate(-50%,-50%);

  border: 0.3vmin solid white;
  border-radius: 50%;

  width: 3vmin;
  height: 3vmin;

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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}


.fade-enter, .fade-leave-to{
  opacity: 0;
}




</style>
