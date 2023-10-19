<template>
    <div class="col-9 mx-auto text-center">
      <h1 class="montserrat-bold">All Entries</h1>
      <b-card-group columns>
        <b-card header="Checklists">
          <b-button :to="{name: 'checklists'}">View checklists</b-button>
          <b-button variant="danger" @click="deleteChecklists()">Delete all</b-button>
          <b-list-group>
            <b-list-group-item v-for="checklist in checklists" :key="checklist._id">
              {{ checklist.title }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card header="Journals">
          <b-button :to="{name: 'journals'}">View journal entries</b-button>
          <b-button variant="danger" @click="deleteJournals(journals)">Delete all</b-button>
          <b-list-group>
            <b-list-group-item v-for="journal in journals" :key="journal._id">
              {{ journal.title }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
        <b-card header="Locations">
          <b-button :to="{name: 'locations'}">View locations</b-button>
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
      checklists: [],
      journals: [],
      locations: [],
      contentToDisplay: null,
      show: true
    }
  },
  mounted() {
    this.refreshData()
  },
  components: {
    'right-sidebar': RightSidebar
  },
  methods: {
    refreshData() {
      this.getChecklists()
      this.getJournals()
      this.getLocations()
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
    deleteChecklists() {
      Api.delete('/checklists')
        .then(response => {
          console.log('Success:', response.data)
          // Refresh the checklists after successful deletion
          this.refreshData()
          this.showToast('Checklists deleted successfully!', 'success')
        })
        .catch(error => {
          console.error('Failure:', error)
          this.showToast('Failed to delete checklists.', 'danger')
        })
    },
    deleteJournals(ids) {
      const deletePromises = ids.map(id => {
        return Api.delete(`/journals/${id._id}`)
      })

      Promise.all(deletePromises)
        .then(() => {
          console.log('All journals deleted successfully.')
          this.refreshData()
          this.showToast('Journals deleted successfully!', 'success')
        })
        .catch(error => {
          console.error('Failure:', error)
          this.showToast('Failed to delete journals.', 'danger')
        })
    },
    deleteLocations() {
      Api.delete('/locations')
        .then(response => {
          console.log('Success:', response.data)
          this.refreshData()
          this.getLocations()
          this.showToast('Locations deleted successfully!', 'success')
        })
        .catch(error => {
          console.error('Failure:', error)
          this.showToast('Failed to delete locations.', 'danger')
        })
    },
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      this.createUser()
      this.refreshData()
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
    showToast(message, variant = null) {
      this.$bvToast.toast(message, {
        title: 'Notification',
        variant,
        solid: true,
        toaster: 'b-toaster-bottom-right'
      })
    }
  }
}
</script>

<style scoped>

</style>
