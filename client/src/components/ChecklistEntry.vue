<template>
  <div>
    <b-form id="checklist-entry" @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="ownerSelect" label="User:" label-for="ownerSelect">
        <b-form-select
          id="ownerselect"
          v-model="owner"
          :options="users"
          :text-field="'name'"
          :value-field="'_id'"
          placeholder="Select user"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="titleInput" label="" label-for="titleInput">
        <b-form-input
          id="titleInput"
          v-model="form.title"
          placeholder="Enter title..."
          required
        ></b-form-input>
      </b-form-group>

      <!-- <b-form-group id="locationSelect" label="" label-for="locationSelect">
        <b-form-select
          id="locationSelect"
          v-model="form.location"
          :options="locations"
          :text-field="'title'"
          :value-field="'_id'"
          placeholder="Select location"
        ></b-form-select>
      </b-form-group> -->

      <table class="table mb-4">
        <thead>
          <tr>
            <th scope="col">Items</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in form.items" :key="item">
            <td>{{ item }}</td>
            <td>
              <b-button variant="danger" @click="onDeleteItem(index)">X</b-button>
            </td>
          </tr>
        </tbody>
      </table>

      <b-form inline>
        <label class="sr-only" for="inline-form-input-text">Item</label>
        <b-form-input v-model="elem" id="inline-form-input-text" class="mb-2 mr-sm-0 mb-sm-0"
          placeholder="New item..."></b-form-input>
        <b-button variant="primary" @click="onAddItem">Add</b-button>
      </b-form>

      <b-button type="submit" variant="primary">Save</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'checklistEntry',
  data() {
    return {
      form: {
        title: '',
        items: [],
        location: ''
      },
      users: [],
      locations: [],
      elem: '',
      owner: null,
      show: true
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  watch: {
    data(newVal) {
      this.loadData(newVal)
    }
  },
  mounted() {
    this.getUsers()
    if (this.data[0]) {
      const uid = this.data[0]
      const cid = this.data[1]
      this.owner = uid
      this.getChecklist(uid, cid)
    } else {
      const uid = this.$route.params.uid
      const cid = this.$route.params.cid
      this.owner = uid
      this.getChecklist(uid, cid)
    }
    console.log(this.owner)
  },
  methods: {
    onAddItem() {
      this.form.items.push(this.elem)
    },
    onDeleteItem(index) {
      this.form.items.splice(index, 1)
    },
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      if (this.data[0]) {
        this.putChecklist(this.data[0], this.data[1])
      } else {
        this.postChecklist()
      }
    },
    onReset(event) {
      event.preventDefault()
      this.form.title = ''
      this.form.items = []
      this.form.location = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    onDelete(event) {
      event.preventDefault()
      this.deleteChecklist(this.owner, this._id)
    },
    getChecklist(uid, cid) {
      Api.get(`/users/${uid}/checklists/${cid}`)
        .then(response => {
          console.log('got ', response.data)
          this.form.title = response.data.title
          this.form.location = response.data.location
          this.form.items = response.data.items
        })
        .catch(error => {
          console.error('Error fetching checklist data:', error)
        })
    },
    postChecklist() {
      Api.post(`/users/${this.owner}/checklists`, this.form)
        .then(response => {
          console.log('Success: ', response.data)
        })
        .catch(error => {
          console.log('Failure: ', error)
        })
    },
    putChecklist(cid) {
      Api.put(`/checklists/${cid}`, this.form)
        .then(response => {
          console.log('Success: ', response.data)
        })
        .catch(error => {
          console.error('Failure: ', error)
        })
    },
    deleteChecklist(uid, cid) {
      Api.delete(`/users/${uid}/checklists/${cid}`)
        .then(response => {
          console.log('Success:', response.data)
          this.$router.push({ path: '/checklists' })
        })
        .catch(error => {
          console.error('Failure:', error)
        })
    },
    getUsers() {
      Api.get('/users')
        .then(response => {
          this.users = response.data.users
        })
        .catch(error => {
          this.users = []
          console.log(error)
        })
    }//,
    // getLocationss() {
    //   Api.get('/locations')
    //     .then(response => {
    //       this.locations = response.data.locations
    //     })
    //     .catch(error => {
    //       this.locations = []
    //       console.log(error)
    //     })
    // }
  }
}
</script>

<style scoped></style>
