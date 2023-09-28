<template>
  <b-container fluid class="map-wrapper">
    <b-row>
      <b-col md="10" class="map-container">
        <GmapMap :center='center' :zoom='10' style='width:100%; height: 600px;'>
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
          />
        </GmapMap>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Map as GmapMap, Marker as GmapMarker } from 'vue2-google-maps'
// import { BButton } from 'bootstrap-vue'

export default {
  components: { GmapMap, GmapMarker },
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: []
    }
  },
  mounted() {
    this.geolocate()
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
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
  .map-wrapper {
    height: 100vh;
    width: 100%;
  }
  .map-container {
    height: 100vh;
    width: 100%;
  }
</style>
