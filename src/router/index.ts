import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/views/admin.vue'
import Cart from '@/views/Cart.vue'
import ProductList from '@/views/ProductList.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Login from '@/views/Login.vue'
import Error from '@/views/Error.vue'
import MainLayout from '@/Layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'product-list',
          component: ProductList,
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
        },
        {
          path: '/cart',
          name: 'cart',
          component: Cart,
        },
        {
          path: '/product-detail/:id',
          name: 'productDetail',
          component: ProductDetail,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/:catchAll(.*)',
          name: 'error',
          component: Error,
        },
      ]
    }
  ],
})

export default router
