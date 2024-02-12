import { createRouter, createWebHistory } from 'vue-router'
import Products from '../views/Products.vue'

const routes = [
  {
    path: '/',
    name: 'products',
    component: Products
  },
  {
    path: '/:id',
    name: 'selected-products',
    component: () => import(/* webpackChunkName: "about" */ '../views/SelectedProduct.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
