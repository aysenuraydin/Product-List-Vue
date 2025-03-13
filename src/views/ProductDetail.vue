<script setup lang="ts">
  import Breadcrumb from '@/components/Breadcrumb.vue';
import type { ICategory } from '@/models/ICategory';
import type { IProduct } from '@/models/IProduct';
import { useCategoryStore } from '@/stores/CategoryStore';
  import { useProductStore } from '@/stores/ProductStore';
import type { display } from '@primeuix/themes/aura/inplace';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';

  const products = useProductStore();
  const categories = useCategoryStore();

  const data = ref<IProduct | null>();
  const url = ref("");
  const route = useRoute();

  const getProduct = () => {
    data.value = products.items.find((c) => c.id.toString() === route.params.id) || null;
    url.value = data.value?.imgUrls[0] || "";
  };

  onMounted(()=>{
    getProduct()
  })
  const getCategory = (id: number): ICategory | undefined => {
    return categories.items.find(c => c.id === id) ?? {
      id: 0,
      name: "Unknown",
      createdAt: new Date(),
      color: "gray"
    };
  };



</script>

<template>
  <Breadcrumb
    :categoryName="getCategory(data?.categoryId ?? 0)?.name || 'Unknown'"
    :productName="data?.name || 'Unknown'"
  />
  <div class="flex justify-center mt-10">
        <div class="flex flex-col space-y-2 overflow-scroll max-h-[500px]">
          <img :width="120"
          :src="(item && item?.length > 0) ? item : 'https://dummyimage.com/600x500/ccc/aaa'"
          class="cursor-pointer !border border-gray-200 rounded-xl"
          v-for="item in data?.imgUrls" :key="item"
          @click="url=item "
          />
        </div>
        <div class="mx-5">
          <a-image
          :height="500"
          :width="700"
          :src="(url && url?.length > 0) ? url : 'https://dummyimage.com/600x500/ccc/aaa'"
          style="border:1px solid #E5E5E5; border-radius: 10px; object-fit: contain;"
        />
        </div>
  </div>
  <div class="flex pt-15 gap-x-10 min-h-96">
    <div class="w-2/3">
      <div class="flex gap-x-4 items-start">
        <h1 class="text-2xl">{{ data?.name }}</h1>

        <RouterLink :to="{ name: 'product-list', query:{ query: getCategory(data?.categoryId??0)?.name }}">
          <a-tag :color="getCategory(data?.categoryId??0)?.color">
            <div class="!text-[15px] !px-4 !py-[5px]">
              {{ getCategory(data?.categoryId??0)?.name }}
            </div>
          </a-tag>
        </RouterLink>
      </div>

      <div class="text-gray-500" v-html="data?.description"></div>
      <div v-for="(tag) in data?.tags" :key="tag" class="!inline-block mt-5">
          <a-tag style="margin: 5px; display: inline-block">
            # {{ tag }}
          </a-tag>
        </div>
    </div>
    <div class="w-1/3">
      <a-rate :value="data?.raiting" disabled style="width: 120%; margin-bottom: 10px;"/>
      <h1 class="text-2xl">$ {{ data?.price }}</h1>
      <a-button class="w-full !bg-gray-800 !text-white">
        <ShoppingOutlined :style="{ fontSize: '18px'}" />
        Add Cart
      </a-button>

    </div>
  </div>

</template>

<style>

</style>
