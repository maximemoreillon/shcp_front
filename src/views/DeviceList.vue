<template>
  <div class="device_list">
    <div
      class="device_wrapper"
      v-for="device in $store.state.devices">

      <div
        class=""
        v-for="(property, key) in device">
        {{key}}: {{property}}

      </div>

      <span
        class="delete_icon"
        v-on:click="delete_device(device)">×</span>


    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceList',
  props: { },
  computed:{

  },
  methods: {
    delete_device(device){
      if(confirm('Really?')){
        this.$socket.client.emit('delete_one_device_in_back_end', device);
      }

    }
  }

}
</script>

<style scoped>
.device_wrapper{
  border: 1px solid #dddddd;
  margin: 5px;
  padding: 5px;
  position: relative;
}

.delete_icon {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 200%;
  cursor: pointer;
}
</style>
