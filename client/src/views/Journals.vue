<template>
    <b-list-group>
      <div class="text-center">
      <h1>All Journals</h1>
      </div>
        <b-list-group-item v-for="journal in journals" v-bind:key="journal._id" cols="12" sm="6" md="4">
          <router-link :to="{ name: 'journalEntry', params: { id: journal._id } }">
    {{ journal.title }}
  </router-link>
          <div>
        <div class="detail"> date {{ journal.date }}</div>
    </div>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'journals',
  mounted() {
    console.log('PAGE is loaded!')
    Api.get('/journals')
      .then(response => {
        console.log(response.data)
        this.journals = response.data.journals
      })
      .catch(error => {
        this.journals = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  data() {
    return {
      journals: []
    }
  }

}
</script>

<style>

</style>
