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
        <b-list-group-item v-for="journal in journals" v-bind:key="journal._id" cols="12" sm="6" md="4" href="#some-link"></b-list-group-item>
            <journal-item v-bind:journal="journal" v-on:del-journal="deleteJournal"/>
        <b-list-group-item href="#some-link">Awesome link</b-list-group-item>
        <b-list-group-item href="#" active>Link with active state</b-list-group-item>
        <b-list-group-item href="#">Action links are easy</b-list-group-item>
        <b-list-group-item href="#foobar" disabled>Disabled link</b-list-group-item>
    </b-list-group>
</template>

<script>
import { Api } from '@/Api'
import JournalItem from '../components/JournalItem.vue'

export default {
  name: 'journals',
  components: {
    'journal-item': JournalItem
  },
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
  methods: {
    deleteJournal(id) {
      console.log(`Delete journal with id ${id}`)
      Api.delete(`/journal/${id}`)
        .then(response => {
          const index = this.journlas.findIndex(journal => journal._id === id)
          this.journals.splice(index, 1)
        })
        // TODO: catch error
    }
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
