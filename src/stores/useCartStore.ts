import { defineStore } from 'pinia'
import type { ICartItem } from '@/models/ICartItem'
import { ref, onMounted } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const items = ref<ICartItem[]>([]);

  const addItem = (newItem: ICartItem) => {
    items.value?.push(newItem);
    localStorage.setItem('shoppingCart', JSON.stringify(items.value));
  };
  const updateItem = (newItem: ICartItem) => {
    const existingItem = items.value?.find((product) => product.id === newItem.id);
    if (existingItem) {
      existingItem.amount = newItem.amount;
    }
    else items.value.push(newItem);

    localStorage.setItem('shoppingCart', JSON.stringify(items.value));
  };
  const deleteItem = (item: ICartItem) => {
    const index = items.value?.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      items.value?.splice(index, 1)
    }
    localStorage.setItem('shoppingCart', JSON.stringify(items.value));
  }
  const clearCart = () => {
    items.value = [];
    localStorage.setItem('shoppingCart', JSON.stringify(items.value));
  };
  onMounted(() => {
      mounted();
  });
  const mounted = () => {
    items.value = JSON.parse(localStorage.getItem('shoppingCart')??'');
  }

  return { items, addItem, deleteItem, clearCart, updateItem }
})
