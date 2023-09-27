import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Journals from './views/Journals.vue'
import JournalEntry from './views/JournalEntry.vue'
import Journal from './views/Journal.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/journals',
      name: 'journals',
      component: Journals
    },
    {
      path: '/journalEntry',
      name: 'journalEntry',
      component: JournalEntry
    },
    {
      path: '/journalEntry/:id',
      name: 'journal',
      component: Journal
    }

  ]
})
