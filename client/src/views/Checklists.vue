<template>
  <div>
    <div class="text-center">
      <h1>Checklists</h1>
    </div>
    <div v-if="checklists.length > 0">
      <b-card-group columns>
        <b-card v-for="checklist in checklists" :key="checklist._id" v-bind:header="checklist.title" v-model="checklists">
          <!-- <p>At {{ checklist.location.placeName }}</p> -->
          <b-list-group>
            <b-list-group-item v-for="item in checklist.items" :key="item._id">{{ item }}</b-list-group-item>
          </b-list-group>

          <b-button-group>
            <b-button variant="success"
              @click="contentToDisplay = 2, userId = checklist.owner, entryId = checklist._id">Edit</b-button>
            <b-button variant="danger" @click="onDelete(checklist.owner, checklist._id)">Delete</b-button>
          </b-button-group>
        </b-card>
      </b-card-group>

      <right-sidebar :contents="[contentToDisplay, userId, entryId]" />
    </div>
    <div v-else class="text-center">
      <p>No checklists yet.</p>
      <b-button variant="success" @click="contentToDisplay=2">Create new checklist</b-button>
      <right-sidebar :contentToDisplay="contentToDisplay"/>
    </div>

  </div>
</template>

<script>
import { Api } from '@/Api'
import RightSidebar from '@/components/RightSidebar.vue'

export default {
  name: 'checklists',
  mounted() {
    this.getChecklists()
  },
  data() {
    return {
      checklists: [],
      contentToDisplay: null,
      userId: '',
      entryId: ''
    }
  },
  components: {
    'right-sidebar': RightSidebar
  },
  methods: {
    getChecklists() {
      Api.get('/checklists')
        .then(response => {
          console.log(response.data)
          this.checklists = response.data.checklists
          console.log(this.checklists)
        })
        .catch(error => {
          this.checklists = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
    },
    onDelete(user, entry) {
      Api.delete('/users/' + user + '/checklists/' + entry)
        .then(response => {
          console.log(response.data)
        })
        .then(this.getChecklists())
        .catch(error => {
          this.checklists = []
          console.log(error)
          //   TODO: display some error message instead of logging to console
        })
    }
  }
}
</script>

<style></style>
