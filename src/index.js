import Vue from 'vue'
import VueRouter from 'vue-router'

import item1 from './components/item1.vue'
import item2 from './components/item2.vue'
import item3 from './components/item3.vue'

import IndexPage from './IndexPage.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: IndexPage,
      children: [
        {
          path: '',
          redirect: 'a'
        },
        {
          path: 'a',
          name: 'item1',
          component: item1
        },
        {
          path: 'b',
          name: 'item2',
          component: item2
        },
        {
          path: 'c',
          name: 'item3',
          component: item3
        }
      ]
    }
  ]
})

export default router

