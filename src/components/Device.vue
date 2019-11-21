<template>
  <div class="device_wrapper">

  <DeviceIcon
    v-bind:device="device"
    v-bind:icon_class="icon_class"
    v-long-press="300"
    v-on:icon_clicked="icon_clicked()"
    v-on:long-press-start=""/>

    <!-- form to edit the device -->
    <!-- Currently placed inside a modal -->
    <Modal
      v-bind:open="edit_modal_open"
      v-on:close_modal="close_edit_modal"
    >
      <table>
        <tr>
          <td>Type</td>
          <td>TYPE SELECTOR</td>
        </tr>
        <tr v-for="form_field in form_fields">
          <td>{{form_field.label}}</td>
          <td>
            <!-- V-MODEL IS TWO WAY BINDING! -->
            <input
              type="text"
              v-model="device_copy[form_field.key]">
          </td>
        </tr>
      </table>

      <!-- Buttons -->
      <div class="buttons_container">
        <button v-on:click="edit_device_in_back_end">Update device</button>
        <button v-on:click="delete_device_in_back_end">Delete device</button>
      </div>

    </Modal>

    <!-- device specific stuff goes here -->
    <slot></slot>

  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'
import DeviceIcon from '@/components/DeviceIcon.vue'

export default {
  name: 'Device',
  mixins: [],
  components: {
    Modal,
    DeviceIcon
  },
  props: {
    device: {
      type: Object,
      required: true,
    },
    form_fields: {
      type: Array,
      // Array defaults must be returned from a factory function
      default: function(){return []},
    },
    icon_class: {
      type: [Array, String],
      default: "mdi-help"
    },
  },
  data: function () {
    return {
      device_copy: {},
      edit_modal_open: false,
    }
  },

  methods: {
    longPressStart(){
      console.log("start")
      $store.commit('toggle_edit_mode')
    },

    icon_clicked: function(){
      if(this.$store.state.edit_mode){
        // Make a copy of the device for editing
        this.device_copy = JSON.parse(JSON.stringify(this.device));
        this.open_edit_modal();
      }
      else {
        this.$emit('icon_clicked');
      }
    },
    open_edit_modal: function(){
      this.edit_modal_open = true;
    },
    close_edit_modal: function(){
      this.edit_modal_open = false;
    },
    get_properties_for_db: function(){
      // Filter out unwanted properties to send to th DB

      var properties = {};

      // Basic properties
      properties._id = this.device_copy._id;
      properties.type = this.device_copy.type;
      properties.position = this.device_copy.position;

      // Specific device properties, taken from fields
      for(var field_index=0; field_index<this.form_fields.length; field_index++){
        properties[this.form_fields[field_index].key] = this.device_copy[this.form_fields[field_index].key];
      }

      return properties;
    },
    // Connection with back end
    edit_device_in_back_end: function() {
      console.log("[WS] edit_one_device_in_back_end");
      var properties = this.get_properties_for_db(this.device_copy);
      //console.log(properties)
      this.$socket.client.emit('edit_one_device_in_back_end', properties);
      this.close_edit_modal;
    },
    delete_device_in_back_end: function() {
      console.log("[WS] delete_one_device_in_back_end");
      var properties = this.get_properties_for_db(this.device_copy);
      this.$socket.client.emit('delete_one_device_in_back_end', properties);
      this.close_edit_modal;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
