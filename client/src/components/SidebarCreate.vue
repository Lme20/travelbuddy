<template>
    <div id="create-new-entry">
      <b-sidebar v-model="sidebarOpen" id="sidebar-create" :title="sidebarTitle" right>
        <!-- Conditional content based on button clicked -->
        <div v-if="sidebarContents === 1" class="px-3 py-2">
          <journal-entry/>
          <b-button @click="closeSidebar">Close</b-button>
        </div>
        <div v-else-if="sidebarContents === 2" class="px-3 py-2">
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
      sidebarContents: null,
      sidebarTitle: 'Create new'
    }
  },
  props: {
    contentToDisplay: {
      type: Number,
      default: null
    }
  },
  watch: {
    contentToDisplay(newVal) {
      this.openSidebar(newVal)
    }
  },
  methods: {
    openSidebar(component) {
      this.sidebarContents = component
      this.sidebarOpen = true

      // Set the title
      if (component === 1) {
        this.sidebarTitle = 'Create Journal Entry'
      } else if (component === 2) {
        this.sidebarTitle = 'Create Checklist'
      } else {
        this.sidebarTitle = 'Create new'
      }
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
