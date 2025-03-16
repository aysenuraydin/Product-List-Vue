<template>
  <Toast />
  <ConfirmPopup />
  <component :is="layout">
    <Suspense>
    <router-view />
  </Suspense>
  </component>
</template>
<script setup lang="ts">
  import Toast from "primevue/toast";
  import ConfirmPopup from "primevue/confirmpopup";
  import { ref, watch, type Component } from 'vue'
  import { useRoute } from 'vue-router'
  import { defineAsyncComponent,markRaw } from 'vue'

  const route = useRoute();
  const layout = ref<Component | null>(null);

  watch(
    () => route.meta.layout,
    (layoutName) => {
      if (layoutName) {
        layout.value = markRaw(
          defineAsyncComponent(() => import(`@/layout/${layoutName}.vue`))
        )
      } else {
        layout.value = markRaw(
          defineAsyncComponent(() => import("@/layout/MainLayout.vue"))
        )
      }
    },
    { immediate: true }
  );
</script>
<style scoped></style>

