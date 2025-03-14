<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';

</script>
<template>
  <Navbar/>
  <div class="py-10 p-3 min-h-screen !pt-24 max-w-[70rem] mx-auto"><RouterView /></div>
  <Footer />
</template>
