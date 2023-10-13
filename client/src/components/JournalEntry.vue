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
          id="locationselect"
          v-model="form.location"
          :options="locations"
          :text-field="'name'"
          :value-field="'name'"
        ></b-form-select>
      </b-form-group>

      <b-form-group id="datePicker" label="Date:" label-for="datePicker">
        <b-form-datepicker id="datepicker" v-model="form.date" class="mb-2"></b-form-datepicker>
      </b-form-group>

      <b-form-group id="journalEntryText" label="Journal entry:" label-for="journalEntryText">
        <b-form-textarea id="journalentry" v-model="form.journalTextEntry" placeholder="Enter something..." rows="3"></b-form-textarea>
      </b-form-group>

      <div class="d-flex justify-content-between">
        <div>
          <b-button type="submit" variant="outline-primary" class="mx-1">Submit</b-button>
          <b-button type="delete" variant="outline-danger" @click="onDelete" class="mx-1">Delete</b-button>
        </div>
        <b-button type="reset" variant="outline-danger" class="mx-1">Reset</b-button>
      </div>
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
        journalTextEntry: ''
      },
      locations: [],
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

        this.form.title = journalData.title
        this.form.date = journalData.date
        this.form.journalTextEntry = journalData.journalTextEntry
        this.form.location = journalData.location
      })
      .catch(error => {
        console.error('Error fetching journal data:', error)
      })
    Api.get(`/journals/${journalId}/locations`)
      .then(response => {
        const locationsData = response.data
        console.log('Location Response:', locationsData)
        this.form.location = locationsData
      })
      .catch(error => {
        console.error('Error fetching journal data:', error)
      })
    Api.get('locations')
      .then(response => {
        console.log('Locations:', response)
        const locationData = response.data
        const uniqueLocations = new Set(locationData.map(location => location.place_name))

        this.locations = [...uniqueLocations]
      })
      .catch(error => {
        console.error('Error fetching location data:', error)
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
      this.form.location = ''
      this.form.date = ''
      this.form.journalTextEntry = ''

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
        })
    },
    updateJournalEntry(journalId) {
      const requestData = {
        date: this.form.date,
        journalTextEntry: this.form.journalTextEntry,
        locations: this.form.location
      }
      const patchTitle = {
        title: this.form.title
      }

      Api.patch(`/journals/${journalId}`, patchTitle)
        .then(response => {
          console.log('Journal entry updated successfully patch:', response.data)
        })
        .catch(error => {
          console.error('Error updating journal entry:', error)
        // Handle the error, e.g., show an error message to the user
        })
      Api.put(`/journals/${journalId}`, requestData)
        .then(response => {
          console.log('Journal entry updated successfully:', response.data)
        })
        .catch(error => {
          console.error('Error updating journal entry:', error)
        })
    },
    createJournalEntry() {
      const requestData = {
        title: this.form.title,
        date: this.form.date,
        journalTextEntry: this.form.journalTextEntry,
        locations: this.form.location
      }
      Api.post('/journals', requestData)
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
  padding: 10px;
}
</style>
