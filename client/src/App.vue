<template>
  <div id="app">
    <!-- Navbar -->
    <b-navbar class="app-header">
    <!-- Hamburger menu -->
     <div class="hamburger-menu" @click="$root.$emit('bv::toggle::collapse', 'sidebar-left')">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <b-navbar-brand class="ml-3" href="/">
    <!-- navbar logo -->
        <img src="@/assets/TB_logo.png" alt="Travelbuddy" class="navbar-logo" height="75" />
      </b-navbar-brand>
    </b-navbar>

    <!-- Sidebar -->
    <left-sidebar/>

    <!-- Main Content -->
    <div id="main-content">
      <router-view/>
    </div>
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
  margin-right: 30px; /* Space between Menu button and Travelbuddy */
}

.hamburger-menu {
  width: 50px;
  height: 20px;
  position: relative;
  display: inline-block;
}

.hamburger-menu div {
  width: 100%;
  height: 4px;
  background-color: #e070de;
  position: absolute;
  transition: all 0.3s ease;
}

.hamburger-menu div:nth-child(1) { top: 0; }
.hamburger-menu div:nth-child(2) { top: 8px; }
.hamburger-menu div:nth-child(3) { top: 16px; }

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

/* Global hover effect for all buttons */
button:hover {
  background-color: #aaa;
}

/* Global active effect for all buttons */
button:active {
  background-color: #555;
}

/* Global focus effect for all input and textarea elements */
input:focus, textarea:focus {
  border: 2px solid #007bff;
}
</style>
