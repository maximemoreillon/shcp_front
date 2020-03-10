import Device from '@/components/Device.vue'

export const device_shared_attributes = {
  components: {
    Device,
  },
  data: function () {
    return {

    }
  },
  props: {
    device: {
      type: Object,
      required: true,
    },
  },

};
