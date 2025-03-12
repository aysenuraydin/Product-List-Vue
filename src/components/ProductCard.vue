<script setup>
import { RouterLink } from 'vue-router';
defineProps({
    productData: Object
  })
</script>

<template>
  <a-card hoverable style="margin: '15px 10px'; width: '100%'">
    <template #cover>
      <img
        alt="example"
        :src="productData.image[0].url"
      />
    </template>
    <template #actions>
      <ShoppingOutlined :style="{ fontSize: '18px'}" />
      <HeartOutlined :style="{ fontSize: '18px'}" />
    </template>
    <a-rate :value="productData.rating" disabled style="width: 120%; margin-bottom: 10px;"/>
    <RouterLink :to="{ name: 'productDetail', params: { id: productData.id }}">
      <a-card-meta :title="productData.name"></a-card-meta>
    </RouterLink>
  </a-card>
</template>

<style scoped>
  .icons {
    font-size: '32px !important';
    color: 'red';
  }
</style>
