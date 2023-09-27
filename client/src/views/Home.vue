<template>
  <div>
    <h2>MAP VERY WIP</h2>
      <create-new/>
      <GoogleMap />
  </div>
</template>

<script>
import { Api } from '@/Api'
import SidebarCreate from '@/components/SidebarCreate.vue'
import GoogleMap from '@/components/Map.vue'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  },
  components: {
    'create-new': SidebarCreate,
    GoogleMap
  }
}
</script>
