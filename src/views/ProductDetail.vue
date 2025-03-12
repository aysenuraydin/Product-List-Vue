<script setup lang="ts">
  import { reactive } from 'vue';
  const data = reactive({
    id: 1,
    name: 'John Brown',
    price: 1200,
    description: 'deneme',
    rating:4,
    categoryId: 1,
    category: "Electronics",
    isConfirmed: true,
    createdAt: "2021-09-01",
    stockAmount: 10,
    image: [
      { uid: '1', url: "https://dummyimage.com/600x500/ccc/aaa", name: "image-1" },
      { uid: '2', url: "https://dummyimage.com/600x700/ccc/bbb", name: "image-2" },
      { uid: '3', url: "https://dummyimage.com/600x700/ccc/ccc", name: "image-3" }
    ],
  });
</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
    <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
    <a-breadcrumb-item>An Application</a-breadcrumb-item>
  </a-breadcrumb>
  <div class="flex justify-center mt-10">
        <div class="flex flex-col space-y-2 overflow-scroll max-h-84">
          <a-image :width="120" :src="item.url" v-for="item in data.image" :key="item"/>
        </div>
        <div class="mx-5">
          <a-image
          :width="400"
          :src="data.image[0].url"
        />
        </div>
  </div>
  <div class="flex pt-15">
    <div class="w-2/3 ">
      <h1 class="text-2xl">{{ data.name }}</h1>
      <h1 class="">{{ data.category }}</h1>
      <div class="text-gray-500" v-html="data.description"></div>
    </div>
    <div class="w-1/3">
      <a-rate :value="data.rating" disabled style="width: 120%; margin-bottom: 10px;"/>
      <h1 class="text-2xl">$ {{ data.price }}</h1>
      <a-button class="w-full !bg-gray-800 !text-white">
        <ShoppingOutlined :style="{ fontSize: '18px'}" />
        Add Cart
      </a-button>

    </div>
  </div>

</template>

<style>

</style>
