<template>
  <!--<b-containter fluid class="myContainer">
        <b-row>
        <b-col cols="3">
          <b-button>Create New</b-button>
        </b-col>
      </b-row>
        <b-row>
            <h1>All journals</h1>
        <b-col v-for="journal in journals" v-bind:key="journal._id" cols="12" sm="6" md="4">
            <journal-item v-bind:journal="journal" v-on:del-journal="deleteJournal"/>
        </b-col>
      </b-row>
    </b-containter>-->

    <b-list-group>
        <h1>All journals</h1>
        <b-list-group-item v-for="journal in journals" v-bind:key="journal._id" cols="12" sm="6" md="4" href="journalEntry">
          <div>
        <div> {{ journal.title }} </div>
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
        this.journlas = []
        console.log(error)
        //   TODO: display some error message instead of logging to console
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  data() {
    return {
      journals: [],
      text: ''
    }
  }

}
</script>

<style>

</style>
