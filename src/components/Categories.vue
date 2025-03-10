<script lang="ts" setup>
import { h } from 'vue';
</script>
<template>
  <a-anchor
    class="w-inherit scale-110"
    :items="[
      {
        key: 'part-1 ',
        href: '#part-1',
        title: () => h('span', { style: 'color: red' }, 'Part 1 Part 1'),
      },
      {
        key: 'part-2',
        href: '#part-2',
        title: 'Part 2 Part 2',
      },
      {
        key: 'part-3',
        href: '#part-3',
        title: 'Part 3 Part 3',
      },
    ]"
  />
</template>


