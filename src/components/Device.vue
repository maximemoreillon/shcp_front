<template>
  <div class="device_wrapper">

    <!-- binding ID necessary to find the element from drag events -->
    <DeviceIcon
      v-bind:id="device._id"
      v-bind:device="device"
      v-bind:icon_class="icon_class"
      v-on:icon_clicked="icon_clicked()"
      v-on:icon_right_clicked="icon_right_clicked()">
      {{icon_additional_content}}
    </DeviceIcon>

    <!-- form to edit the device -->
    <!-- Currently placed inside a modal -->
    <!-- Could be a dedicated page -->
    <Modal
      v-bind:open="edit_modal_open"
      v-on:close_modal="close_edit_modal()">

      <table class="device_properties_table">
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

      <!-- save and delete buttons -->
      <div class="buttons_container">

        <span
          class="mdi mdi-content-save"
          v-on:click="edit_device_in_back_end()"/>

        <span
          class="mdi mdi-delete"
          v-on:click="delete_device_in_back_end()"/>

      </div>

    </Modal>

    <!-- Slot in case the device requiries it, for example for modals -->
    <slot/>

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
      default(){ return [] },
    },
    icon_class: {
      type: [Array, String],
      default: "mdi-help"
    },
    icon_additional_content: {
      type: String
    }
  },
  data() {
    return {
      device_copy: {},
      edit_modal_open: false,
    }
  },

  methods: {
    icon_clicked(){
      if(this.$store.state.edit_mode){
        // Make a copy of the device for editing
        // THIS COULD BE ACHIEVED UISNG KEY MAYBE
        this.device_copy = JSON.parse(JSON.stringify(this.device));
        this.open_edit_modal();

        // The router alternative
        //this.$router.push({ name: 'device_details', query: { id: this.device._id } })

      }
      else this.$emit('icon_clicked');
    },
    icon_right_clicked(){
      this.$store.commit('toggle_edit_mode')
    },
    open_edit_modal(){
      this.edit_modal_open = true;
    },
    close_edit_modal(){
      this.edit_modal_open = false;
    },
    get_properties_for_db(){
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
    edit_device_in_back_end() {
      console.log("[WS] edit_one_device_in_back_end");
      var properties = this.get_properties_for_db(this.device_copy);
      //console.log(properties)
      this.$socket.client.emit('edit_one_device_in_back_end', properties);
      this.close_edit_modal();
    },
    delete_device_in_back_end() {
      console.log("[WS] delete_one_device_in_back_end");
      var properties = this.get_properties_for_db(this.device_copy);
      this.$socket.client.emit('delete_one_device_in_back_end', properties);
      this.close_edit_modal();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* properties table */

.device_properties_table{
  margin: 15px;
  width: 60vw;
  border-collapse: collapse;
}

.device_properties_table td {
  padding: 5px;
}

.device_properties_table tr:not(:last-child) {

}

.device_properties_table input[type="text"]{
  border: none;
  border-bottom: 1px solid #444444;
  outline: none;
  padding: 5px;
  width: 100%;
}

.device_properties_table input[type="text"]:focus{
  border-color: #c00000;
}

/* Buttons */
.buttons_container{

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
