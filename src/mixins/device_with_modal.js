import Modal from '@/components/Modal.vue'

export const device_with_modal = {
  components:{
    Modal,
  },
  methods: {
    open_modal: function(){
      this.modal_open = true;
      this.camera_image_url = "/camera?_id=" + this.device._id;
    },
    close_modal: function() {
      this.modal_open = false;
      this.camera_image_url = "images/devices/cctv.svg";
    }
  }
};
