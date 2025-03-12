import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Login from '@/views/Login.vue'
import Cart from '@/views/Cart.vue'
import Product from '@/views/admin/product.vue'
import Category from '@/views/admin/category.vue'
import Error from '@/views/Error.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'product-list',
      component: ProductList,
      meta: {
        layout: 'MainLayout'
      }
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        layout: 'AdminLayout'
      },
      children: [
        {
          path: 'product',
          name: 'product',
          component: Product,
        },
        {
          path: 'category',
          name: 'category',
          component: Category,
        },
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        layout: 'MainLayout'
      }
    },
    {
      path: '/product-detail/:id',
      name: 'productDetail',
      component: ProductDetail,
      meta: {
        layout: 'MainLayout'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: 'MainLayout'
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'error',
      component: Error,
      meta: {
        layout: 'MainLayout'
      }
    },
  ],
})

export default router
