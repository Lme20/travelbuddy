<template>
  <div>
    <b-form id="checklist-entry" @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="titleInput" label="Title:" label-for="titleInput">
        <b-form-input
          id="titleInput"
          v-model="form.title"
          placeholder="Enter title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="datePicker" label="Date:" label-for="datePicker">
        <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2"></b-form-datepicker>
      </b-form-group>

      <b-form-tags
        input-id="tags-separators"
        v-model="form.items"
        separator=",;"
        placeholder="Enter new item"
      ></b-form-tags>
      <p class="mt-2">Value: {{ form.items }}</p>

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

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        items: [],
        date: '',
        location: null,
        activity: null
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
      this.form.date = ''
      this.form.items = []
      this.form.location = null
      this.form.activity = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
</style>
