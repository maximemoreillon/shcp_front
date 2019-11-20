<template>
  <div
    class="device_icon_wrapper"
    v-bind:style="{left: device.position.x + '%',top: device.position.y + '%'}"
    v-on:click="icon_clicked"
  >
    <!-- The icon itself -->
    <span
      class="device_icon mdi"
      v-bind:class="icon_class"

    ></span>

    <!-- Badges for additional info -->
    <div
      class="icon_badge warning_badge"
      v-if="device_disconnected"
    >
      <span class="mdi mdi-wifi-off"></span>
    </div>

    <!-- Badge to indicate edit mode -->
    <transition name="fade">
      <div
        class="icon_badge edit_badge"
        v-if="this.$store.state.edit_mode"
      >
        <span class="mdi mdi-pencil"></span>
      </div>
    </transition>

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
    icon_clicked: function(){
      this.$emit('icon_clicked');
    }
  },
  computed: {
    device_disconnected: function(){
      if(this.device.state){
        if(this.device.state === "{'state':'disconnected'}") return true;
      }
      return false;
    }
  }
}

</script>


<style scoped>
@import url("//cdn.materialdesignicons.com/3.5.95/css/materialdesignicons.min.css");

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
