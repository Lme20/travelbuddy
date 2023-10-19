<template>
  <div style="left">
    <b-sidebar id="sidebar-left" aria-label="Menu sidebar" lazy backdrop shadow>

      <div class="menu-logo">
        <img src="@/assets/TB_logo.png" alt="Logo" />
      </div>

      <!-- Menu Links -->
      <div class="menu-section montserrat-bold">
        <div class="menu-item"><router-link to="/">Map</router-link></div>
        <div class="menu-item"><router-link to="/locations">Locations</router-link></div>
        <div class="menu-item"><router-link to="/journals">Journals</router-link></div>
        <div class="menu-item"><router-link to="/checklists">Checklists</router-link></div>
        <div class="menu-item"><router-link to="/settings">Manage entries</router-link></div>
        <div class="menu-item"><router-link to="/users">Manage user</router-link></div>
        <div class="menu-item"><router-link to="/about">About</router-link></div>
      </div>

      <!-- <template #footer="">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
         <router-link to="/about">About...</router-link>
       </div>
      </template> -->

    </b-sidebar>
  </div>
</template>

<script>
import Settings from '@/views/Settings.vue'
import About from '@/views/About.vue'

export default {
  views: {
    settings: Settings,
    about: About
  }
}
</script>

<style scoped>
.menu-logo {
  text-align: center;
}

.menu-logo img {
  width: 70%;
}

/* Style for the router-links */

.menu-item {
  padding: 15px 20px;
  border-bottom: 1px solid #e5e5e5;
}

.menu-item a {
  text-decoration: none;
  color: inherit;
}

.menu-item a:hover {
  color: #fa70cd;
}

.menu-item:last-child {
  border-bottom: none;
}

/* Active link styling */
.menu-item .router-link-active {
  color: #fa70cd;
  text-decoration: none;
}

</style>
