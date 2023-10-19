<template>
  <div class="container">
    <div class="text-center">
      <h1 class="montserrat-bold">Users</h1>
    </div>
    <div v-if="users.length > 0">
      <b-card-group>
        <b-card v-for="user in users" :key="user._id" v-bind:header="user.name" header-class="montserrat-bold" v-model="users">
          <b-button-group>
            <b-button variant="success" @click="contentToDisplay = 3, userId = user._id">Edit</b-button>
            <b-button variant="danger" @click="onDelete(user._id)">Delete</b-button>
          </b-button-group>
        </b-card>
      </b-card-group>

      <right-sidebar :contents="[contentToDisplay, userId, entryId]" />
    </div>
    <div v-else class="text-center">
      <p class="montserrat">No users yet.</p>
      <b-button variant="success" @click="contentToDisplay = 3">Create new user</b-button>
      <right-sidebar :contentToDisplay="contentToDisplay" />
    </div>

  </div>
</template>

<script>
import { Api } from '@/Api'
import RightSidebar from '@/components/RightSidebar.vue'

export default {
  name: 'users',
  mounted() {
    this.getUsers()
  },
  data() {
    return {
      users: [],
      contentToDisplay: null,
      userId: '',
      entryId: ''
    }
  },
  components: {
    'right-sidebar': RightSidebar
  },
  methods: {
    getUsers() {
      Api.get('/users')
        .then(response => {
          console.log(response.data)
          this.users = response.data.users
          console.log(this.users)
          this.showToast('User created successfully!', 'success')
        })
        .catch(error => {
          this.users = []
          console.log(error)
          this.showToast('Failed to create user', 'danger')
          //   TODO: display some error message instead of logging to console
        })
    },
    onDelete(user) {
      Api.delete(`/users/${user}`)
        .then(response => {
          this.getUsers() // fetch the updated user list
          this.contentToDisplay = null // Reset to neutral state
          console.log(response.data)
          this.showToast('Users deleted succesfully!', 'success')
        })
        .catch(error => {
          this.users = []
          console.log(error)
          this.showToast('Failed to delete users.', 'danger')
          // TODO: display some error message instead of logging to console
        })
    },
    showToast(message, variant = null) {
      this.$bvToast.toast(message, {
        title: 'Notification',
        variant,
        solid: true,
        toaster: 'b-toaster-bottom-right'
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}
</style>
