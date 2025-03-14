<template>
  <div class="px-7">
    <a-breadcrumb>
    <a-breadcrumb-item><a href="">Home</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">{{ categoryName}}</a></a-breadcrumb-item>
    <a-breadcrumb-item>{{ productName }}</a-breadcrumb-item>
  </a-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
  import { defineProps } from 'vue';
  defineProps<{
    categoryName : string;
    productName: string;
  }>();
</script>
