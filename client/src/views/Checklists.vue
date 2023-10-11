<template>
  <div>
    <div class="text-center">
      <h1>{ users }'s Checklists</h1>
    </div>

    <b-card-group columns v-for="checklist in checklists" :key="checklist._id">
      <b-card title={{ checklist.title }}>
        <b-card-text v-for="item in checklist.items" :key="item">
          <p>{{ checklist.items.item }}</p>
        </b-card-text>
      </b-card>
    </b-card-group>

    <b-card-group columns>

      <b-card header="Card with list group" v-model="checklists">
        <b-list-group v-for="item in checklists" :key="item._id">
          <b-list-group-item href="#">Dapibus ac facilisis in</b-list-group-item>
          <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          <b-list-group-item>{{ item._id }}</b-list-group-item>
        </b-list-group>
      </b-card>

      <b-card>
        <b-card-title>Title</b-card-title>
        <b-card-text>
          This card has supporting text below as a natural lead-in to additional content.
        </b-card-text>
        <b-card-text class="small text-muted">Last updated 3 mins ago</b-card-text>
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
