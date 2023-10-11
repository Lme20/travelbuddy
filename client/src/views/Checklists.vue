<template>
  <div>
    <div class="text-center">
      <h1>{ users }'s Checklists</h1>
    </div>

    <b-card-group columns>
      <b-card v-for="checklist in checklists" :key="checklist._id" header="checklist.title" v-model="checklists">
        <router-link :to="{ name: 'checklistEntry', params: { uid: checklist.owner, cid: checklist._id } }">
          <p>View and edit</p>
        </router-link>
        <b-list-group>
          <b-list-group-item v-for="item in checklist.items" :key="item._id">{{ item }}</b-list-group-item>
        </b-list-group>
      </b-card>
    </b-card-group>

  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'checklists',
  mounted() {
    console.log('PAGE is loaded!')
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
  data() {
    return {
      checklists: []
    }
  }
}
</script>

<style></style>
