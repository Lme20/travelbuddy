<template>
    <b-row>
        <GmapMap :center='center' :zoom='10' style='width:100%; height:700px;'>
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
          />
          <GmapAutocomplete
            @place_changed = 'setPlace'
          />
        </GmapMap>
    </b-row>
</template>

<script>
import { Map as GmapMap, Marker as GmapMarker } from 'vue2-google-maps'
import { EventBus } from '@/EventBus'
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
          lng: this.currentPlace.geometry.location.lng(),
          name: this.currentPlace.formatted_address
        }
        this.markers.push({ position: marker })
        EventBus.$emit('new-location', marker) // Emitting the event
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

</style>
