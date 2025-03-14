<template>
  <div class="card flex justify-center">
    <Dialog
      :visible="props.visible"
      @update:visible="emit('update:visible', $event)"
      pt:root:class="!border-0"
      pt:mask:class="backdrop-blur-sm"
    >
      <template #container>
        <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl border border-gray-200 shadow-2xl" >
          <h2 class="!text-2xl font-bold text-center">Login</h2>
          <div class="inline-flex flex-col gap-2">
            <label for="username" class="font-semibold">Username</label>
            <InputText id="username" class="!border !p-2 w-80 outline-0"></InputText>
          </div>
          <div class="inline-flex flex-col gap-2">
            <label for="password" class="font-semibold">Password</label>
            <InputText id="password" class="!border !p-2  w-80 outline-0" type="password"></InputText>
          </div>
          <div class="flex items-center gap-4">
            <Button label="Cancel" @click="closeDialog" text class="!p-2 w-full !border !text-black !border-black/30 hover:!bg-black/10"></Button>
            <Button label="Sign-In" @click="closeDialog" text class="!p-2 w-full !text-black !border !border-black/30 hover:!bg-black/10"></Button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
  import { defineProps, defineEmits } from 'vue';
  import Dialog from "primevue/dialog";
  import InputText from "primevue/inputtext";
  import Button from "primevue/button";

  const props = defineProps({
    visible: Boolean
  });

  const emit = defineEmits(["update:visible"]);

  const closeDialog = () => {
    emit("update:visible", false);
  };
</script>
