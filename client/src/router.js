import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'
import About from './views/About.vue'
import Locations from './views/Locations.vue'
import Journals from './views/Journals.vue'
import Checklists from './views/Checklists.vue'
import Users from './views/Users.vue'

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
      path: '/locations',
      name: 'locations',
      component: Locations
    },
    {
      path: '/locations/:id',
      name: 'locationEntry',
      component: Locations
    },
    {
      path: '/journals',
      name: 'journals',
      component: Journals
    },
    {
      path: '/checklists',
      name: 'checklists',
      component: Checklists
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    }
  ]
})
