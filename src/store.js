import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    // user management
    user: null,
    authenticating: false,

    // connection status
    connected: false,

    edit_mode: false,

    // devices management
    devices_loading: false,
    devices: []
  },
  mutations: {

    // Manage connection status
    set_connected(state, new_state){
      state.connected = new_state;
    },

    // Authentication
    set_authenticating(state, new_state){
      state.authenticating = new_state;
    },

    // Edit mode
    set_edit_mode(state,new_state){
      state.edit_mode = new_state;
    },

    // Devices management
    add_or_update_some_devices(state, devices_to_update){
      // Update a device in the vue component data or create it if it does not exist already
      devices_to_update.forEach(device_to_update => {

        // Find Matching device
        var device = state.devices.find(element => element._id === device_to_update._id);

        // Updat if found
        if(device) Object.assign(device, device_to_update);

        // create otherwise
        else state.devices.push(device_to_update);
      })
    },

    delete_some_devices(state, devices_to_delete){
      // devices_to_delete is an Array
      devices_to_delete.forEach(device_to_delete => {

        // Find the device
        var device_index = state.devices.findIndex(element => element._id === device_to_delete._id);

        // if found, delete it
        if(device_index !== -1) state.devices.splice(device_index,1);
      })
    },
    delete_all_devices(state) {
      state.devices.splice(0,state.devices.length);
    },


  },
  actions: {
    // Actions are just functions that dispatch mutations.

  }
})
