<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { UserOutlined, DownOutlined, HomeOutlined, ShoppingCartOutlined } from "@ant-design/icons-vue";
import Button from "primevue/button";
import LoginPopup from "./LoginPopup.vue";
import { useCategoryStore } from "@/stores/CategoryStore";

const visible = ref(false);
const querys = useCategoryStore();
</script>
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
                <RouterLink :to="{ name: 'product-list', query:{ query:link.name }}"
                v-for="(link,index) in querys.items" :key="index">
                  <a-menu-item>{{ link.name }}</a-menu-item>
                </RouterLink>
            </a-menu>
          </template>
          <a-button> Categories <DownOutlined /> </a-button>
        </a-dropdown>
      </div>
      <a-space wrap class="sm:mt-0 mt-3 pb-2">
        <a-button block v-if="true">
          <RouterLink to="/admin/product" class="relative pl-5">
            <UserOutlined class="!absolute left-0 top-0" />Admin Panel
          </RouterLink>
        </a-button>
        <a-button block v-if="true">
          <RouterLink to="/cart" class="relative pl-4">
            <ShoppingCartOutlined class="!absolute left-0 top-0 scale-125"/>
          </RouterLink>
        </a-button>
        <Button icon="pi pi-sign-in" @click="visible = true" class="!bg-white !text-black !border-none !outline-0"/>
      </a-space>
    </div>
  </header>
  <LoginPopup :visible="visible" @update:visible="visible = $event" />
</template>
