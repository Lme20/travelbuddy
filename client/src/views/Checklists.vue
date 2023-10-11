<template>
  <div>
    <div class="text-center">
      <h1>Checklists</h1>
    </div>

    <b-card-group columns>
      <b-card v-for="checklist in checklists" :key="checklist._id" v-bind:header="checklist.title" v-model="checklists">

        <b-list-group>
          <b-list-group-item v-for="item in checklist.items" :key="item._id">{{ item }}</b-list-group-item>
        </b-list-group>

        <b-button-group>
          <router-link :to="{ name: 'checklistEntry', params: { uid: checklist.owner, cid: checklist._id } }">
            <b-button variant="success">Edit</b-button>
          </router-link>

          <b-button @click="contentToDisplay=2, userId=checklist.owner, entryId=checklist._id">Edit</b-button>

          <b-button variant="danger" @click="onDelete(checklist.owner, checklist._id)">Delete</b-button>
        </b-button-group>
      </b-card>
    </b-card-group>

    <SidebarCreate :contents="[contentToDisplay,userId,entryId]" />

  </div>
</template>

<script>
import { Api } from '@/Api'
import SidebarCreate from '@/components/SidebarCreate.vue'

export default {
  name: 'checklists',
  mounted() {
    console.log('PAGE is loaded!')
    this.getChecklists()
  },
  data() {
    return {
      checklists: [],
      username: '',
      contentToDisplay: null,
      userId: '',
      entryId: ''
    }
  },
  components: {
    SidebarCreate
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
        .then(() => {
          console.log('This runs every time after success or error.')
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
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    }
  }
}
</script>

<style></style>
