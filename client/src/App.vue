<template>
  <div id="app">
    <div id="nav">
      <left-sidebar/>
      <right-sidebar/>
      <router-link to="/">Home</router-link> |
      <router-link to="journals">Journals</router-link> |
      <router-link to="journalEntry">JournalEntry</router-link>
    </div>
    <!-- Render the content of the current page view -->
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
