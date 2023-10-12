<template>
  <div>
    <h1>All Locations</h1>
    <div v-for="location in locations" :key="location._id">
      <b-card :title="location.address" :img-src="imageUrls[location._id]" img-alt="Image" img-top>
        <b-card-text>
          {{ location.placeCoordinates.lat }}, {{ location.placeCoordinates.lng }}
        </b-card-text>
      </b-card>
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
      imageUrls: {}
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id // Get the id from the route parameter
      const response = await Api.get(`/locations/${id}`)
      this.locations = [response.data.location] // Make it an array for consistency
      console.log('location response:', response.data) // Debug

      // Fetch images for the location
      const cityName = this.locations[0].address.split(',').pop().trim() // Extract city name from address
      const imageUrl = await this.fetchUnsplashImage(cityName) // Use city name for image fetching
      this.$set(this.imageUrls, this.locations[0]._id, imageUrl)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async fetchUnsplashImage(locationName) {
      try {
        const apiKey = process.env.VUE_APP_UNSPLASH_ACCESS_KEY // Access the API key from .env
        const response = await axios.get(`https://api.unsplash.com/search/photos?query=${locationName}&client_id=${apiKey}`)
        if (response.data.results.length > 0) {
          return response.data.results[0].urls.small
        }
        return null
      } catch (error) {
        console.error('Error fetching Unsplash image:', error)
        return null
      }
    }
  }
}
</script>

<style>
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
</style>
