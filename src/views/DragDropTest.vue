<template>
  <div class="outer_wrapper">

    <div
      class="inner_wrapper"
      ref="floorplan_wrapper"
      draggable="false"
      @mousedown="wrapper_mousedown()"
      @mouseup="wrapper_mouseup()"
      @mousemove="wrapper_mousemove($event)"
      >
      <img
        ref="floorplan"
        draggable="false"
        class="floorplan"
        src="@/assets/floorplan.svg" alt="">

      <div
        draggable="false"
        class="device_wrapper"
        v-for="(device, i) in devices"
        :key="i"
        :style="device_styles(device)"
        @mousedown="device_mousedown(i)"
        @mouseup="device_mouseup()" >
        <LightbulbIcon />
      </div>

    </div>

  </div>
</template>

<script>

import LightbulbIcon from 'vue-material-design-icons/Lightbulb.vue'

export default {
  name: 'DragDropTest',
  components: {
    LightbulbIcon
  },
  data () {
    return {

      dragged_device_index: -1,
      edit_mode: true,

      devices: [
        {
          position: { x: 50, y: 50 }
        }
      ]

    }
  },
  mounted () {

  },
  methods: {
    device_styles (device) {
      const { x, y } = device.position
      const dragged_device = this.devices[this.dragged_device_index]
      return {
        top: `${y}%`,
        left: `${x}%`,
        cursor: device === dragged_device ? 'grabbing' : 'grab'
      }
    },
    wrapper_mousedown () {
    },
    wrapper_mouseup () {
      if (this.dragged_device_index > -1) {
        // console.log(`Releasing ${this.dragged_device_index}`)
        this.dragged_device_index = -1
      }
    },
    wrapper_mousemove (event) {
      if (this.dragged_device_index < 0) return
      const dragged_device = this.devices[this.dragged_device_index]
      const { x: dragX, y: dragY } = event

      // corner: 377, 88

      const {
        x: wrapperX,
        y: wrapperY,
        width: floorplanWidth,
        height: floorplanHeight
      } = this.$refs.floorplan.getBoundingClientRect()

      // No idea why needs to be divided by 2
      dragged_device.position = {
        x: Math.round(100 * (dragX - wrapperX) / floorplanWidth),
        y: Math.round(100 * (dragY - wrapperY) / floorplanHeight)
      }
    },
    device_mousedown (device_index) {
      this.dragged_device_index = device_index
      // console.log(`Draggind ${this.dragged_device_index}`)
    },
    device_mouseup () {
      // console.log("device_mouseup")

    }

  }

}
</script>

<style scoped>

.outer_wrapper {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  outline: 2px solid blue;
}

.inner_wrapper {
  margin: 2em;
  position: relative;
  outline: 1px solid red;
}

.floorplan {
  height: 80vh;
  user-select: none;
}

.device_wrapper {
  position: absolute;
  outline: 1px solid red;
  font-size: 200%;
  transform: translate(-50%, -50%);
  user-select: none;
}

.new_devices_wrapper {
  position: absolute;
  left: 0;
  top: 0;
  outline: 1px solid green;
  display: flex;
}

.new_device_wrapper {
  font-size: 200%;
}

</style>
