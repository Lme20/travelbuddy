<template>
    <div>
      <b-sidebar id="create-checklist-sidebar" title="New checklist" aria-label="Create new checklist" right shadow>
        <div class="px-3 py-2">
          <checklist-entry/>
        </div>
      </b-sidebar>
    </div>
  </template>

<script>
import ChecklistEntry from '@/components/ChecklistEntry.vue'

export default {
  components: {
    'checklist-entry': ChecklistEntry
  }
}
</script>
