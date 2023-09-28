<template>
  <div class="home-container">
    <h2>MAP VERY WIP</h2>
    <b-container fluid>
      <b-row class="h-100">
        <b-col lg="12" md="12" sm="12" class="h-100">
          <GoogleMap />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import GoogleMap from '@/components/Map.vue'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  },
  components: {
    GoogleMap
  }
}
</script>

<style scoped>
.home-container {
  height: 100vh;
  width: 100%;
}
</style>
