<template>
  <div id="app">
    <div id="nav">
      <div>
        <b-navbar variant="faded" type="light">
          <b-button v-b-toggle.sidebar-left>Menu</b-button>
          <b-navbar-brand href="/"> Travelbuddy </b-navbar-brand>
        </b-navbar>
      </div>
    </div>
    <!-- Render the content of the current page view -->
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
