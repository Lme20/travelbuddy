<template>
  <div style="left">
    <b-sidebar id="sidebar-left" title="Left Sidebar" aria-label="Menu sidebar" lazy backdrop shadow>

      <div class="px-3 py-2">
        <router-link to="/">Home</router-link><br>
        <br>
        <router-link to="/locations">Locations</router-link><br>

        <router-link to="/journals">Journal entries</router-link><br>
        <router-link to="/checklists">Checklists</router-link><br>
        <br>
        <router-link to="/settings">Settings</router-link><br>
        <router-link to="/about">About...</router-link>
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
    // Define the name of the component here
    settings: Settings,
    about: About
  }
}
</script>
