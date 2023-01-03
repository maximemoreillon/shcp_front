<template>
  <div
    class="disconnection_warning"
    v-if="enabled"
    v-bind:class="{open: !$store.state.connected}">

    <alert-outline-icon class="warning_icon"/>
    <span class="warning_text">DISCONNECTED</span>

  </div>
</template>

<script>
import AlertOutlineIcon from 'vue-material-design-icons/AlertOutline.vue'

export default {
  name: 'DisconnectionWarning',
  components: {
    AlertOutlineIcon
  },
  data () {
    return {
      enabled: false
    }
  },
  mounted () {
    setTimeout(() => { this.enabled = true }, 1000)
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.disconnection_warning{
  /* poisitioning and sizing of background*/
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;

  /* positioning of content */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #444444; /* fallback for ie */
  background-color: #444444cc;

  /* color of all text content */
  color: white;

  /* values which change when opening the modal */
  /* here are the defaults */
  visibility: hidden;
  opacity: 0;
  transition:
    visibility 0.5s,
    opacity 0.5s;
}

.disconnection_warning.open{
  visibility: visible;
  opacity: 1;
  /* Delay when OPENING */
  transition-delay: 0s;
}
.disconnection_warning{
  /* delay when CLOSING */
  transition-delay: 0.25s;
}

.disconnection_warning > * {
  animation-name: blinking;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.warning_icon {
  font-size: 40vmin;
}

.warning_text {
  font-size: 5vmin;
}

@keyframes blinking {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

</style>
