<template>
  <b-row>
      <GmapMap ref="gmap" v-if="center" :center='center' :zoom='10' style='width:100%; height:91vh;' >
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
import mapTheme from '@/assets/map-styling.json'

import { Map as GmapMap, Polyline as GmapPolyline } from 'vue2-google-maps'
import { Api } from '@/Api'
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
      currentInfoWindow: null,
      mapTheme
    }
  },
  props: ['userLocation'],
  watch: {
  },
  mounted() {
    this.$refs.gmap.$mapPromise.then((map) => {
      map.setOptions({ styles: this.mapTheme })
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
        } else {
          console.error(`Error occurred: ${status}`)
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
        // Set the zoom level to 2 after placing markers
        this.googleMapInstance.setZoom(13)
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
      const contentString =
      `<h4>${result.name}</h4>
        <p>${result.vicinity}</p>
        <p>${result.description}</p>
        <a href="${result.website}" target="_blank">Visit Website</a>
        <b-button id="add-location-button" class="location-btn" >Add Location</b-button>`

      // Set content and open new window
      this.currentInfoWindow.setContent(contentString)
      this.currentInfoWindow.open(this.googleMapInstance, marker)

      // DOM listener for InfoWindow
      google.maps.event.addListenerOnce(this.currentInfoWindow, 'domready', () => {
        const button = document.getElementById('add-location-button')
        button.addEventListener('click', () => {
          this.handleAddLocationButtonClick(result)
        })
      })
    },
    updateLocation(newLocation) {
      console.log('Received newLocation:', newLocation) // Debug
      this.center = newLocation // { lat: ..., lng: ... }
      this.radius = 2000
      this.fetchMarkers()
      this.drawRadiusCircle() // Update drawRadiusCircle when location changed
      console.log('newLocation and marker fecthed:', newLocation, this.fetchMarkers) // Debug
    },
    async handleAddLocationButtonClick(result) {
      console.log('Add Location button clicked!', result)

      try {
        // Prepare the data to send
        const locationData = {
          placeId: result.place_id,
          placeName: result.name,
          placeType: result.types,
          placeCoordinates: {
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng()
          },
          address: result.vicinity,
          isVisited: false,
          isOnBucketlist: false
        }

        // Make the API call
        const response = await Api.post('/locations', locationData)

        // Check if the response is successful
        if (response.status === 201) {
          console.log('Location added successfully:', response.data)
          alert('Location added successfully')
        }
      } catch (error) {
        console.error('Error while adding location:', error)
        alert('Failed to add location')
      }
    },
    drawRadiusCircle() {
      if (this.radiusCircle) {
        this.radiusCircle.setMap(null) // Remove old circle
      }
      // Circle radius specifics
      this.radiusCircle = new google.maps.Circle({
        strokeColor: '#ca65c8',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#e070de',
        fillOpacity: 0.1,
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
