<template>
  <div class="container">
    <div class="text-center">
        <h1 class="montserrat-bold" >My Locations</h1>
      </div>
    <!-- Conditional rendering: Show cards if no location is selected -->
    <div v-if="!selectedLocation" class="row">
      <div class="col-12 col-md-6 col-lg-3" v-for="(locations, cityName) in groupedLocations" :key="cityName">
        <!-- Added @click event to show the table when the card is clicked -->
        <b-card @click="showTable(cityName)" :title="cityName" :img-src="imageUrls[locations[0]._id]" img-alt="Image" img-top class="custom-card montserrat">
          <b-card-text >
            Discover the hidden gems of {{ cityName }}, your adventure starts here!
          </b-card-text>
        </b-card>
      </div>
    </div>
    <!-- Conditional rendering: Show table if a location is selected -->
    <div v-else>
      <b-iconstack @click="hideTable" font-scale="2.5" style="color: #fa70cd; margin:10px" >
        <b-icon stacked icon="square-fill" style="color: #fa70cd;"></b-icon>
        <b-icon stacked icon="BIconArrowLeft" variant="white" font-scale="5"></b-icon>
      </b-iconstack>
      <table class="locations-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in groupedLocations[selectedLocation]" :key="location._id">
            <td>{{ location.placeName }}</td>
            <td>{{ location.address }}</td>
            <td>
              <span :class="filterTypes(location.placeType).category + '-color'">
                {{ filterTypes(location.placeType).placeType }}
              </span>
            </td>
            <td>
              <b-button @click="deleteLocationId" variant="danger">Delete</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import axios from 'axios'

export default {
  name: 'Locations',
  data() {
    return {
      locations: [],
      imageUrls: {},
      cityNames: {},
      selectedLocation: null,
      groupedLocations: {}
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id // Get the _id from the route parameters

      if (id) {
        // Fetch a specific location by its _id
        const response = await Api.get(`/locations/${id}`)
        this.locations = [response.data] // Set it as an array containing only this location
        console.log('API Response:', response.data) // DEBUG
      } else {
        // Fetch all locations (existing code)
        const response = await Api.get('/locations')
        this.locations = response.data
        console.log('API Response:', response.data) // DEBUG
      }

      // Fetch images for each location
      for (const location of this.locations) {
        const cityName = location.address.split(',').pop().trim() // Extract city name from address
        this.$set(this.cityNames, location._id, cityName)
        console.log('Extracted City Name:', cityName) // Debug
        const imageUrl = await this.fetchUnsplashImage(cityName) // Use city name for image fetching
        this.$set(this.imageUrls, location._id, imageUrl)
      }
    } catch (error) {
      console.error(error)
      this.locations = [] // Set empty array in case of an error
    }
    this.groupLocationsByCity()
  },
  methods: {
    async fetchUnsplashImage(locationName) {
      try {
        const apiKey = process.env.VUE_APP_UNSPLASH_ACCESS_KEY // Access the API key from .env
        const width = 159
        const height = 50
        const orientation = 'landscape'

        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${locationName}&client_id=${apiKey}&orientation=${orientation}&w=${width}&h=${height}`)

        if (response.data.results.length > 0) {
          return response.data.results[0].urls.small
        }
        return null
      } catch (error) {
        console.error('Error fetching Unsplash image:', error)
        return null
      }
    },
    groupLocationsByCity() {
      this.groupedLocations = this.locations.reduce((acc, location) => {
        const cityName = this.cityNames[location._id]
        if (!acc[cityName]) {
          acc[cityName] = []
        }
        acc[cityName].push(location)
        return acc
      }, {})
    },
    filterTypes(locationData) {
      const customMarkers = {
        landmark: ['landmark', 'tourist_attraction', 'park'],
        facility: ['lodging', 'atm', 'restaurant'],
        entertainment: ['casino', 'night_club', 'bar'],
        attraction: ['museum', 'art_gallery', 'amusement_park']
      }

      const foundCategory = Object.keys(customMarkers).find(category => {
        return customMarkers[category].some(type => locationData.includes(type))
      })

      let placeType = null

      switch (foundCategory) {
        case 'landmark':
          placeType = locationData.find(type => ['landmark', 'tourist_attraction', 'park'].includes(type))
          break
        case 'facility':
          placeType = locationData.find(type => ['lodging', 'atm', 'restaurant'].includes(type))
          break
        case 'entertainment':
          placeType = locationData.find(type => ['casino', 'night_club', 'bar'].includes(type))
          break
        case 'attraction':
          placeType = locationData.find(type => ['museum', 'art_gallery', 'amusement_park'].includes(type))
          break
      }

      // Convert the found placeType to Proper Case (first letter uppercase)
      if (placeType) {
        placeType = placeType.charAt(0).toUpperCase() + placeType.slice(1)
      } else {
        placeType = 'Unknown'
      }

      // Return the combined data in the required format
      if (foundCategory) {
        return {
          category: foundCategory,
          placeType
        }
      } else {
        // Return a default object structure when foundCategory is not found
        return {
          category: '',
          placeType
        }
      }
    },
    // Should be working now
    deleteLocationId() {
      const id = this.$route.params.id // Get the _id from the route parameters

      Api.delete(`/locations/${id}`)
        .then(response => {
          console.log('Success:', response.data)
          this.showToast('Location deleted succesfully!', 'success')
        })
        .then(this.getLocations())
        .catch(error => {
          console.error('Failure:', error)
          this.showToast('Failed to delete location', 'danger')
          // Handle the error and display an error message to the user
        })
    },
    showTable(cityName) {
      this.selectedLocation = cityName
    },
    hideTable() {
      this.selectedLocation = null // Reset the selected location
    },
    showToast(message, variant = null) {
      this.$bvToast.toast(message, {
        title: 'Notification',
        variant,
        solid: true,
        toaster: 'b-toaster-bottom-right'
      })
    }
  }
}
</script>

<style>
.container {
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

.custom-card img {
  max-height: 150px;  /* Maximum height for images */
  object-fit: cover; /* Cover entire area */
}

.custom-card {
  height: auto;  /* Make it flexible based on content */
  margin-bottom: 20px;
  margin-top: 20px;
}

.custom-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.locations-table {
  width: 100%;
  border-collapse: collapse;
}

.locations-table th,
.locations-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.close-icon {
  cursor: pointer;
  font-size: 24px;
  color: #333;
  padding: 8px;
}

.landmark-color {
  display: inline-block;
  padding: 4px 8px;
  margin: 2px;
  border-radius: 4px;
  background-color: #febf01;
  color: white;
}

.attraction-color {
  display: inline-block;
  padding: 4px 8px;
  margin: 2px;
  border-radius: 4px;
  background-color: #dc3e2e;
  color: white;
}

.facility-color {
  display: inline-block;
  padding: 4px 8px;
  margin: 2px;
  border-radius: 4px;
  background-color: #018cff;
  color: white;
}

.entertainment-color {
  display: inline-block;
  padding: 4px 8px;
  margin: 2px;
  border-radius: 4px;
  background-color: #a600ce;
  color: white;
}

/* TEXT STYLING ONLY */
.montserrat-bold {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.montserrat {
  font-family: 'Montserrat', sans-serif;
}

</style>
