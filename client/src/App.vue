<template>
  <div id="app">
    <div id="nav">
      <b-navbar variant="faded" type="light">
        <b-button v-b-toggle.sidebar-left>Menu</b-button>
        <b-navbar-brand href="/"> Travelbuddy </b-navbar-brand>
      </b-navbar>
    </div>
    <left-sidebar/>
    <router-view/>
  </div>
</template>

<script>
import LeftSidebar from './components/LeftSidebar.vue'

export default {
  components: {
    'left-sidebar': LeftSidebar
  }
}
</script>
