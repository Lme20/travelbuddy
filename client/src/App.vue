<template>
  <div id="app">
    <!-- Header -->
    <b-navbar variant="dark" type="dark" class="app-header">
      <b-button class="menu-button" v-b-toggle.sidebar-left>Menu</b-button>
      <b-navbar-brand class="ml-3" href="/">Travelbuddy</b-navbar-brand>
    </b-navbar>

    <!-- Sidebar -->
    <left-sidebar/>

    <!-- Main Content -->
    <div id="main-content">
      <router-view/>
    </div>

    <!-- Footer -->
    <b-footer class="app-footer">
      <p>&copy; 2023 Travelbuddy</p>
    </b-footer>
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
.app-header {
  background-color: #343a40;
  color: white;
  display: flex;
  align-items: center;
}

.menu-button {
  margin-right: 20px; /* Space between Menu button and Travelbuddy */
}

.ml-3 {
  margin-left: 20px; /* Distance from Menu button */
}

.app-footer {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}

#main-content {
  margin-bottom: 50px; /* Space for the footer */
}
</style>
