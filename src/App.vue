<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Toast from "primevue/toast";
  import ConfirmPopup from "primevue/confirmpopup";
</script>
<template>
  <Toast />
  <ConfirmPopup />
  <RouterView />
</template>
<style scoped> </style>
