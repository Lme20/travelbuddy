<template>
  <div class="col-9">
    <h1>All entries</h1>
    <b-card-group columns>
      <b-card header="Users">
        <b-button @click="contentToDisplay = 3">Create User</b-button>
        <b-button variant="danger" @click="deleteUsers()">Delete all</b-button>
        <b-list-group>
          <b-list-group-item v-for="user in users" :key="user._id">
            {{ user.name }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card header="Checklists">
        <b-button variant="danger" @click="deleteChecklists()">Delete all</b-button>
        <b-list-group>
          <b-list-group-item v-for="checklist in checklists" :key="checklist._id">
            {{ checklist.title }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card header="Journals">
        <b-button variant="danger" @click="deleteJournals(journals)">Delete all</b-button>
        <b-list-group>
          <b-list-group-item v-for="journal in journals" :key="journal._id">
            {{ journal.title }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-card header="Locations">
        <b-button variant="danger" @click="deleteLocations()">Delete all</b-button>
        <b-list-group>
          <b-list-group-item v-for="location in locations" :key="location._id">
            {{ location }}
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
    },
    getLocations() {
      Api.get('/locations')
        .then(response => {
          const locationData = response.data
          const uniqueLocations = new Set(locationData.map(location => location.placeName))
          this.locations = [...uniqueLocations]
        })
        .catch(error => {
          this.locations = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
    },
    deleteUsers() {
      Api.delete('/users')
        .then(response => {
          console.log('Success:', response.data)
        })
        .then(this.getUsers())
        // .then(this.deleteUserChecklists())
        // .then(this.deleteUserJournals())
        .catch(error => {
          console.error('Failure:', error)
          // Handle the error and display an error message to the user
        })
    },
    deleteChecklists() {
      Api.delete('/checklists')
        .then(response => {
          console.log('Success:', response.data)
        })
        .then(this.getChecklists())
        .catch(error => {
          console.error('Failure:', error)
          // Handle the error and display an error message to the user
        })
    },
    deleteJournals(ids) {
      for (let i = 0; i < ids.length; i++) {
        Api.delete(`/journals/${ids[i]._id}`)
          .then(response => {
            console.log('Success:', response.data)
          })
          .then(this.getJournals())
          .catch(error => {
            console.error('Failure:', error)
          // Handle the error and display an error message to the user
          })
      }
    },
    deleteLocations() {
      Api.delete('/locations')
        .then(response => {
          console.log('Success:', response.data)
        })
        .then(this.getLocations())
        .catch(error => {
          console.error('Failure:', error)
          // Handle the error and display an error message to the user
        })
    },
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      this.createUser()
      this.getUsers()
      this.$router.push({ path: '/settings' })
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
          this.$router.push({ path: '/settings' })
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
