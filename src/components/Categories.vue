<template>
  <RouterLink :to="{ name: 'product-list',  query: { query: category.name }}" v-for="(category, index) in data.items"
  :key="index">
    <a-button block style="margin-top: 7px;">{{ category.name }}</a-button>
  </RouterLink>
</template>
<script lang="ts" setup>
  import { useCategoryStore } from '@/stores/categoryStore';
  import { RouterLink } from 'vue-router';
  const data = useCategoryStore();
</script>



