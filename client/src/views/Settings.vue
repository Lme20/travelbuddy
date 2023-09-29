<template>
    <div class="col-3">
        <h1>Create new user</h1>
      <b-form id="create-user" @submit="onSubmit" @reset="onReset" v-if="show">

        <b-form-group id="nameInput" label="" label-for="nameInput">
          <b-form-input
            id="nameInput"
            v-model="form.name"
            placeholder="Enter name..."
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="currencySelect" label="" label-for="currencySelect">
          <b-form-select
            id="currencySelect"
            v-model="form.prefCurrency"
            :options="currency"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="unitSelect" label="" label-for="unitSelect">
          <b-form-select
            id="unitSelect"
            v-model="form.prefUnit"
            :options="unit"
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
import { Api } from '@/Api'

export default {
  data() {
    return {
      form: {
        name: '',
        prefCurrency: '',
        prefUnit: ''
      },
      currency: [{ text: 'Currency...', value: null }, 'SEK', 'EUR', 'USD'],
      unit: [{ text: 'Unit...', value: null }, 'metric', 'imperical'],
      show: true
    }
  },
  methods: {
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

  <style scoped>
  </style>
