<template>
  <div>
    <b-jumbotron header="DIT342 Frontend" lead="Welcome to your DIT342 Frontend Vue.js App">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >Get Message from Server</b-button>
      <p>Message from the server:<br/>
      {{ message }}</p>
    </b-jumbotron>
    <div>
      <p>
        This is the main page. It should contain the map. When the map is clicked, the
        right sidebar should show up like this:
      </p>
      <b-dropdown id="dd-create" text="Create..." class="m-md-2">
        <b-dropdown-item v-b-toggle.create-journal-sidebar>Journal entry</b-dropdown-item>
        <b-dropdown-item v-b-toggle.create-checklist-sidebar>Checklist</b-dropdown-item>
        <b-dropdown-item v-b-toggle.sidebar-right disabled>Review</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
