<template>
  <div class = "container">
    <b-list-group>
      <div class="text-center">
        <h1 class="montserrat-bold" >My Journals</h1>
      </div>
      <div v-if="journals.length > 0">
        <b-card-group columns>
          <b-card v-for="journal in journals" :key="journal._id" v-bind:header="journal.title" v-model="journals" header-class="montserrat-bold" >
            <b-card-text class="montserrat">
              {{ journal.journalTextEntry }}
            </b-card-text>
            <b-button-group>
              <b-button variant="success"
                @click="contentToDisplay = 1, userId = journal.owner, entryId = journal._id">Edit</b-button>
              <b-button variant="danger" @click="deleteJournalEntry(journal._id)">Delete</b-button>
            </b-button-group>
          </b-card>
        </b-card-group>
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
    },
    deleteJournalEntry(id) {
      Api.delete(`/journals/${id}`)
        .then(response => {
          console.log('Journal entry deleted successfully:', response.data)
        })
        .then(this.getJournals())
        .catch(error => {
          console.error('Error deleting journal entry:', error)
        })
    }
  },
  components: {
    'right-sidebar': RightSidebar
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}

/* TEXT STYLING ONLY */
.montserrat-bold {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.montserrat {
  font-family: 'Montserrat', sans-serif;
}

</style>
