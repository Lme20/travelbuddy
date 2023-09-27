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
          required
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
        <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2"></b-form-datepicker>
      </b-form-group>

      <b-form-group id="journalEntry" label="JournalEntry:" label-for="journalEntry">
        <b-form-textarea
      id="journalEntry"
      v-model="form.journal"
      placeholder="Enter something..."
      rows="3"
    ></b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button variant="danger" v-on:click="$emit('del-journal', journal._id)">X</b-button>    </b-form>
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
        activity: null,
        date: '',
        journal: ''
      },
      locations: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      activities: [{ text: 'Select', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
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
      this.form.journal = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    deleteCamel(id) {
      console.log(`Delete journal with id ${id}`)
      Api.delete(`/journals/${id}`)
        .then(response => {
          const index = this.journals.findIndex(journal => journal._id === id)
          this.journals.splice(index, 1)
        })
        // TODO: catch error
    }
  }
}
</script>

<style scoped>
</style>
