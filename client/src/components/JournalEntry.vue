<template>
  <div class = "container">
    <b-form id="journal-entry" @submit="onSubmit" @reset="onReset" @delete="onDelete" v-if="show">

      <b-form-group id="titleInput" label="Your Title:" label-for="titleInput">
        <b-form-input
          id="titleInput"
          v-model="form.title"
          placeholder="Enter title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="locationSelect" label="Locations:" label-for="locationSelect">
        <b-form-select
          id="locationSelect"
          v-model="form.location"
          :options="locations"
          :text-field="'name'"
          :value-field="'name'"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="activitiesSelect" label="Activities:" label-for="activitiesSelect">
        <b-form-select
          id="activitiesSelect"
          v-model="form.activity"
          :options="activities"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="datePicker" label="Date:" label-for="datePicker">
        <b-form-datepicker id="datepicker" v-model="form.date" class="mb-2"></b-form-datepicker>
      </b-form-group>

      <b-form-group id="journalEntryText" label="Journal entry:" label-for="journalEntryText">
        <b-form-textarea id="journalentry" v-model="form.journalTextEntry" placeholder="Enter something..." rows="3"></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary" class="mx-1">Submit</b-button>
      <b-button type="reset" variant="danger"  class="mx-1">Reset</b-button>
      <b-button type="delete" variant="danger" @click="onDelete"  class="mx-1">Delete</b-button>
</b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'journalEntry',
  data() {
    return {
      form: {
        title: '',
        location: '',
        date: '',
        activity: '',
        journalTextEntry: ''
      },
      locations: [],
      activities: [],
      journalId: null,
      show: true

    }
  },
  mounted() {
    console.log('PAGE is loaded!')
    const journalId = this.$route.params.id
    Api.get(`/journals/${journalId}`)
      .then(response => {
        const journalData = response.data
        console.log('API Response:', journalData)
        // Update your component's data with the fetched journal data
        this.form.title = journalData.title
        this.form.location = journalData.location
        this.form.activity = journalData.activity
        this.form.date = journalData.date
        this.form.journalTextEntry = journalData.journalTextEntry
      })
      .catch(error => {
        console.error('Error fetching journal data:', error)
        // Handle errors or display an error message to the user
      })

    Api.get('locations')
      .then(response => {
        console.log('Locations:', response)
        const locationData = response.data
        // Create a Set to store unique location names
        const uniqueLocations = new Set(locationData.map(location => location.place_name))

        // Convert the Set back to an array (if needed)
        this.locations = [...uniqueLocations]
      })
      .catch(error => {
        console.error('Error fetching location data:', error)
        // Handle errors or display an error message to the user
      })

    Api.get('activities')
      .then(response => {
        console.log('Activities:', response)
        const activityData = response.data
        const uniqueActivities = new Set(activityData.map(activity => activity.name))
        this.activities = [...uniqueActivities]
      })
      .catch(error => {
        console.error('Error fetching activity data:', error)
        // Handle errors or display an error message to the user
      })
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      const journalId = this.$route.params.id
      if (journalId) {
        this.updateJournalEntry(journalId)
        this.$router.push({ path: '/journals' })
      } else {
        this.createJournalEntry()
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.location = null
      this.form.activity = null
      this.form.date = ''
      this.form.journalText = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    onDelete(event) {
      event.preventDefault()
      const journalId = this.$route.params.id
      Api.delete(`/journals/${journalId}`)
        .then(response => {
          console.log('Journal entry deleted successfully:', response.data)
          this.$router.push({ path: '/journals' })
        })
        .catch(error => {
          console.error('Error deleting journal entry:', error)
          // Handle the error and display an error message to the user
        })
    },
    updateJournalEntry(journalId) {
      Api.put(`/journals/${journalId}`, this.form)
        .then(response => {
          console.log('Journal entry updated successfully:', response.data)
        })
        .catch(error => {
          console.error('Error updating journal entry:', error)
        })
    },
    createJournalEntry() {
      Api.post('/journals', this.form)
        .then(response => {
          console.log('New journal entry created successfully:', response.data)
        })
        .catch(error => {
          console.error('Error creating new journal entry:', error)
        })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px; /* Add padding to create spacing from side walls */
}
</style>
