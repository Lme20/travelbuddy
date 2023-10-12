<template>
    <div class="col-3">
        <h1>Create new user</h1>
        <b-button @click="contentToDisplay = 3">Create User</b-button>
        <right-sidebar :contentToDisplay="contentToDisplay" />
    </div>
  </template>

<script>
import { Api } from '@/Api'
import RightSidebar from '@/components/RightSidebar.vue'

export default {
  data() {
    return {
      contentToDisplay: null,
      show: true
    }
  },
  components: {
    'right-sidebar': RightSidebar
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
