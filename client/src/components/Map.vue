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
      radius: 2000, // Radius in meters
      googleMapInstance: null,
      markers: [],
      radiusCircle: null,
      currentInfoWindow: null
    }
  },
  props: ['userLocation'],
  watch: {
  },
  mounted() {
    this.$refs.gmap.$mapPromise.then((map) => {
      this.googleMapInstance = map
      this.drawRadiusCircle() // Initialize circle
      google.maps.event.addListener(map, 'idle', () => {
        this.googleMapInstance = this.$refs.gmap.$mapObject
        this.currentInfoWindow = new google.maps.InfoWindow()
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
        type: ['lodging', 'atm', 'casino', 'night_club', 'bar', 'tourist_attraction', 'amusement_park', 'restaurant', 'park', 'museum']
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

          // console.log('Marker Icon:', markerIcon) // Debug

          // LANDMARK CATEGORY
          if (result.types.includes('landmark') || result.types.includes('tourist_attraction') || (result.types.includes('park'))) {
            markerIcon = landmarkMarker
            // FACILITY CATEGORY
          } else if (result.types.includes('lodging') || result.types.includes('atm') || result.types.includes('restaurant')) {
            markerIcon = facilityMarker
            // ENTERTAINMENT CATEGORY
          } else if (result.types.includes('casino') || result.types.includes('night_club') || result.types.includes('bar')) {
            markerIcon = entertainmentMarker
            // ATTRACTION CATEGORY
          } else if (result.types.includes('museum') || result.types.includes('art_gallery') || result.types.includes('amusement_park')) {
            markerIcon = attractionMarker
          }
          // Create a marker only if it's not a default marker
          if (markerIcon !== defaultMarker) {
            const marker = new google.maps.Marker({
              position: result.geometry.location,
              map: this.googleMapInstance,
              icon: {
                url: markerIcon,
                scaledSize: new google.maps.Size(30, 45) // size to 30x45 pixels
              }
            })
            // Click event listener to the marker
            google.maps.event.addListener(marker, 'click', () => {
              this.openInfoWindow(result, marker)
            })
            // console.log('Marker:', marker) // Debug
            this.markers.push(marker) // Push to Array
            console.log('Marker placed at: ', result.geometry.location) // Debug
          }
        })
      } catch (error) {
        console.error('Error in placeMarkers:', error)
      }
    },
    openInfoWindow(result, marker) {
    // Close previously opened window if it exists
      if (this.currentInfoWindow) {
        this.currentInfoWindow.close()
      }
      // Create a new InfoWindow
      this.currentInfoWindow = new google.maps.InfoWindow()

      // Set content and open new window
      this.currentInfoWindow.setContent(`<h4>${result.name}</h4><p>${result.vicinity}</p><p>${result.description}</p><a href="${result.website}" target="_blank">Visit Website</a>`)
      this.currentInfoWindow.open(this.googleMapInstance, marker)
    },
    updateLocation(newLocation) {
      console.log('Received newLocation:', newLocation) // Debug
      this.center = newLocation // { lat: ..., lng: ... }
      this.radius = 2000 // 50 km in meters
      this.fetchMarkers()
      this.drawRadiusCircle() // Update drawRadiusCircle when location changed
      console.log('newLocation and marker fecthed:', newLocation, this.fetchMarkers) // Debug
    },
    drawRadiusCircle() {
      if (this.radiusCircle) {
        this.radiusCircle.setMap(null) // Remove old circle
      }
      // Circle radius specifics
      this.radiusCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        map: this.googleMapInstance,
        center: this.center,
        radius: this.radius,
        draggable: true
      })
      // Listen to drag event
      this.radiusCircle.addListener('dragend', (event) => {
        const newCenter = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        }
        this.updateLocation(newCenter) // Update location and markers
      })
    }
  }
}
</script>

<style scoped>

</style>
