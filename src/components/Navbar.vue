<template>
  <header class="bg-gray-800 text-white fixed top-0 w-full z-50">
    <div class="flex justify-between items-center max-w-[70rem] px-4 py-3 mx-auto">
      <div>
        <RouterLink to="/" class="relative pl-5">
          <HomeOutlined class="!absolute left-0 top-0" />Home
        </RouterLink>


        <a-dropdown class="!bg-[#00000000] !border-none !text-white">
          <template #overlay>
            <a-menu>
                <RouterLink :to="{ name: 'product-list', query:{ categoryName:link.name, categoryId:link.id  }}"
                v-for="(link,index) in data" :key="index">
                  <a-menu-item>{{ link.name }}</a-menu-item>
                </RouterLink>
            </a-menu>
          </template>
          <a-button> Categories <DownOutlined /> </a-button>
        </a-dropdown>
      </div>
      <a-space wrap class="sm:mt-0 mt-3 pb-2">
        <div v-if="authStore.user" class="pt-2 mx-3">
          <p>{{ authStore.user.email?.split('@')[0] }}</p>
        </div>
        <a-button block  v-if="authStore.user?.email==adminEmail">
          <RouterLink to="/admin/product" class="relative pl-5">
            <UserOutlined class="!absolute left-0 top-0" />Admin Panel
          </RouterLink>
        </a-button>
        <a-button block>
          <RouterLink to="/cart" class="relative pl-4">
            <ShoppingCartOutlined class="!absolute left-0 top-0 scale-125"/>
          </RouterLink>
        </a-button>
        <Button
        v-if="!authStore.user"
        icon="pi pi-sign-in"
        @click="visible = true"
        class="!bg-white !text-black !border-none !outline-0"
        />
        <Button
        v-else
        icon="pi pi-sign-out"
        @click="authStore.logout();"
        class="!bg-white !text-black !border-none !outline-0"
        />
      </a-space>
    </div>
  </header>
  <LoginPopup :visible="visible" @update:visible="visible = $event" />
</template>
<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import { UserOutlined, DownOutlined, HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
  import { useAuthStore } from "@/stores/useAuthStore";
  import Button from "primevue/button";
  import LoginPopup from "./LoginPopup.vue";
  import { ref, watch, onMounted } from 'vue';
  import type { ICategory } from '@/models/ICategory';
  import { categories, categoryLoading } from '@/services/categoryService';

  const visible = ref(false);
  const data = ref<ICategory[] | undefined>([]);
  const loading = ref(false);
  const authStore = useAuthStore();
  const adminEmail= import.meta.env.VITE_FIREBASE_ADMIN_EMAIL|| ''

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
</script>
