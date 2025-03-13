<script setup>
import { RouterLink } from 'vue-router';
defineProps({
    productData: Object
  })
</script>

<template>
  <a-card hoverable style="margin: '15px 10px'; width: '100%'">
    <template #cover>
      <RouterLink :to="{ name: 'productDetail', params: { id: productData.id }}">
        <img
          alt="example"
          :src="productData.imgUrls[0]"
          class="p-2 object-contain h-40"
        />
      </RouterLink>
    </template>
    <template #actions>
      <RouterLink :to="{ name: 'cart'}">
        <ShoppingOutlined :style="{ fontSize: '18px'}" />
      </RouterLink>
      <HeartOutlined :style="{ fontSize: '18px'}" />
    </template>
    <RouterLink :to="{ name: 'productDetail', params: { id: productData.id }}">
      <a-card-meta :title="productData.name"></a-card-meta>
    </RouterLink>
    <a-rate :value="productData.raiting" disabled style="width: 120%; margin-top: 10px;"/>
  </a-card>
</template>

<style scoped>
  .icons {
    font-size: '32px !important';
    color: 'red';
  }
</style>
