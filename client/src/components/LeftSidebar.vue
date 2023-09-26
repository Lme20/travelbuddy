<template>
  <div style="left">
    <b-button v-b-toggle.sidebar-left>Toggle left Sidebar</b-button>
    <b-sidebar id="sidebar-left" title="Left Sidebar" aria-label="Menu sidebar" lazy backdrop shadow>

      <div class="px-3 py-2">
        <router-link to="/">Home</router-link><br>
        <router-link to="/settings">User settings</router-link>
        <!-- <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav> -->
      </div>

      <template #footer="">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
         <router-link to="/about">About...</router-link>
       </div>
      </template>

    </b-sidebar>
  </div>
</template>

<script>
import About from '@/views/About.vue'

export default {
  views: {
    // Define the name of the component here
    about: About
  }
}
</script>
