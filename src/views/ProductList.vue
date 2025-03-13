<script setup lang="ts">
  import Categories from '@/components/Categories.vue';
  import ProductCard from '@/components/ProductCard.vue';
  import { useProductStore } from '@/stores/ProductStore';
  const data = useProductStore();
</script>

<template>
  <div class="pb-5 md:flex gap-x-10">
    <div class="md:!w-[15rem] md:p-5 mb-10 md:pb-0 md:pt-5">
      <Categories/>
    </div>
    <div class="md:!w-[calc(100%-15rem)]">
      <a-divider orientation="left" class="!text-2xl">Product List</a-divider>
      <a-row :gutter="[16, 16]" class="!mt-10">
        <a-col
          v-for="(product, index) in data.items"
          :key="index"
          :xs="12"
          :sm="8"
          :md="12"
          :lg="8"
          :xl="6"
        >
          <ProductCard :productData="product" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<style scoped>
.gutter-box {
  background: #0092ff;
  padding: 8px 0;
}
</style>




