<template>
  <div id="app">
    <div id="nav">
      <div>
        <b-navbar variant="faded" type="light">
          <b-button v-b-toggle.sidebar-left>Menu</b-button>
          <b-navbar-brand href="/"> Travelbuddy </b-navbar-brand>
        </b-navbar>
      </div>

      <!-- <router-link to="/">Home</router-link> |
      <router-link to="journals">Journals</router-link> -->
    </div>
    <!-- Render the content of the current page view -->
    <left-sidebar/>
    <right-sidebar/>
    <router-view/>
  </div>
</template>

<script>
import LeftSidebar from './components/LeftSidebar.vue'
import RightSidebar from './components/RightSidebar.vue'

export default {
  components: {
    'left-sidebar': LeftSidebar,
    'right-sidebar': RightSidebar
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
