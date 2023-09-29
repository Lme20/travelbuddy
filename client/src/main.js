import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeoLocation from 'vue-browser-geolocation'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Importing bootstrap Vue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Use only for debugging purposes
// console.log('API KEY:', process.env.VUE_APP_GOOGLE_MAPS_API_KEY)

// Importing Google Maps API
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places,drawing,visualization' // Google libraries
  },
  installComponents: true
})

// Importing geolocation
Vue.use(VueGeoLocation)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
