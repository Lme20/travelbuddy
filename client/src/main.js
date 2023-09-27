import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

console.log('API KEY:', process.env.VUE_APP_GOOGLE_MAPS_API_KEY)

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places,drawing,visualization' // Libraries
  },
  installComponents: true
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
