<template>
    <div id="create-new-entry">
      <b-dropdown id="dd-create" text="Create..." class="m-md-2">
        <b-dropdown-item @click="openSidebar(1)">Journal entry</b-dropdown-item>
        <b-dropdown-item @click="openSidebar(2)">Checklist</b-dropdown-item>
        <b-dropdown-item @click="openSidebar(3)" disabled>Activity</b-dropdown-item>
        <b-dropdown-item @click="openSidebar(3)" disabled>Review</b-dropdown-item>
      </b-dropdown>
      <b-sidebar v-model="sidebarOpen" id="sidebar-create" title="Create new" right>
        <!-- Conditional content based on button clicked -->
        <div v-if="sidebarContents === 1" class="px-3 py-2">
          <p>Create new journal entry.</p>
          <journal-entry/>
          <b-button @click="closeSidebar">Close</b-button>
        </div>
        <div v-else-if="sidebarContents === 2" class="px-3 py-2">
          <p>Create new checklist.</p>
          <checklist-entry/>
          <b-button @click="closeSidebar">Close</b-button>
        </div>
      </b-sidebar>
    </div>
  </template>

<script>
import JournalEntry from '@/components/JournalEntry.vue'
import ChecklistEntry from '@/components/ChecklistEntry.vue'

export default {
  data() {
    return {
      sidebarOpen: false,
      sidebarContents: null
    }
  },
  methods: {
    openSidebar(component) {
      this.sidebarContents = component
      this.sidebarOpen = true
    },
    closeSidebar() {
      this.sidebarOpen = false
      this.sidebarContents = null
    }
  },
  components: {
    'journal-entry': JournalEntry,
    'checklist-entry': ChecklistEntry
  }
}
</script>
