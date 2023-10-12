<template>
  <div>
    <b-form id="user-entry" @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input" label="" label-for="input">
        <b-form-input id="nameInput" v-model="form.name" placeholder="Enter name..." required></b-form-input>

        <table>
          <tr>
            <th>Unit</th>
            <td>
              <b-form-select id="unitSelect" v-model="form.prefUnit" placeholder="Unit..." :options="unit"
                required></b-form-select>
            </td>
          </tr>
          <tr>
            <th>Currency</th>
            <td>
              <b-form-select id="currencySelect" v-model="form.prefCurrency" placeholder="Currency..." :options="currency"
                required></b-form-select>
            </td>
          </tr>
        </table>

      </b-form-group>

      <b-button type="submit" variant="primary">Save</b-button>
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
  name: 'userEntry',
  data() {
    return {
      form: {
        name: '',
        prefCurrency: '',
        prefUnit: ''
      },
      locations: [],
      elem: '',
      currency: ['SEK', 'EUR', 'USD'],
      unit: ['metric', 'imperial'],
      show: true
    }
  },
  props: {
    user: {
      type: String,
      default: null
    }
  },
  watch: {
    user(newVal) {
      this.loadUser(newVal)
    }
  },
  mounted() {
    console.log('mounting')
    console.log(this.data)
    if (this.data) {
      this.getUser(this.data)
    } else {
      this.getUser(this.$route.params.uid)
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      if (this.user) {
        this.putUser(this.user)
      } else {
        this.postUser()
      }
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
    onDelete(event) {
      event.preventDefault()
      this.deleteUser(this.user)
    },
    getUser(uid) {
      Api.get(`/users/${uid}`)
        .then(response => {
          console.log('got ', response.data)
          // Update your component's data with the fetched journal data
          this.form.name = response.data.name
          this.form.prefCurrency = response.data.prefCurrency
          this.form.prefUnit = response.data.prefUnit
        })
        .catch(error => {
          console.error('Error fetching checklist data:', error)
          // Handle errors or display an error message to the user
        })
    },
    postUser() {
      Api.post('/users/', this.form)
        .then(response => {
          console.log('Success: ', response.data)
        })
        .catch(error => {
          console.log('Failure: ', error)
        })
    },
    putUser(uid) {
      Api.put(`/users/${uid}`, this.form)
        .then(response => {
          console.log('Success: ', response.data)
        })
        .catch(error => {
          console.error('Failure: ', error)
        })
    },
    deleteUser(uid) {
      Api.delete(`/users/${uid}`)
        .then(response => {
          console.log('Success:', response.data)
          // this.$router.push({ path: '/users' })
        })
        .catch(error => {
          console.error('Failure:', error)
          // Handle the error and display an error message to the user
        })
    }
  }
}
</script>

<style scoped></style>
