<template>
  <div id="app">
    <!-- Navbar -->
    <GlobalHeader/>
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
import GlobalHeader from './components/GlobalHeader.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    'left-sidebar': LeftSidebar,
    GlobalHeader
  },
  mounted() {

  },
  methods: {
    fetchUser(uid) {

    }
  }
}
</script>

<style>

.app-footer {
  background-color: #021c51;
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

/* Global effect for all buttons */
b-button:hover {
  background-color: #fa70cd;
}

b-button:active {
  background-color: #fa70cd;
}

/* Global focus effect for all input and textarea elements */
input:focus, textarea:focus {
  border: 2px solid #007bff;
}

/* Global styling for location button */
.location-btn {
  color: white;
  background-color: green;
  padding: 3px;
  border-radius: 5px;
}

.location-btn:active {
  background-color: darkgreen;
}

</style>
