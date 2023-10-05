<template>
  <b-row>
      <GmapMap ref="gmap" v-if="center" :center='center' :zoom='10' style='width:100%; height:600px;' >
        <GmapAutocomplete />
        <!-- Path -->
        <GmapPolyline :options="{ strokeColor: '#f87425', strokeOpacity: 0, strokeWeight: 3 }"/>
      </GmapMap>
  </b-row>
</template>

<script>
/* global google */
import landmarkMarker from '@/assets/landmarkMarker.png'
import facilityMarker from '@/assets/facilityMarker.png'
import entertainmentMarker from '@/assets/entertainmentMarker.png'
import defaultMarker from '@/assets/default-marker.png'
import attractionMarker from '@/assets/attractionMarker.png'

import { Map as GmapMap, Polyline as GmapPolyline } from 'vue2-google-maps'
// import { EventBus } from '@/EventBus'

export default {
  components: { GmapMap, GmapPolyline },
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 57.7089, lng: 11.9746 }, // Latitude and Longitude object
      radius: 50000, // Radius in meters
      googleMapInstance: null,
      markers: []
    }
  },
  props: ['userLocation'],
  watch: {

  },
  mounted() {
    this.$refs.gmap.$mapPromise.then((map) => {
      this.googleMapInstance = map
      google.maps.event.addListener(map, 'idle', () => {
        this.googleMapInstance = this.$refs.gmap.$mapObject
      })
    })
  },
  methods: {
    fetchMarkers() {
      console.log('Entering fetchMarkers')

      if (!this.center || !this.radius) return // Changed this.userLocation to this.center

      const service = new google.maps.places.PlacesService(this.googleMapInstance)

      if (!this.googleMapInstance) {
        console.error('Google Map instance not initialized')
        return
      }

      const request = {
        location: new google.maps.LatLng(this.center.lat, this.center.lng), // Explicitly make it LatLng
        radius: this.radius,
        type: ['church', 'city_hall', 'hindu_temple', 'mosque', 'airport', 'bus_station',
          'taxi_stand', 'lodging', 'shopping_mall', 'store', 'supermarket', 'parking', 'ATM',
          'movie_theater', 'casino', 'night_club', 'bar', 'aquarium', 'art_gallery', 'zoo',
          'tourist_attraction', 'amusement_park', 'restaurant', 'park', 'museum']
      }

      console.log('Radius:', this.radius) // Debug
      console.log('Center:', this.center) // Debug

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.placeMarkers(results)
        }
      })
    },
    placeMarkers(results) {
      try {
        console.log('Results: ', results) // Debug
        // Clear existing markers
        this.markers.forEach(marker => marker.setMap(null))
        this.markers = []

        results.forEach((result) => {
          let markerIcon = defaultMarker

          console.log('Marker Icon:', markerIcon) // Debug

          // LANDMARK CATEGORY
          if (result.types.includes('church') || result.types.includes('city_hall') || result.types.includes('hindu_temple') ||
                  result.types.includes('mosque')) {
            markerIcon = landmarkMarker
            // FACILITY CATEGORY
          } else if (result.types.includes('airport') || result.types.includes('bus_station') || result.types.includes('taxi_stand') ||
                result.types.includes('lodging') || result.types.includes('shopping_mall') || result.types.includes('store') ||
                result.types.includes('supermarket') || result.types.includes('parking') || result.types.includes('ATM') || result.types.includes('restaurant')) {
            markerIcon = facilityMarker
            // ENTERTAINMENT CATEGORY
          } else if (result.types.includes('movie_theater') || result.types.includes('casino') || result.types.includes('night_club') ||
                  result.types.includes('bar')) {
            markerIcon = entertainmentMarker
            // ATTRACTION CATEGORY
          } else if (result.types.includes('park') || result.types.includes('aquarium') || result.types.includes('art_gallery') || result.types.includes('museum') ||
                  result.types.includes('zoo') || result.types.includes('tourist_attraction') || result.types.includes('amusement_park')) {
            markerIcon = attractionMarker
          }
          const marker = new google.maps.Marker({
            position: result.geometry.location,
            map: this.googleMapInstance,
            icon: {
              url: markerIcon,
              scaledSize: new google.maps.Size(30, 45) // size to 25x25 pixels
            }
          })
          console.log('Marker:', marker)
          this.markers.push(marker) // Push to Array
          console.log('Marker placed at: ', result.geometry.location) // Debug
        })
      } catch (error) {
        console.error('Error in placeMarkers:', error)
      }
    },
    updateLocation(newLocation) {
      console.log('Received newLocation:', newLocation)
      this.center = newLocation // { lat: ..., lng: ... }
      this.radius = 50000 // 50 km in meters
      this.fetchMarkers()
      console.log('newLocation and marker fecthed:', newLocation, this.fetchMarkers)
    }
  }
}
</script>

<style scoped>

</style>
