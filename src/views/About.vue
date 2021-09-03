<template>
  <div>
    <h1>SHCP</h1>
    <p>
      A control panel for smart homes developped and maintained by <a href="https://maximemoreillon.com">Maxime MOREILLON</a>
    </p>



    <h2>Services</h2>
    <table>
      <tr>
        <th>Service</th>
        <th>Version</th>
        <th>URL</th>
      </tr>
      <tr
        v-for="(service, index) in services"
        :key="`service_${index}`">
        <td>{{service.name}}</td>
        <td>{{service.version}}</td>
        <td>{{service.url}}</td>
      </tr>
    </table>



  </div>
</template>

<script>

import pjson from '@/../package.json'
export default {
  name: 'About',
  components: {

  },
  data () {
    return {
      application_count: null,

      services: [
        {
          name: 'SHCP GUI',
          url: window.location.origin,
          version: pjson.version
        },
        {
          name: 'SHCP API',
          url: process.env.VUE_APP_SHCP_API_URL,
          version: null
        },
        {
          name: 'Authentication API',
          url: process.env.VUE_APP_AUTHENTICATION_API_URL,
          version: null
        }
      ],


    }
  },
  mounted () {
    this.get_services_version()
  },
  methods: {

    get_services_version () {
      this.services.forEach((service) => {
        if (service.version) return
        service.version = 'Connecting...'
        this.axios.get(service.url)
          .then(({ data }) => { service.version = data.version })
          .catch(() => { service.version = 'Unable to connect' })
      })
    }
  }

}
</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

}

tr:not(:last-child) {
  border-bottom: 1px solid #dddddd;
}

th {
  text-align: left;
}
td {
  padding: 0.25em;
}

.tech_wrapper {
  margin: 2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.tech {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 10em;
}
.tech img {
  height: 5em;
}

.tech label {
  margin-top: 1em;
}

</style>
