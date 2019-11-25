<template>
  <drag
    class="mdi device_icon"
    v-bind:class="'mdi-' + device_type.icon"
    v-bind:transfer-data="transfer_data"/>
</template>

<script>

export default {
  name: 'NewDeviceIcon',
  props: {
    device_type: Object,
  },
  methods: {

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



.device_icon {

  /* default color */
  color: #535353;


}





</style>
