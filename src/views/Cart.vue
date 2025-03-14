<template>
  <a-divider orientation="left" class="!text-2xl !pb-5">Shopping Cart</a-divider>
  <div class="p-4 lg:flex !gap-x-10 w-full justify-around">
    <div class="w-full">
      <DataTable :value="productsStore?.items" tableStyle="width: 100%;" :emptyMessage="null">
      <template #empty>
        <div class="flex justify-center items-center py-6">
          <a-empty :image="simpleImage" description="Empty cart!" />
        </div>
      </template>
      <Column header="Image">
        <template #body="slotProps">
          <a-image v-if="slotProps.data.imgUrl" :width="100"
          :src="(slotProps.data.imgUrl && slotProps.data.imgUrl?.length > 0) ? slotProps.data.imgUrl : 'https://dummyimage.com/600x500/ccc/aaa'"
          :alt="slotProps.data.name" class="rounded" />
          <ImageLorem v-else :width="100" class="rounded"/>
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column field="price" header="Price">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="amount" header="Amount">
        <template #body="slotProps">
          <a-input-number v-model:value="slotProps.data.amount" :min="1" :max="10" />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <CloseOutlined class="cursor-pointer !text-gray-400" @click="removeItem(slotProps.data)" style="font-size: 19px"/>
        </template>
      </Column>
    </DataTable>
    </div>
    <div class="w-96 bg-gray-100 self-start rounded-md !p-6 mx-auto mt-12 lg:mt-0">
      <h3 class="mt-10 text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Order Summary</h3>
      <div class="mt-10 mb-4 flex">
        <label for="adressId" class="w-1/3 mt-3">Adress</label>
        <textarea class="bg-white rounded-xl" rows="7"></textarea>
      </div>

      <div class="mt-10 text-gray-800 space-y-3 flex flex-wrap gap-4 text-sm">Subtotal <span class="ml-auto font-bold">$ {{ subtotal }}</span></div>

      <div class="!mt-10 !space-y-2">
          <button :disabled=false class="inline-block text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 !text-white rounded-md text-center disabled:bg-gray-400 cupo">Checkout</button>
          <RouterLink to="/" class="inline-block text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md text-center">Continue Shopping  </RouterLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import { CloseOutlined} from '@ant-design/icons-vue';
  import { RouterLink } from 'vue-router';
  import { Empty } from 'ant-design-vue';
  import ImageLorem from '@/components/ImageLorem.vue';
  import { useShoppingCartStore } from '@/stores/shoppingCartStore';
  import type { ICartItem } from '@/models/ICartItem';

  const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  const productsStore = useShoppingCartStore();

  const formatCurrency = (value: number) => {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };
  const subtotal = computed(() => {
      return productsStore.items.reduce((acc, product) => acc + product.price * product.amount, 0);
  });
  const removeItem = (product: ICartItem) => {
    productsStore.deleteItem(product);
  };
</script>
<style>
  .ant-input-number-handler-wrap {
      opacity: 1 !important;
  }
</style>
