<template>
  <div class="text-center"  v-if="loading">
    <a-spin />
  </div>
  <RouterLink :to="{ name: 'product-list'}">
    <a-button block style="margin-top: 7px;" :class="{ '!bg-gray-100 !shadow-md' : (activeCategory=='') }" >
      All Products
    </a-button>
  </RouterLink>
  <RouterLink :to="{ name: 'product-list',  query: { categoryName: category.name,categoryId: category?.id }}" v-for="(category, index) in data"
  :key="index">
    <a-button block style="margin-top: 7px;" :class="{ '!bg-gray-100 !shadow-md' : (activeCategory==category.name) }">
      {{ category.name }}
    </a-button>
  </RouterLink>
</template>
<script lang="ts" setup>
  import { RouterLink } from 'vue-router';
  import { ref, watch, onMounted } from 'vue';
  import type { ICategory } from '@/models/ICategory';
  import { categories, categoryLoading } from '@/services/categoryService';
  import { useRoute } from 'vue-router';

  const data = ref<ICategory[] | undefined>([]);
  const loading = ref(false);
  const activeCategory = ref("")
  const route = useRoute();

  onMounted(async () => {
    await mounted();
  });
  const mounted = async() => {
    data.value= await categories();
    loading.value = categoryLoading.value;
  }
  watch(categoryLoading, (newVal) => {
    loading.value = newVal;
  });
  watch(route, async(newVal) => {
    activeCategory.value=newVal.query.categoryName??""
  });
</script>



