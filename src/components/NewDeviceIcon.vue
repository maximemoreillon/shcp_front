<template>
  <drag
    class="mdi"
    v-bind:class="'mdi-' + device_type.icon"
    v-bind:transfer-data="transfer_data"
    v-on:dragend="dragEnd"/>
</template>

<script>

export default {
  name: 'NewDeviceIcon',
  props: {
    device_type: Object,
  },
  methods: {
    dragEnd(data, event){

      // check if target is floorplan
      /*
      let position = {
        x: 100*event.offsetX / event.target.width,
        y: 100*event.offsetY / event.target.height,
      }

      let new_device = {
        _id: "new",
        position: position,
        type: transfer_data.data.component
      }

      console.log(new_device)

      this.$socket.client.emit('add_one_device_in_back_end', new_device);
      */

    }
  },
  computed: {
    transfer_data(){
      return {
        action: "create",
        data: this.device_type,
      }
    }
  },
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
