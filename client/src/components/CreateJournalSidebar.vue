<template>
    <div>
      <b-sidebar id="create-journal-sidebar" title="New Journal Entry" aria-label="Create new journal entry" right shadow>
        <div class="px-3 py-2">
          <journal-entry/>
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
