<script setup lang="ts">
  import Categories from '@/components/Categories.vue';
import ProductCard from '@/components/ProductCard.vue';
</script>

<template>
  <div class="max-w-[70rem] pb-5 mx-auto flex">
    <div class="w-64 p-5"> <Categories/> </div>
    <div class="w-full">
      <a-divider orientation="left" class="!text-2xl">Product List</a-divider>
    <a-row :gutter="[16, 16]" class="!mt-10">
      <a-col
        v-for="n in 10"
        :key="n"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6"
      >

        <ProductCard />
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




