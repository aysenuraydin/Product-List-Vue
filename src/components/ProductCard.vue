<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <a-card hoverable style="margin: '15px 10px'; width: '100%'">
    <template #cover>
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    </template>
    <template #actions>
      <ShoppingOutlined :style="{ fontSize: '18px'}" />
      <HeartOutlined :style="{ fontSize: '18px'}" />
    </template>
    <RouterLink to="/product-detail/1">
      <a-card-meta title="Card title" description="This is the description"> </a-card-meta>
    </RouterLink>
  </a-card>
</template>

<style scoped>
/* */
  .icons {
    font-size: '32px !important';
    color: 'red';
  }
</style>
