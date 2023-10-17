<template>
  <b-navbar class="app-header">
    <!-- Hamburger menu -->
    <div class="hamburger-menu" @click="$root.$emit('bv::toggle::collapse', 'sidebar-left')">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <b-navbar-brand class="ml-3" href="/">
      <img src="@/assets/TB_logo.png" alt="Travelbuddy" class="navbar-logo" height="75" />
    </b-navbar-brand>
    <!-- User profile section -->
    <div class="user-profile" v-if="users.length > 0">
      <img src="@/assets/placeholderPicture.png" alt="User Profile" class="profile-pic"/>
      <b-link :to="{ name: 'settings' }">{{ users[0].name }}</b-link>
    </div>
  </b-navbar>
</template>

<script>
import { Api } from '@/Api'

export default {
  data() {
    return {
      users: []
    }
  },
  mounted() {
    Api.get('/users') // Replace 'someUserId' with actual user ID
      .then(response => {
        this.users = response.data.users
      })
      .catch(error => {
        this.users = []
        console.log(error)
      })
  },
  methods: {
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
  width: 60px;            /* Increased width */
  height: 30px;           /* Increased height */
  position: relative;
  display: inline-block;
}

.hamburger-menu div {
  width: 100%;
  height: 6px;            /* Thicker bars */
  background-color: #fa70cd;
  position: absolute;
  transition: all 0.3s ease;
  border-radius: 7.5px;   /* Rounded corners */
}

.hamburger-menu div:nth-child(1) { top: 0; }
.hamburger-menu div:nth-child(2) { top: 12px; }   /* Adjusted spacing */
.hamburger-menu div:nth-child(3) { top: 24px; }   /* Adjusted spacing */

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

/* Global focus effect for all input and textarea elements */
input:focus, textarea:focus {
  border: 2px solid #007bff;
}

.user-profile {
  position: absolute;
  right: 20px;
  top: 55%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  margin-right: 65px;
  font-weight: 600;
}

.user-profile b-link,
.user-profile a {
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
  font-size: 1.5em;
  color: #fa70cd; /* This is the new color for the username text */
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 15px;
}

</style>
