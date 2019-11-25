<template>
  <div class="device_details">
    <div class="" v-if="device">
      Type: {{device.type}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceDetails',
  props: {
    device_id: String
  },
  computed:{
    device(){
      return this.$store.state.devices.find(element => element._id === this.$route.query.id)
    }
  }

}
</script>
