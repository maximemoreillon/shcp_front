<template>
  <div class="login_view">

    <div class="status_message" v-if="$store.state.authenticating">
      <div class="loader"/>
    </div>

    <form
      class="login_form"
      v-else-if="!$store.state.user"
      v-on:submit.prevent="login()">

      <input type="text" v-model="credentials.username" placeholder="username">
      <input type="password" v-model="credentials.password" placeholder="password">
      <input type="submit" value="login">
      
    </form>

    <form
      class="login_form"
      v-else
      v-on:submit.prevent="logout()">

      <div class="">
        Logged in as: {{$store.state.user.name_kanji}}
      </div>

      <input type="submit" value="logout">

    </form>

    <!-- overlay to show connection problems -->

  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {

  },
  data(){
    return {
      credentials: {
        username: "",
        password: "",
      }
    }
  },
  mounted(){
  },
  methods: {
    login(){
      console.log("logging in")
      this.$socket.client.emit('authentication', {
        credentials: {
          username: this.credentials.username,
          password: this.credentials.password,
        }
      } )
    },
    logout(){
      this.$socket.client.emit('logout', {})
    },
  }
}
</script>

<style scoped>

form {
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
form > * {
  margin: 20px;
  padding: 5px;
  width: 50vw;
  max-width: 300px;
  height: 40px;
  /* layout of content */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
input[type="text"], input[type="password"]{
  outline: none;
  border: none;
  color: #444444;
  border-bottom: 2px solid #666666;
  transition: border-color 0.25s;
}
input[type="text"]:focus, input[type="password"]:focus{
  border-bottom: 2px solid #c00000;
}
input[type="submit"]{
  border: 2px solid #666666;
  color: #444444;
  background-color: white;
  cursor: pointer;
  transition:
    border-color 0.25s,
    background-color 0.25s,
    color 0.25s;
}
input[type="submit"]:hover{
  border-color: #c00000;
  color: #c00000;
}
input[type="submit"]:active{
  background-color: #c00000;
  color: white;
}
.status_message {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 25px;
  font-size: 120%;
}
</style>
