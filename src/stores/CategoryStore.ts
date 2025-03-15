import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { ICategory } from '@/models/ICategory'
import { nanoid } from 'nanoid'

export const useCategoryStore = defineStore('categories', () => {
  const items = reactive<ICategory[]>([{
    id: '1',
    name: 'Mac',
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
    color: 'a4b2b0',
  },
  {
    id: '2',
    name: 'iPad',
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
    color: '896863'
  },
  {
    id: '3',
    name: 'iPhone',
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
    color: 'C27D42'
  },
  {
    id: '4',
    name: 'Watch',
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
    color: 'BE969B'
  },
  {
    id: '5',
    name: 'AirPods',
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
    color: '828DE5'
  },
  {
    id: '6',
    name: 'Accessories',
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
    color: 'BF8882',
  }]);
  const saveItem = (newItem: ICategory) => {
    if(newItem.id=='') {
      items.unshift({
        ...newItem,
        id: nanoid(6),
        createdAt: Date.now()+ Math.floor(Math.random() * 1000),
        })
    }else {
      const index = items.findIndex(i => i.id === newItem.id);
      if (index !== -1) {
        items[index] = {
          ...items[index],
          name: newItem.name,
          color: newItem.color,
        };
      }
    }
  };
  const deleteItem = (item: ICategory) => {
    const index = items.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      items.splice(index, 1)
    }
  }
  return { items, saveItem, deleteItem }
})





