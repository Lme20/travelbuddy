<template>
    <div id="create-new-entry">
      <b-sidebar v-model="sidebarOpen" id="sidebar-create" :title="sidebarTitle" right>
        <!-- Conditional content based on button clicked -->
        <div v-if="sidebarContents === 1" class="px-3 py-2">
          <journal-entry :entry="this.sidebarEntry"/>
          <b-button @click="closeSidebar">Close</b-button>
        </div>
        <div v-else-if="sidebarContents === 2" class="px-3 py-2">
          <checklist-entry :data="[this.sidebarUser, this.sidebarEntry]"/>
          <b-button @click="closeSidebar">Close</b-button>
        </div>
        <div v-else-if="sidebarContents === 3" class="px-3 py-2">
          <user-entry :user="this.sidebarUser"/>
          <b-button @click="closeSidebar">Close</b-button>
        </div>
      </b-sidebar>
    </div>
  </template>

<script>
import JournalEntry from '@/components/JournalEntry.vue'
import ChecklistEntry from '@/components/ChecklistEntry.vue'
import UserEntry from '@/components/UserEntry.vue'

export default {
  data() {
    return {
      sidebarOpen: false,
      sidebarContents: null,
      sidebarTitle: '',
      sidebarUser: '',
      sidebarEntry: ''
    }
  },
  props: {
    contentToDisplay: {
      type: Number,
      default: null
    },
    contents: {
      type: Array,
      default: null
    }
  },
  watch: {
    contentToDisplay(newVal) {
      this.openCreateSidebar(newVal)
    },
    contents(newVal) {
      if (newVal[0] > 0) {
        this.openEditSidebar(newVal)
      }
    }
  },
  methods: {
    openCreateSidebar(component) {
      this.sidebarContents = component
      this.sidebarOpen = true

      // Set the title
      if (component === 1) {
        this.sidebarTitle = 'Create Journal Entry'
      } else if (component === 2) {
        this.sidebarTitle = 'Create Checklist'
      } else if (component === 3) {
        this.sidebarTitle = 'Create User'
      } else {
        this.sidebarTitle = 'Create new'
      }
    },
    openEditSidebar(components) {
      console.log(components)
      this.sidebarContents = components[0]
      this.sidebarUser = components[1]
      this.sidebarEntry = components[2]
      this.sidebarOpen = true

      if (components[0] === 1) {
        this.sidebarTitle = 'Edit Journal Entry'
        console.log('rsb user: ' + this.sidebarUser)
        console.log('rsb entry: ' + this.sidebarEntry)
      } else if (components[0] === 2) {
        this.sidebarTitle = 'Edit Checklist'
      } else if (components[0] === 3) {
        this.sidebarTitle = 'Edit User'
      } else {
        this.sidebarTitle = 'Edit other'
      }
    },
    closeSidebar() {
      this.sidebarOpen = false
      this.sidebarContents = null
    }
  },
  components: {
    'journal-entry': JournalEntry,
    'checklist-entry': ChecklistEntry,
    'user-entry': UserEntry
  }
}
</script>
