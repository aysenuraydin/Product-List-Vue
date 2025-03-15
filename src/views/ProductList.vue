<template>
  <div class="pb-5 md:flex gap-x-10">
    <div class="md:!w-[15rem] md:p-5 mb-10 md:pb-0 md:pt-5">
      <Categories/>
    </div>
    <div class="md:!w-[calc(100%-15rem)] relative">
      <a-divider orientation="left" class="!text-2xl">Product List</a-divider>
      <div
        class="flex justify-center items-center py-6"
        v-if="data?.length==0">
        <a-empty :image="simpleImage" description="Empty cart!" />
      </div>
      <div
        v-if="loading??false"
        class="text-center bg-gray-100 rounded-xl p-10 absolute top-24 w-full">
        <a-spin /> <span class="ml-2 text-gray-700">Loading...</span>
      </div>
      <a-row v-else :gutter="[16, 16]" class="!mt-10">
        <a-col
          v-for="(product, index) in data"
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
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import type { IProduct } from '@/models/IProduct';
  import Categories from '@/components/Categories.vue';
  import ProductCard from '@/components/ProductCard.vue';
  import { getProducts, getProductsByCategory, pLoading } from '@/services/productService';
  import { Empty } from 'ant-design-vue';
  import { useRoute } from 'vue-router';

  const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
  const data = ref<IProduct[] | undefined>([]);
  const loading = ref(false);
  const route = useRoute();

  onMounted(async () => {
    await mounted();
  });
  const mounted = async() => {
    // data.value= await getProductsByCategory(route.query.categoryId as string || "");
    // route.query.categoryId as string || ""
    // data.value= await getProducts();
    const categoryId = route.query.categoryId ? String(route.query.categoryId) : "";

  if (categoryId) {
    data.value = await getProductsByCategory(categoryId);
  } else {
    data.value = await getProducts();
  }
  }
  watch(pLoading, (newVal) => {
    loading.value = newVal;
  });
  watch(route, async(newVal) => {
    console.log(newVal.query.categoryName);
    await mounted();
  });
</script>
<style scoped>
.center {
  background: #0092ff;
  padding: 8px 0;
}
</style>




