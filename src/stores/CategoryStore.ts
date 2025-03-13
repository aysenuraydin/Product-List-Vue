import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/models/ICategory'

export const useCategoryStore = defineStore('categories', () => {
  const products = ref<IProduct[] | null>()
  const items = reactive([
    {
      id: 1,
      name: 'Mac',
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      color: 'a4b2b0',
    },
    {
      id: 2,
      name: 'iPad',
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      color: '896863'
    },
    {
      id: 3,
      name: 'iPhone',
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      color: 'C27D42'
    },
    {
      id: 4,
      name: 'Watch',
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      color: 'BE969B'
    },
    {
      id: 5,
      name: 'AirPods',
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      color: '828DE5'
    },
    {
      id: 6,
      name: 'Accessories',
      createdAt: Date.now()+ Math.floor(Math.random() * 1000),
      color: 'BF8882',
      iconCssClass: 'active'
    }
  ])

  return { items, products }
})





