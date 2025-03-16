<template>
  <div class="relative">
    <Breadcrumb
      :categoryName="getCategory(pData?.categoryId ?? '0')?.name || 'Unknown'"
      :productName="pData?.name || 'Unknown'"
    />
    <div v-if="loading" class="backdrop-blur-lg absolute -top-40 bottom-0 left-0 right-0 z-30"> </div>
    <div v-if="loading" class="bg-gray-100 rounded-xl p-16 py-12 center">
        <a-spin /> <span class="ml-2 text-gray-700">Loading...</span>
    </div>
    <div class="flex justify-center mt-10">
          <div class="flex flex-col space-y-2 overflow-scroll max-h-[500px]">
            <img :width="120"
            :src="(item && item?.length > 0) ? item : 'https://dummyimage.com/600x500/ccc/aaa'"
            class="cursor-pointer !border border-gray-200 rounded-xl"
            v-for="item in pData?.imgUrls" :key="item"
            @click="url=item "
            />
          </div>
          <div class="!p-5">
            <a-image
            :height="500"
            :width="700"
            :src="(url && url?.length > 0) ? url : 'https://dummyimage.com/600x500/ccc/aaa'"
            style="border:1px solid #E5E5E5; border-radius: 10px; object-fit: contain;"
          />
          </div>
    </div>
    <div class="flex pt-15 gap-x-10 min-h-96 px-10">
      <div class="w-2/3">
        <div class="flex gap-x-4 items-start">
          <h1 class="text-2xl">{{ pData?.name }}</h1>
          <RouterLink :to="{ name: 'product-list', query:{ categoryName: getCategory(pData?.categoryId??'0')?.name ,categoryId: pData?.categoryId}}">
            <a-tag :color="'#'+getCategory(pData?.categoryId??'0')?.color">
              <div class="!text-[15px] !px-4 !py-[5px]">
                {{ getCategory(pData?.categoryId??'0')?.name }}
              </div>
            </a-tag>
          </RouterLink>
        </div>

        <div class="text-gray-500 mt-7" v-html="pData?.description"></div>
        <div v-for="(tag) in pData?.tags" :key="tag" class="!inline-block mt-5">
            <a-tag style="margin: 5px; display: inline-block">
              # {{ tag }}
            </a-tag>
        </div>
      </div>
      <div class="w-1/3">
        <a-rate :value="pData?.raiting" disabled style="width: 120%; margin-bottom: 10px;"/>
        <h1 class="text-2xl">$ {{ pData?.price }}</h1>
        <a-button class="w-full !bg-gray-800 !text-white">
          <ShoppingOutlined :style="{ fontSize: '18px'}" />
          Add Cart
        </a-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .center {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999!important;
    transform: translate(-50%,-50%);
  }
</style>
<script setup lang="ts">
  import Breadcrumb from '@/components/Breadcrumb.vue';
  import type { ICategory } from '@/models/ICategory';
  import type { IProduct } from '@/models/IProduct';
  import { onMounted, ref, watch } from 'vue';
  import { getProduct, pLoading } from '@/services/productService';
  import { useRoute } from 'vue-router';
  import { categories } from '@/services/categoryService';

  const pData = ref<IProduct | undefined>()
  const cData = ref<ICategory[] | undefined>([])
  const route = useRoute();
  const url = ref("");
  const loading = ref(false);

  const mounted = async() => {
    pData.value = await getProduct(route.params.id.toString());
    cData.value = await categories();
    url.value = pData.value?.imgUrls[0] || "";
  };

  onMounted(async ()=>{
    await mounted()
  })

  watch(pLoading, (newVal) => {
    if(loading.value){
      setTimeout(() => {
      loading.value = newVal;
    }, 1000);
    }else{
      loading.value = newVal;
    }
  });
  watch(loading, (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  const getCategory = (id: string): ICategory => {
  const category =  {
    id: '',
    name: "Unknown",
    createdAt: Date.now(),
    color: "gray"
  };
  if (!Array.isArray(cData.value))  return category
  return cData.value.find(c => c.id === id) ?? category;
};
</script>
