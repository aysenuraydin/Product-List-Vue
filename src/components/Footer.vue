<template>
  <div class="mt-5 sticky !top-full bg-gray-100 px-10">
        <div class="max-w-[70rem] px-4 pb-5 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
            <nav class="flex mt-10 flex-wrap justify-center -mx-5 -mb-1 gap-3">
                <RouterLink to="/" href="#"
                class="text-gray-400 hover:text-gray-500">
                    <Facebook />
                </RouterLink>
                <RouterLink to="/" href="#"
                class="text-gray-400 hover:text-gray-500">
                    <Instagram />
                </RouterLink>
                <RouterLink to="/" href="#" class="text-gray-400 hover:text-gray-500">
                    <Twitter />
                </RouterLink>
                <RouterLink to="/" href="#" class="text-gray-400 hover:text-gray-500">
                    <Github />
                </RouterLink>
            </nav>
            <p class="pt-3 text-sm leading-6 text-center text-gray-400">
                © 2025 AYŞENUR AYDIN
            </p>
        </div>
    </div>
</template>
<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import Facebook from  './icons/facebook.vue';
  import Instagram from './icons/instagram.vue';
  import Twitter from './icons/twitter.vue';
  import Github from './icons/github.vue';
</script>
<style>

</style>


