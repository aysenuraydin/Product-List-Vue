<template>
  <RouterLink to="/admin/product">
    <a-button block>Products</a-button>
  </RouterLink>

  <RouterLink to="/admin/category">
    <a-button block style="margin-top: 7px;">Categories</a-button>
  </RouterLink>
</template>
<script lang="ts" setup>
  import { RouterLink } from 'vue-router';
</script>
