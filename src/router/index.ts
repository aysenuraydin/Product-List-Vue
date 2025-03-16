import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import Cart from '@/views/Cart.vue'
import Product from '@/views/admin/product.vue'
import Category from '@/views/admin/category.vue'
import Error from '@/views/Error.vue'
import { auth } from "@/plugins/FirebaseConfig";
import { onAuthStateChanged } from 'firebase/auth'

const adminEmail= import.meta.env.VITE_FIREBASE_ADMIN_EMAIL|| ''
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
        layout: 'AdminLayout',
        requiresAuth: true
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
      path: '/:catchAll(.*)',
      name: 'error',
      component: Error,
      meta: {
        layout: 'MainLayout'
      }
    },
  ],
})
router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && user?.email != adminEmail) {
      next("/");
    } else {
      next();
    }
  });
});
export default router
