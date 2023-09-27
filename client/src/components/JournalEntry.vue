<template>
  <div>
    <b-form id="journal-entry" @submit="onSubmit" @reset="onReset" v-if="show">

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

      <b-form-group id="journalEntry" label="JournalEntry:" label-for="journalEntry">
        <b-form-textarea
      id="journalEntry"
      v-model="form.journalText"
      placeholder="Enter something..."
      rows="3"
    ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
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
        location: null,
        date: null,
        activity: null,
        journalText: ''
      },
      locations: [],
      activities: [],
      show: true,
      created() {
        const journalId = this.$route.params.id
        this.getJournalData(journalId)
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
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
    getJournalData(journalId) {
      Api.get(`/journals/${journalId}`)
        .then(response => {
          console.log('API Response:', response.data)
          const journalData = response.data
          // Update your component's data with the fetched journal data
          this.form.title = journalData.title
          this.form.location = journalData.location
          this.form.activity = journalData.activity
          this.form.date = journalData.date
          this.form.journalText = journalData.journalText
        })
        .catch(error => {
          console.error('Error fetching journal data:', error)
        // Handle errors or display an error message to the user
        })
    }
  }
}
</script>

<style scoped>
</style>
