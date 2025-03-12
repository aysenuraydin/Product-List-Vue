<script setup lang="ts">
  import Categories from '@/components/Categories.vue';
  import ProductCard from '@/components/ProductCard.vue';
  const data = [
    {
      id: 1,
      name: 'John Brown',
      price: 1200,
      rating:1,
      description: 'deneme',
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
    },
    {
      id: 2,
      name: 'John Brown',
      price: 1200,
      rating:5,
      description: 'deneme',
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
    },
    {
      id: 3,
      name: 'John Brown',
      price: 1200,
      rating:5,
      description: 'deneme',
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
    },
    {
      id: 4,
      name: 'John Brown',
      price: 1200,
      rating:5,
      description: 'deneme',
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
    },
    {
      id: 5,
      name: 'John Brown',
      price: 1200,
      rating:5,
      description: 'deneme',
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
    },
    {
      id: 6,
      name: 'John Brown',
      price: 1200,
      rating:5,
      description: 'deneme',
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
    },
    {
      id: 7,
      name: 'John Brown',
      price: 1200,
      rating:5,
      description: 'deneme',
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
    },
  ];
</script>

<template>
  <div class="max-w-[70rem] pb-5 mx-auto md:flex">
    <div class="md:!w-[15rem] md:p-5 mb-10 md:pb-0 md:pt-5">
      <Categories/>
    </div>
    <div class="md:!w-[calc(100%-15rem)]">
      <a-divider orientation="left" class="!text-2xl">Product List</a-divider>
    <a-row :gutter="[16, 16]" class="!mt-10">
      <a-col
        v-for="product in data"
        :key="product.id"
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




