<template>
  <Toast />
  <ConfirmPopup />
  <component :is="layout">
    <RouterView />
  </component>
</template>
<script setup lang="ts">
  import Toast from "primevue/toast";
  import ConfirmPopup from "primevue/confirmpopup";
  import { ref, watch, type Component } from 'vue'
  import { useRoute } from 'vue-router'
  import { defineAsyncComponent } from 'vue'

  const route = useRoute();
  const layout = ref<Component | null>(null);

  watch(
    () => route.meta.layout,
    (layoutName) => {
      if (layoutName) {
        layout.value = defineAsyncComponent(() => import(`@/Layout/${layoutName}.vue`));
      } else {
        layout.value = defineAsyncComponent(() => import("@/Layout/MainLayout.vue"));
      }
    },
    { immediate: true }
  );
</script>
<style scoped></style>

