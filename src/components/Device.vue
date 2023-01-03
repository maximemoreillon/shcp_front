<template>
  <div class="device_wrapper">
    <!-- binding ID necessary to find the element from drag events -->

    <DeviceIcon
      v-bind:id="device._id"
      v-bind:device="device"
      @icon_clicked="icon_clicked()"
      @icon_right_clicked="icon_right_clicked()"
    >
      <template v-slot:icon>
        <slot name="icon" />
      </template>
    </DeviceIcon>

    <!-- form to edit the device -->
    <!-- Currently placed inside a modal -->
    <!-- Could be a dedicated page -->
    <Modal v-bind:open="edit_modal_open" @close_modal="close_edit_modal()">
      <table class="device_properties_table">
        <tr v-for="(form_field, index) in form_fields" :key="`field_${index}`">
          <td>{{ form_field.label }}</td>
          <td>
            <!-- V-MODEL IS TWO WAY BINDING! -->
            <input type="text" v-model="device[form_field.key]" />
          </td>
        </tr>
      </table>

      <!-- save and delete buttons -->
      <div class="buttons_container">
        <content-save-icon class="" @click="edit_device_in_back_end()" />

        <delete-icon class="" @click="delete_device_in_back_end()" />
      </div>
    </Modal>

    <!-- Slot in case the device requires it, for example for sensor modals -->
    <slot />
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import DeviceIcon from '@/components/DeviceIcon.vue'

import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'

export default {
  name: 'Device',
  mixins: [],
  components: {
    Modal,
    DeviceIcon,
    DeleteIcon,
    ContentSaveIcon
  },
  props: {
    device: {
      type: Object,
      required: true
    },
    form_fields: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      edit_modal_open: false
    }
  },

  methods: {
    icon_clicked () {
      if (this.$store.state.edit_mode) this.open_edit_modal()
      else this.$emit('icon_clicked')
    },
    icon_right_clicked () {
      this.$store.commit('toggle_edit_mode')
    },
    open_edit_modal () {
      this.edit_modal_open = true
    },
    close_edit_modal () {
      this.edit_modal_open = false
    },

    // Connection with back end
    edit_device_in_back_end () {
      this.$socket.client.emit('update_device', this.device)
      this.close_edit_modal()

      // Mark device as loading
      this.$set(this.device, 'loading', true)
    },
    delete_device_in_back_end () {
      if (confirm('Really?')) {
        this.$socket.client.emit('delete_device', this.device)
        this.close_edit_modal()

        // Mark device as loading
        this.$set(this.device, 'loading', true)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* properties table */

.device_properties_table {
  margin: 15px;
  width: 60vw;
  border-collapse: collapse;
}

.device_properties_table td {
  padding: 5px;
}

.device_properties_table tr:not(:last-child) {
}

.device_properties_table input[type="text"] {
  border: none;
  border-bottom: 1px solid #444444;
  outline: none;
  padding: 5px;
  width: 100%;
}

.device_properties_table input[type="text"]:focus {
  border-color: #c00000;
}

/* Buttons */
.buttons_container {
  display: flex;
  justify-content: space-around;
}

.buttons_container > span {
  padding: 10px;
  font-size: 200%;
  color: #444444;
  transition: color 0.25s;
  cursor: pointer;
}

.buttons_container > span:hover {
  color: #c00000;
}
</style>
