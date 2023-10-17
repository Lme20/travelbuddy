<template>
  <div class="home-container" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="hero-section">
      <h1>EXPLORE THE WORLD</h1>
      <b-button v-if="users.length === 0" @click="$bvModal.show('user-modal')" class="b-button">Register to start exploring!</b-button>
      <b-button v-if="users.length > 0" @click="scrollToMap" class="b-button">Find my destination</b-button>
      <!--<user-modal :options="show"/>-->
      <b-modal id="user-modal" v-model="showModal" hide-footer>
        <template #modal-title>
            Create new user
        </template>
        <user-entry @user-added="handleUserAdded"/>
        <b-button class="mt-3" block @click="$bvModal.hide('user-modal')">Close</b-button>
      </b-modal>
    </div>
    <div v-if="showMap">
      <b-container fluid>
        <!-- Input and Button for Location -->
        <b-form @submit.prevent="addLocation" class="location-form">
          <b-form-group description="Type in a city or landmark" label-cols-sm="4" label-cols-lg="3"
            content-cols-sm content-cols-lg="7">
            <!-- Custom label -->
            <template #label>
              <label class="montserrat-bold label-custom">Enter your destination</label>
            </template>
            <!-- location, checklist & journal buttons -->
            <div class="d-flex align-items-center">
              <b-input v-model="userLocation" placeholder="Where are you going?" size="sm" class="search-box montserrat"></b-input>
              <b-button type="submit" variant="primary" class="mr-2">Confirm Location</b-button>
              <!-- Create journal request -->
              <b-button @click="contentToDisplay = 1" variant="primary" class="mr-2">Create Journal</b-button>
              <!-- Create checklist request -->
              <b-button @click="contentToDisplay = 2" variant="primary">Create Checklist</b-button>
            </div>
          </b-form-group>
        </b-form>
        <b-row class="h-100">
          <b-col lg="12" md="12" sm="12" class="h-100">
            <!-- Sidebar -->
            <right-sidebar :contentToDisplay="contentToDisplay" />
            <!-- Google map -->
            <GoogleMap ref="googleMapRef" :userLocation="userLocation"/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import GoogleMap from '@/components/Map.vue'
import axios from 'axios'
import RightSidebar from '@/components/RightSidebar.vue'
import UserEntry from '@/components/UserEntry.vue'

export default {
  name: 'home',
  data() {
    return {
      userLocation: null,
      message: 'none',
      showMap: false,
      showModal: false,
      backgroundImage: '',
      contentToDisplay: 0,
      isButtonActive: false,
      users: []
    }
  },
  // Fetch background image when component is created
  created() {
    this.fetchImage()
  },
  mounted() {
    this.getUsers()
  },
  components: {
    'right-sidebar': RightSidebar,
    'user-entry': UserEntry,
    GoogleMap
  },
  methods: {
    getUsers() {
      Api.get('/users')
        .then(response => {
          this.users = response.data.users
        })
        .catch(error => {
          this.users = []
          console.log(error)
        })
    },
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    handleUserAdded() {
      this.getUsers() // Fetch updated list of users
      this.showModal = false // Close modal
      this.showToast('User created successfully!', 'success')
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

          // Show toast when location is successfully added
          this.showToast('Locations found!', 'success')
        } else {
          console.error('No results found for the location.')

          // Show toast when location isn't found
          this.showToast('No results found for the location.', 'warning')
        }
      } catch (error) {
        console.error('Geocoding Error:', error)

        // Show toast when there's an error adding location
        this.showToast('Error adding location.', 'danger')
      }
    },
    scrollToMap() {
      this.showMap = true
      this.$nextTick(() => {
        const mapElement = this.$refs.googleMapRef.$el
        mapElement.scrollIntoView({ behavior: 'smooth' })
      })
    },
    showToast(message, variant = null) {
      this.$bvToast.toast(message, {
        title: 'Notification',
        variant,
        solid: true,
        toaster: 'b-toaster-bottom-right'
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
  }
}
</script>

<style scoped>

/* CONTAINER STYLING */
.home-container {
  height: 100vh;
  /* Making it full height */
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

/* LINK STYLING */
/* Default link styling */
.b-link {
  color: #596267;
  text-decoration: none;
}

/* Selected link styling */
.selected-link {
  color: #fa70cd;
  font-weight: bold;
  text-decoration: none;
}

/* BUTTON STYLING */
.b-button {
  font-family: 'Montserrat', sans-serif;
  border-color: #fa70cd;
  background: #e070de00;
  border-width: 2px;
  border-radius: 100px;
  padding: 15px 50px;
  color: var(--white);
  text-transform: uppercase;
}

.b-button:hover {
  background-color: #fa70cd;
  border-color: #fa70cd;
}
.b-button:active {
  background-color: #fa70cd;
  border-color: #fa70cd;
}

.b-location {
  border: none;
  background: #596267;
  font-family: var(--ff-montserrat);
  border-radius: 100px;
  padding: 10px 30px;
  color: var(--white);
  margin: 0 10px;
}

.b-location:hover {
  background-color: #fa70cd;
  border-color: #fa70cd;
}

.b-location:active {
  background-color: #fa70cd;
  border-color: #fa70cd;
}

/* HERO STYLING */
.hero-section {
  align-items: center;
  text-align: center;
  justify-content: center;
  min-height: 600px;
  padding-top: 350px;
  height: 100vh;
  background-blend-mode: overlay;
  border-bottom: 4px solid hsla(0, 0%, 100%, 0.1);
}

.hero-section h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 4em;
  color: rgb(255, 255, 255);
}

.hero-section button {
  margin-top: 60px;
}

/* MAP SECTION STYLING */
.search-box {
  width: 30%;
  margin-right: 10px;
}

/* addLocation styling */
.location-form {
  padding: 10px 0;
}

/* custom Label styling */
.label-custom {
  font-size: larger;
  margin-left: 15px;
}

</style>
