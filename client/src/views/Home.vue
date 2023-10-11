<template>
  <div class="home-container" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="hero-section">
      <h1>EXPLORE THE WORLD</h1>
      <b-button @click="scrollToMap" class="button-style" >Find my destination</b-button>
    </div>
    <b-container fluid>
      <!-- Input and Button for Location -->
        <b-form @submit.prevent="addLocation">
          <b-form-group
            label="Enter your destination"
            description="placeholder text"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7">
            <div class="d-flex align-items-center">
              <!-- Create location request -->
              <b-input v-model="userLocation" placeholder="Where are you going?" size="sm" class="search-box"></b-input>
              <b-button type="submit">Confirm Location</b-button>
              <!-- Create journal request -->
              <b-button @click="contentToDisplay = 1">Create Journal</b-button>
              <!-- Create checklist request -->
              <b-button @click="contentToDisplay = 2">Create Checklist</b-button>
            </div>
          </b-form-group>
        </b-form>
      <b-row class="h-100">
        <b-col lg="12" md="12" sm="12" class="h-100">
          <!-- Sidebar -->
          <right-sidebar :contentToDisplay="contentToDisplay" />
          <!-- Google map -->
        <GoogleMap ref="googleMapRef" :userLocation="userLocation" v-if="showMap"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import GoogleMap from '@/components/Map.vue'
import axios from 'axios'
import RightSidebar from '@/components/RightSidebar.vue'

export default {
  name: 'home',
  data() {
    return {
      userLocation: null,
      message: 'none',
      showMap: false,
      backgroundImage: '',
      contentToDisplay: null,
      isButtonActive: false
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
    },
    scrollToMap() {
      this.showMap = true
      this.$nextTick(() => {
        const mapElement = this.$refs.googleMapRef.$el
        mapElement.scrollIntoView({ behavior: 'smooth' })
      })
    },
    async fetchImage() {
      try {
        const response = await this.$unsplashApi.photos.getRandom({ query: 'city, landmark' })
        if (response.type === 'success') {
          this.backgroundImage = response.response.urls.full
        }
      } catch (error) {
        console.error('Unsplash Error:', error)
      }
    }
  },
  // Fetch background image when component is created
  created() {
    this.fetchImage()
  },
  components: {
    'right-sidebar': RightSidebar,
    GoogleMap
  }
}
</script>

<style scoped>
.home-container {
  height: 100vh; /* Making it full height */
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: hsla(0, 0%, 0%, 0.55);
  background-blend-mode: overlay;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
}

.button-style {
  border-color: #e751e4;
  background: #e070de00;
  border-width: 2px;
  font-family: var(--ff-montserrat);
  border-radius: 100px;
  padding: 15px 50px;
  color: var(--white);
  text-transform: uppercase;
}

.button-style:hover {
  background-color: #e751e4;
  border-color: #e751e4;
}
.button-style:active {
  background-color: #e751e4;
  border-color: #e751e4;
}

.hero-section {
  align-items: center;
  text-align: center;
  justify-content: center;
  min-height: 600px;
  padding-top: 350px;
  height: 100vh;
  background-blend-mode: overlay;
  border-bottom: 2px solid hsla(0, 0%, 100%, 0.1);
}

.hero-section h1 {
  font-size: 4em;
  color: rgb(255, 255, 255);
}

.hero-section button {
  margin-top: 60px;
  /* Styling as you wish */
}

.search-box {
  width: 30%;  /* or whatever width you prefer */
}

</style>
