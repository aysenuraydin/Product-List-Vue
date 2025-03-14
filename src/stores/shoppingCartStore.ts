import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { ICartItem } from '@/models/ICartItem';

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const items = reactive<ICartItem[]>([]);

  const saveItem = (newItem: ICartItem) => {
    console.log(saveItem);
    const existingItem = items.find((product) => product.id === newItem.id);
    if (existingItem) {
      existingItem.amount += newItem.amount;
    }
    else items.push(newItem);
  };
  const deleteItem = (item: ICartItem) => {
    const index = items.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      items.splice(index, 1)
    }
  }
  return { items, saveItem, deleteItem }
})





