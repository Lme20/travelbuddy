<template>
  <div>
    <b-button v-b-toggle.sidebar-left>Toggle left Sidebar</b-button>
    <b-sidebar id="sidebar-left" title="Left Sidebar" lazy backdrop shadow>

      <div class="px-3 py-2">
        <!-- TODO figure out how to bind to right sidebar -->
        <b-button v-b-toggle.right-sidebar>Toggle Right Sidebar</b-button>
        <!-- /TODO -->
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
        <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide">Active</b-nav-item>
              <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
              <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
            </b-nav>
          </nav>
        <b-img src="https://picsum.photos/500/500/?image=54" fluid thumbnail></b-img>
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
