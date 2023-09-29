<template>
    <div>
      <h1>All Locations</h1>
      <table class="locations-table">
        <thead>
            <tr>
            <th>Name</th>
            <th>Coordinates</th>
            <th>Date</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="location in locations" v-bind:key="location._id">
            <td>
                <router-link :to="{ name: 'journalsByLocation', params: { id: location._id } }">
                {{ location.name }}
                </router-link>
            </td>
            <td>{{ location.coordinates }}</td>
            <td>{{ location.date }}</td>
            <td>
                <!-- Placeholder for actions like edit, delete -->
            </td>
            </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'Locations',
  data() {
    return {
      locations: []
    }
  },
  mounted() {
    Api.get('/locations') // '/locations' API endpoint
      .then(response => {
        this.locations = response.data.locations
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>
.locations-table {
  width: 100%;
  border-collapse: collapse;
}

.locations-table th,
.locations-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>
