<template>
    <div>
      <b-sidebar id="sidebar-right" title="Right Sidebar" aria-label="Settings sidebar" right shadow>
        <div class="px-3 py-2">
          <p>
            This is a sidebar. Right now it contains a form to create journal entries, but it
            should be modularised to be launched with different components, depending on what the
            user clicks on on the map.
          </p>
          <!-- TODO: This should not be hard coded -->
          <journal-entry/>
          <!-- TODO -->
        </div>
      </b-sidebar>
    </div>
  </template>

<script>
import JournalEntry from '@/components/JournalEntry.vue'

export default {
  components: {
    'journal-entry': JournalEntry
  }
}
</script>
