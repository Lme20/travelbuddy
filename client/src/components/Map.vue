<template>
  <b-row>
      <GmapMap v-if="center" :center='center' :zoom='10' style='width:100%; height:700px;' @click="mapClicked">
        <!-- Marker -->
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :icon="customMarker"
          @click="deleteMarker(index)"
        />
        <GmapAutocomplete
          @place_changed = 'setPlace'
        />
        <!-- Path -->
        <GmapPolyline
          :path="pathCoordinates"
          :options="{ strokeColor: '#f87425', strokeOpacity: 0, strokeWeight: 3, icons: dottedLineIcons }"
        />
      </GmapMap>
  </b-row>
</template>

<script>
/* global google */
import { Map as GmapMap, Marker as GmapMarker, Polyline as GmapPolyline } from 'vue2-google-maps'
import { EventBus } from '@/EventBus'
// import { BButton } from 'bootstrap-vue'

export default {
  components: { GmapMap, GmapMarker, GmapPolyline },
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
      pathCoordinates: [],

      // Marker styling
      customMarker: {
        url: require('@/assets/marker_icon.png'),
        scale: 3
      },

      // Path styling
      dottedLineIcons: [
        {
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 0.8,
            scale: 4
          },
          offset: '0',
          repeat: '30px' // Distance between each dot
        }
      ]
    }
  },
  mounted() {
    this.geolocate()
    this.customMarker.scaledSize = new google.maps.Size(20, 32)
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place
    },
    addMarker() {
      if (this.currentPlace && this.currentPlace.geometry) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          name: this.currentPlace.formatted_address
        }
        this.markers.push({ position: marker })
        EventBus.$emit('new-location', marker) // Emitting the event
        this.center = marker
        this.currentPlace = null
        this.pathCoordinates.push(marker)
      }
    },
    deleteMarker(index) {
      this.markers.splice(index, 1)
      this.pathCoordinates.splice(index, 1)
    },
    mapClicked(event) {
      const clickedPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
      this.markers.push({ position: clickedPosition })
      this.pathCoordinates.push(clickedPosition)
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
