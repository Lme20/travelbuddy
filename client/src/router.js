import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Journals from './views/Journals.vue'
import Settings from './views/Settings.vue'
import About from './views/About.vue'
import JournalEntry from './components/JournalEntry.vue'

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
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/journals',
      name: 'journals',
      component: Journals
    },
    {
      path: '/journalEntry/:id',
      name: 'journalEntry',
      component: JournalEntry
    }

  ]
})
