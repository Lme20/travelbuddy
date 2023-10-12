<template>
  <div class="col-9">
    <h1>Settings</h1>

    <b-card-group columns>
      <b-card header="Users">
        <b-button @click="contentToDisplay = 3">Create User</b-button>
        <b-button variant="danger" @click="onDeleteUsers">Delete all</b-button>
        <b-list-group>
          <b-list-group-item v-for="user in users" :key="user._id">
            {{ user.name }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card header="Checklists">
        <b-button variant="danger" @click="onDeleteChecklists">Delete all</b-button>
        <b-list-group>
          <b-list-group-item v-for="checklist in checklists" :key="checklist._id">
            {{ checklist.title }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card header="Journals">
        <b-button variant="danger" @click="onDeleteJournals">Delete all</b-button>
        <b-list-group>
          <b-list-group-item v-for="journal in Journals" :key="journal._id">
            {{ journal.title }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card header="Locations">
        <b-button variant="danger" @click="onDeleteLocations">Delete all</b-button>
        <b-list-group>
          <b-list-group-item v-for="location in locations" :key="location._id">
            {{ location.placeName }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-card-group>

    <right-sidebar :contentToDisplay="contentToDisplay" />
  </div>
</template>

<script>
import { Api } from '@/Api'
import RightSidebar from '@/components/RightSidebar.vue'

export default {
  data() {
    return {
      users: [],
      checklists: [],
      journals: [],
      locations: [],
      contentToDisplay: null,
      show: true
    }
  },
  mounted() {
    this.getUsers()
    this.getChecklists()
    this.getJournals()
    this.getLocations()
  },
  components: {
    'right-sidebar': RightSidebar
  },
  methods: {
    getUsers() {
      Api.get('/users')
        .then(response => {
          this.users = response.data.users
        })
        .catch(error => {
          this.users = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    },
    getChecklists() {
      Api.get('/checklists')
        .then(response => {
          this.checklists = response.data.checklists
        })
        .catch(error => {
          this.checklists = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    },
    getJournals() {
      Api.get('/journals')
        .then(response => {
          this.journals = response.data.journals
        })
        .catch(error => {
          this.journals = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    },
    getLocations() {
      Api.get('/locations')
        .then(response => {
          this.locations = response.data.locations
        })
        .catch(error => {
          this.locations = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    },
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      this.createUser()
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.prefCurrency = ''
      this.form.prefUnit = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    createUser() {
      Api.post('/users', this.form)
        .then(response => {
          console.log('Success: ', response.data)
          // TODO set cookie?
        })
        .catch(error => {
          console.log('Failure: ', error)
        })
    }
  }
}
</script>

<style scoped></style>
