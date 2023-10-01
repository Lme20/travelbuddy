import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeoLocation from 'vue-browser-geolocation'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import icon from '@/assets/TB_icon.png'

// Importing bootstrap Vue
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Use only for debugging purposes
// console.log('API KEY:', process.env.VUE_APP_GOOGLE_MAPS_API_KEY)

document.addEventListener('DOMContentLoaded', function () {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/png' // Change this to match your image type
  link.rel = 'shortcut icon'
  link.href = icon
  document.getElementsByTagName('head')[0].appendChild(link)
})

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
