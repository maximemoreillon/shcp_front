<template>
  <div class="device_wrapper">
    <!-- binding ID necessary to find the element from drag events -->

    <DeviceIcon
      :id="device._id"
      :device="device"
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
    <Modal :open="edit_modal_open" @close_modal="edit_modal_open = false">
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
import Modal from "@/components/Modal.vue";
import DeviceIcon from "@/components/DeviceIcon.vue";

import ContentSaveIcon from "vue-material-design-icons/ContentSave.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";

export default {
  name: "Device",
  mixins: [],
  components: {
    Modal,
    DeviceIcon,
    DeleteIcon,
    ContentSaveIcon,
  },
  props: {
    device: {
      type: Object,
      required: true,
    },
    form_fields: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      edit_modal_open: false,
    };
  },

  methods: {
    icon_clicked() {
      if (this.$store.state.edit_mode) this.edit_modal_open = true;
      else this.$emit("icon_clicked");
    },
    icon_right_clicked() {
      this.$store.commit("toggle_edit_mode");
    },

    // Connection with back end
    async edit_device_in_back_end() {
      try {
        const { _id, ...properties } = this.device;
        const url = `/devices/${_id}`;
        await this.axios.patch(url, properties);
        this.edit_modal_open = false;
      } catch (error) {
        console.error(error);
        alert("Failed to update device");
      }
    },

    async delete_device_in_back_end() {
      if (!confirm("Really?")) return;
      try {
        const { _id } = this.device;
        const url = `/devices/${_id}`;
        await this.axios.delete(url);
        this.edit_modal_open = false;
      } catch (error) {
        console.error(error);
        alert("Failed to delete device");
      }
    },
  },
};
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
