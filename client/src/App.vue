<template>
  <div id="app">
    <!-- Navbar -->
    <b-navbar class="app-header">
      <b-button class="menu-button" v-b-toggle.sidebar-left>Menu</b-button>
      <b-navbar-brand class="ml-3" href="/">
        <img src="@/assets/TB_logo.png" alt="Travelbuddy" class="navbar-logo" height="75" />
      </b-navbar-brand>
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
  color: rgb(255, 255, 255);
  border-bottom: 2px solid hsla(0, 0%, 100%, 0.1);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  position: absolute;
}

.menu-button {
  margin-right: 20px; /* Space between Menu button and Travelbuddy */
}

.ml-3 {
  margin-left: 20px; /* Distance from Menu button */
}

.app-footer {
  background-color: #021c51;
  color: white;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.navbar-logo {
  height: auto; /* Maintain aspect ratio */
  width: auto; /* Maintain aspect ratio */
  max-height: 80px;
  max-width: 300px;
  padding: 5px 10px; /* Padding around logo */
  vertical-align: middle; /* Align it vertically */
}

#main-content {
  margin-bottom: 50px; /* Space for the footer */
}
</style>
