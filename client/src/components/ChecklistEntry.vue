<template>
  <div>
    <b-form id="checklist-entry" @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="titleInput" label="" label-for="titleInput">
        <b-form-input
          id="titleInput"
          v-model="form.title"
          placeholder="Enter title..."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-tags
      input-id="tags-separators"
      v-model="form.items"
      separator=",;"
      placeholder="Enter item..."
      ></b-form-tags>
      <p class="mt-2">Value: {{ form.items }}</p>
      <!-- TODO -->
      <!-- <div v-bind:items="form.items">
        <ol>
          <li v-bind:items="form.items" v-for="i in items">{{ i }}</li>
        </ol>
      </div> -->
      <b-form-group id="locationSelect" label="" label-for="locationSelect">
        <b-form-select
          id="locationSelect"
          v-model="form.location"
          :options="locations"
          required
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
// import ChecklistEntry from './ChecklistEntry.vue'

export default {
  data() {
    return {
      form: {
        title: '',
        items: [],
        location: null
      },
      locations: [{ text: 'Location...', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
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
      this.form.items = []
      this.form.location = null
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
