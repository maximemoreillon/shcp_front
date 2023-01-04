<template>
  <drag class="device_icon" :transfer-data="transfer_data">
    <slot />
  </drag>
</template>

<script>
export default {
  name: "NewDeviceIcon",
  props: {
    component: String,
  },
  methods: {},
  computed: {
    transfer_data() {
      return {
        action: "create",
        data: { component: this.component },
      };
    },
  },
};
</script>

<style scoped>
.device_icon {
  /* default color */
  color: #535353;
}
</style>
