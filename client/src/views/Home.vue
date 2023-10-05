<template>
  <div class="home-container">
    <b-container fluid>
      <!-- Input and Button for Location -->
        <b-form @submit.prevent="addLocation">
          <b-form-group
            label="Enter your destination"
            description="placeholder text"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
            >
            <b-input v-model="userLocation" placeholder="Where are you going?"></b-input>
          </b-form-group>
          <b-button type="submit">Confirm Location</b-button>
        </b-form>
      <b-row class="h-100">
        <b-col lg="12" md="12" sm="12" class="h-100">
          <!-- Create request -->
          <create-new />
          <!-- Google map -->
        <GoogleMap ref="googleMapRef" :userLocation="userLocation"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import GoogleMap from '@/components/Map.vue'
import axios from 'axios'
import SidebarCreate from '@/components/SidebarCreate.vue'

export default {
  name: 'home',
  data() {
    return {
      userLocation: null,
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
    },
    async addLocation() {
      const apiKey = process.env.VUE_APP_GOOGLE_MAPS_API_KEY
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.userLocation}&key=${apiKey}`
      console.log('url', url) // Debug

      try {
        const response = await axios.get(url)
        console.log('API Response:', response.data) // Debug
        if (response.data.results && response.data.results.length > 0) {
          const location = {
            lat: response.data.results[0].geometry.location.lat,
            lng: response.data.results[0].geometry.location.lng
          }
          console.log('Geocoded location: ', location) // Debug
          this.$refs.googleMapRef.updateLocation(location)
        } else {
          console.error('No results found for the location.')
        }
      } catch (error) {
        console.error('Geocoding Error:', error)
      }
    }
  },
  components: {
    'create-new': SidebarCreate,
    GoogleMap
  }
}
</script>

<style scoped>
.home-container {
  height: 700px;
  width: 100%;
}

</style>
