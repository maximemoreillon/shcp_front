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
    devices: [],
  },
  mutations: {

    set_user(state,user){
      state.user = user
    },

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

    toggle_edit_mode(state){
      state.edit_mode = !state.edit_mode ;
    },

    // Devices loading
    set_devices_loading(state,new_state){
      state.devices_loading = new_state;
    },

    // Devices management
    add_or_update_some_devices(state, devices_to_update){
      // Update a device in the vue component data or create it if it does not exist already
      devices_to_update.forEach(device_to_update => {

        // Find Matching device
        var deviceIndex = state.devices.findIndex(element => element._id === device_to_update._id);

        // Update if found
        // Warning: Use Vue.set for reactivity
        if(deviceIndex !== -1) Vue.set(state.devices, deviceIndex, device_to_update)

        // create otherwise
        else state.devices.push(device_to_update);
      })
    },

    delete_device(state, device_to_delete){
      // devices_to_delete is an Array
      // Find the device
      const device_index = state.devices.findIndex(element => element._id === device_to_delete._id)

      // if found, delete it
      if(device_index !== -1) state.devices.splice(device_index,1)
    },
    delete_all_devices(state) {
      state.devices.splice(0,state.devices.length);
    },


  },
  actions: {
    // Actions are just functions that dispatch mutations.

  }
})
