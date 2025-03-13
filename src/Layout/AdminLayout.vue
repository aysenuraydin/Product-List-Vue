<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Navbar from '../components/Navbar.vue';
  import Footer from '../components/Footer.vue';
  import SideBar from '@/components/SideBar.vue';

</script>
<template>
  <Navbar/>
  <div class="py-10 pl-5 min-h-screen !pt-24 max-w-[70rem] mx-auto lg:flex gap-x-10">
    <div class="lg:!w-[12rem] mb-10 lg:mt-5"><SideBar></SideBar></div>
    <div class="lg:!w-[calc(100%-12rem)]"><RouterView /></div>
  </div>
  <Footer />
</template>
