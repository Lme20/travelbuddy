<!--check this file to incorporate into journals.vue-->
<template>
     <div>
        <b-button variant="danger" v-on:click="$emit('del-journal', journal._id)">X</b-button>
        <div> {{ journal.title }} </div>
        <div class="detail"> date {{ journal.date }}</div>
        <div class="more-info">journal summary</div>
    </div>
</template>

<script>
export default {
  name: 'journal-item',
  props: ['journal']
}
</script>

<style scoped>
</style>
