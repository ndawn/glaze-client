import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/image/:id',
    name: 'Image',
    component: () => import(/* webpackChunkName: "about" */ '../views/Image.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
