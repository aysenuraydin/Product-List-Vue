<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink :to="{ name: 'product-list',  query: { query: 'imac' }}">
    <a-button block>iMac</a-button>
  </RouterLink>
  <RouterLink :to="{ name: 'product-list', query:{ query:'macbook' }}">
    <a-button block style="margin-top: 7px;">Macbook</a-button>
  </RouterLink>
  <RouterLink :to="{ name: 'product-list', query:{ query:'ipad' }}">
    <a-button block style="margin-top: 7px;">iPad</a-button>
  </RouterLink>
  <RouterLink :to="{ name: 'product-list', query:{ query:'iphone' }}">
    <a-button block style="margin-top: 7px;">iPhone</a-button>
  </RouterLink>
  <RouterLink :to="{ name: 'product-list', query:{ query:'watch' }}">
    <a-button block style="margin-top: 7px;">Watch</a-button>
  </RouterLink>
  <RouterLink :to="{ name: 'product-list', query:{ query:'airpods' }}">
    <a-button block style="margin-top: 7px;">AirPods</a-button>
  </RouterLink>
</template>


