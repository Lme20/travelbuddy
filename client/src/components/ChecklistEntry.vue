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

      <!-- <b-form-group id="locationSelect" label="" label-for="locationSelect">
        <b-form-select
          id="locationSelect"
          v-model="form.location"
          :options="locations"
          required
        ></b-form-select>
      </b-form-group> -->

      <b-form inline>
        <label class="sr-only" for="inline-form-input-name">Name</label>
        <b-form-input
          v-model="elem"
          id="inline-form-input-name"
          class="mb-2 mr-sm-0 mb-sm-0"
          placeholder="New item..."
        ></b-form-input>

        <b-button variant="primary" @click="onAdd">Add</b-button>
      </b-form>

      <table class="table mb-4">
        <thead>
          <tr>
            <th scope="col">Items</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in form.items" :key="item">
            <td>{{ item }}</td>
            <td>
              <b-button variant="danger" @click="onDelete(index)">X</b-button>
            </td>
          </tr>
        </tbody>
      </table>

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
  data() {
    return {
      form: {
        title: '',
        items: [],
        location: null
      },
      list: [],
      locations: [{ text: 'Location...', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      elem: '',
      show: true
    }
  },
  methods: {
    onAdd() {
      this.form.items.push(this.elem)
    },
    onDelete(index) {
      this.form.items.splice(index, 1)
    },
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      this.createChecklist()
    },
    createChecklist() {
      const userid = 'placeholder' // TODO get userid? Cookie? Global variable?
      Api.post('/api/users/' + userid + '/checklists', this.form)
        .then(response => {
          console.log('Success: ', response.data)
        })
        .catch(error => {
          console.log('Failure: ', error)
        })
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

<style scoped></style>
