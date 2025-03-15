<template>
  <a-card hoverable style="margin: '15px 10px'; width: '100%'" class="!h-full">
    <template #cover>
      <div class="!sm:h-44">
        <RouterLink :to="{ name: 'productDetail', params: { id: productData?.id }}">
          <img
            v-if="productData?.imgUrls && Array.isArray(productData.imgUrls) && productData.imgUrls.length > 0"
            alt="example"
            :src="productData.imgUrls[0]"
            class="p-2 object-contain !h-40 !mx-auto"
          />
        <div  v-else  class="flex justify-center">
          <ImageLorem class="rounded !border-gray-400 p-2 !object-contain !mx-auto !h-40"/>
        </div>
      </RouterLink>
      </div>
    </template>
    <RouterLink :to="{ name: 'productDetail', params: { id: productData?.id }}">
      <div class="flex justify-between">
        <a-card-meta :title="productData?.name"></a-card-meta>
        <div class="flex justify-end -mt-1">
          <span v-if="productData?.price" class="text-gray-600 mr-1">$</span>
          <span v-if="productData?.price" class="text-gray-600"> {{ productData?.price }}</span>
        </div>
      </div>
    </RouterLink>
    <a-rate :value="productData?.raiting" disabled style="width: 120%; margin-top: 10px;"/>
    <template #actions>
      <div @click="saveItem">
        <ShoppingOutlined :style="{ fontSize: '18px'}" />
      </div>
      <HeartOutlined :style="{ fontSize: '18px'}" />
    </template>
  </a-card>
</template>
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import router from '@/router'
  import ImageLorem from '@/components/ImageLorem.vue';
  import { useCartStore } from '@/stores/useCartStore';

  const cartStore = useCartStore();
  const props = defineProps({
    productData: Object
  })
  const saveItem = () => {

    if (!props.productData) return;
    const newItem = {
      id: props.productData.id,
      imgUrl: props.productData.imgUrls[0],
      name: props.productData.name,
      price: props.productData.price,
      amount: 1,
    }
    cartStore.addItem(newItem)
    router.push('/cart')
  }
</script>

<style scoped>
  .icons {
    font-size: '32px !important';
    color: 'red';
  }
</style>
