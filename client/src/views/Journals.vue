<template>
  <div>
    <b-list-group>
      <div class="text-center">
        <h1>All Journals</h1>
      </div>
      <div v-if="journals.length > 0">
        <b-list-group-item v-for="journal in journals" v-bind:key="journal._id" cols="12" sm="6" md="4">
          <b-link @click="contentToDisplay = 1, entryId = journal._id">
            {{ journal.title }}
          </b-link>
          <div>
            <div class="detail"> date {{ journal.date }}</div>
          </div>
        </b-list-group-item>
        <right-sidebar :contents="[contentToDisplay, userId, entryId]" />
      </div>

      <div v-else class="text-center">
        <p>No journal entries yet.</p>
        <b-button variant="success" @click="contentToDisplay = 1">Create new journal entry</b-button>
        <right-sidebar :contentToDisplay="contentToDisplay" />
      </div>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import RightSidebar from '@/components/RightSidebar.vue'

export default {
  name: 'journals',
  mounted() {
    this.getJournals()
  },
  data() {
    return {
      journals: [],
      contentToDisplay: null,
      userId: '',
      entryId: ''
    }
  },
  methods: {
    getJournals() {
      Api.get('/journals')
        .then(response => {
          console.log(response.data)
          this.journals = response.data.journals
        })
        .catch(error => {
          this.journals = []
          console.log(error)
        })
    }
  },
  components: {
    'right-sidebar': RightSidebar
  }
}
</script>

<style></style>
