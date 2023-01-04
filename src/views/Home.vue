<template>
  <div class="home">
    <!-- Button to open side menu -->
    <div
      class="control_icon_wrapper new_devices_area_open_button_wrapper"
      @click="$store.commit('set_edit_mode', true)"
    >
      <pencil-icon class="new_devices_area_open_button control_icon" />
    </div>

    <!-- Side menu to add devices -->
    <div
      class="new_device_area_wrapper"
      :class="{ open: $store.state.edit_mode }"
    >
      <!-- close button -->
      <div
        class="control_icon_wrapper"
        @click="$store.commit('set_edit_mode', false)"
      >
        <pencil-off-icon class="new_devices_area_close_button control_icon" />
      </div>

      <!-- divider -->
      <div class="divider" />

      <!-- Icons for new devices -->
      <NewDeviceIcon component="Light">
        <lightbulb-icon />
      </NewDeviceIcon>
      <NewDeviceIcon component="Fan">
        <fan-icon />
      </NewDeviceIcon>
      <NewDeviceIcon component="ac">
        <air-conditioner-icon />
      </NewDeviceIcon>
      <NewDeviceIcon component="Heater">
        <radiator-icon />
      </NewDeviceIcon>
      <NewDeviceIcon component="Lock">
        <lock-icon />
      </NewDeviceIcon>
      <NewDeviceIcon component="Sensor">
        <gauge-icon />
      </NewDeviceIcon>

      <!-- divider -->
      <div class="divider" />

      <div
        @click="floorplan_upload_modal_open = true"
        class="control_icon_wrapper"
      >
        <image-edit-icon class="new_devices_area_close_button control_icon" />
      </div>
    </div>

    <!-- the floorplan -->
    <drop class="floorplan_wrapper" @drop="drop" @dragenter="dragenter">
      <!-- is ID needed? -->
      <img
        id="floorplan"
        ref="floorplan"
        class="floorplan droptarget"
        alt="floorplan"
        :style="floorplan_size"
        :class="{ loading: $store.state.devices_loading }"
        :src="floorplan_src"
        @click="floorplan_clicked($event)"
        @contextmenu.prevent="$store.commit('set_edit_mode', true)"
      />

      <!-- Devices are stored in Vuex -->
      <component
        v-for="device in $store.state.devices"
        :key="device._id"
        :device="device"
        :is="device.type"
      />

      <transition name="fade">
        <span class="devices_loader" v-if="$store.state.devices_loading" />
      </transition>
    </drop>

    <!-- WS Diconnection warning modal -->
    <DisconnectionWarning />

    <!-- Floorplan upload model -->
    <!-- TODO: Make this a component -->
    <Modal
      :open="floorplan_upload_modal_open"
      @close_modal="floorplan_upload_modal_open = false"
    >
      <h2>Upload new floorplan</h2>

      <input
        type="file"
        ref="floorplan_upload"
        accept="image/png, image/jpeg"
      />
      <button type="button" @click="floorplan_upload()">upload</button>
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src

// Import devices types
import Light from "@/components/devices/Light.vue";
import Lock from "@/components/devices/Lock.vue";
import ac from "@/components/devices/AC.vue";
import Heater from "@/components/devices/Heater.vue";
import Sensor from "@/components/devices/Sensor.vue";
import Camera from "@/components/devices/Camera.vue";
import Fan from "@/components/devices/Fan.vue";

import NewDeviceIcon from "@/components/NewDeviceIcon.vue";
import DisconnectionWarning from "@/components/DisconnectionWarning.vue";
import Modal from "@/components/Modal.vue";

import PencilIcon from "vue-material-design-icons/Pencil.vue";
import PencilOffIcon from "vue-material-design-icons/PencilOff.vue";

// Icons of the devices, NOT IDEAL
import LightbulbIcon from "vue-material-design-icons/Lightbulb.vue";
import RadiatorIcon from "vue-material-design-icons/Radiator.vue";
import FanIcon from "vue-material-design-icons/Fan.vue";
import AirConditionerIcon from "vue-material-design-icons/AirConditioner.vue";
import GaugeIcon from "vue-material-design-icons/Gauge.vue";
import CctvIcon from "vue-material-design-icons/Cctv.vue";
import ImageEditIcon from "vue-material-design-icons/ImageEdit.vue";
import LockIcon from "vue-material-design-icons/Lock.vue";

export default {
  name: "home",
  data() {
    return {
      floorplan_upload_modal_open: false,

      floorplan_size: {
        width: undefined,
        height: undefined,
      },
    };
  },
  components: {
    // Devices
    Light,
    Camera,
    Sensor,
    Heater,
    ac,
    Fan,
    Lock,

    // Additional stuff
    NewDeviceIcon,
    DisconnectionWarning,
    Modal,

    // icons
    PencilIcon,
    PencilOffIcon,

    LightbulbIcon,
    RadiatorIcon,
    FanIcon,
    AirConditionerIcon,
    GaugeIcon,
    CctvIcon,
    ImageEditIcon,
    LockIcon,
  },
  mounted() {
    const img = new Image();
    img.src = this.floorplan_src;
    img.onload = () => {
      this.compute_floorplan_size();
    };
    window.onresize = () => {
      this.compute_floorplan_size();
    };
  },
  methods: {
    compute_floorplan_size() {
      // DIRTY

      let original_floorplan_width = this.$refs.floorplan.naturalWidth;
      let original_floorplan_height = this.$refs.floorplan.naturalHeight;

      let available_vertical_space = window.innerHeight - 250;
      let available_horizontal_space = window.innerWidth - 2 * 65;

      let horizontal_scaling =
        available_horizontal_space / original_floorplan_width;
      let vertical_scaling =
        available_vertical_space / original_floorplan_height;

      if (vertical_scaling < horizontal_scaling) {
        this.floorplan_size.height =
          original_floorplan_height * vertical_scaling + "px";
        this.floorplan_size.width = undefined;
      } else {
        this.floorplan_size.height = undefined;
        this.floorplan_size.width =
          original_floorplan_width * horizontal_scaling + "px";
      }
    },

    floorplan_clicked(event) {
      if (this.$store.state.edit_mode) {
        this.$store.commit("set_edit_mode", false);
      }
    },

    async createDevice(device) {
      try {
        await this.axios.post("/devices", device);
      } catch (error) {
        console.error(error);
        alert("Failed to create device");
      }
    },

    async updateDevice(device) {
      try {
        const { _id, ...properties } = device;
        const url = `/devices/${_id}`;
        await this.axios.patch(url, properties);
      } catch (error) {
        console.error(error);
        alert("Failed to update device");
      }
    },

    dragenter() {
      // this.new_devices_menu_open = false;
    },

    async drop(transfer_data, event) {
      if (event.target.id === "floorplan") {
        // Device has been dropped on the floorplan

        const position = {
          x: (100 * event.offsetX) / event.target.width,
          y: (100 * event.offsetY) / event.target.height,
        };

        if (transfer_data.action === "create") {
          const device_properties = {
            position,
            type: transfer_data.data.component,
          };
          // Create a new device
          await this.createDevice(device_properties);
        } else if (transfer_data.action === "update") {
          // Update an existing device (i.e. move it)

          if (this.$store.state.edit_mode) {
            let device = transfer_data.data;
            device.position = position;
            await this.updateDevice(device);

            // Mark device as loading
            this.$set(device, "loading", true);
          }
        }
      } else if (event.target.id === transfer_data.data._id) {
        // Device dropped on itself
        // this isequivalent to a long press on mobile
        this.$store.commit("set_edit_mode", true);
      }
    },
    floorplan_upload() {
      // Get image from input
      this.image = this.$refs.floorplan_upload.files[0];
      if (!this.image) return;

      const formData = new FormData();
      formData.append("image", this.image);
      this.axios
        .post(`${process.env.VUE_APP_SHCP_API_URL}/floorplan`, formData)
        .then(() => this.$router.go())
        .catch((error) => {
          alert(`Something went wrong while uploading the floorplan`);
          console.error(error);
        });
    },
  },
  computed: {
    floorplan_src() {
      const jwt = this.$cookie.get("jwt");
      return `${process.env.VUE_APP_SHCP_API_URL}/floorplan?token=${jwt}`;
    },
  },
};
</script>

<style scoped>
.home {
  /* margin-top: 1em; */
  position: relative;
  height: 100%;
  /* Using flex so that wrapper takes dimensions of content */
  display: flex;
  justify-content: center;
  align-items: center;
}

.floorplan_wrapper {
  /* used to position components absolutely */
  position: relative;

  /* alignment*/
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
}

.floorplan {
  /* width: 50vmin; */
  transition: opacity 0.25s;
}

.floorplan.loading {
  opacity: 0.2;
}

.devices_loader {
  z-index: 29;
  width: 20vmin;
  height: 20vmin;
  position: absolute;
  top: 50%;
  left: 50%;

  border-radius: 50%;
  border-width: 4px;
  border-style: solid;
  border-color: #c00000 transparent #c00000 transparent;
  /* Position by center and not by corner */
  transform: translate(-50%, -50%);

  animation-name: rotation;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes rotation {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.new_device_area_wrapper {
  color: #444444;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  transition: transform 0.5s, box-shadow 0.5s;

  background: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 200%;
}

.control_icon_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 15px; */
}

.new_device_area_wrapper .material-design-icon {
  cursor: pointer;
}

.new_device_area_wrapper.open {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.new_device_area_wrapper:not(.open) {
  transform: translateX(-100%);
}

.new_device_area_wrapper > *:not(.divider) {
  padding: 15px;
}

.new_device_area_wrapper .divider {
  width: 75%;
  border-bottom: 1px solid #dddddd;
}

.new_devices_area_open_button {
  color: #444444;
  font-size: 200%;

  cursor: pointer;
  transition: color 0.25s;
}

.new_devices_area_open_button_wrapper {
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
}

.new_devices_area_close_button {
  cursor: pointer;
  transition: color 0.25s;
}

.new_devices_area_close_button {
  cursor: pointer;
  transition: color 0.25s;
}

.new_devices_area_open_button:hover,
.new_devices_area_close_button:hover {
  color: #c00000;
}

.new_device_area_wrapper_background {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s, visibility 0.5s;
}

.new_device_area_wrapper_background.visible {
  opacity: 0.5;
  visibility: visible;
}

.new_device_area_wrapper_background > div {
  width: 100%;
  height: 100%;
}
</style>
