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
          <h2 class="!text-2xl font-bold text-center">
            {{isRegister? 'Register':'Login'}}
          </h2>
          <div class="inline-flex flex-col gap-2">
            <label for="username" class="font-semibold">Username</label>
            <InputText v-model="email" id="username" class="!border !p-2 w-80 outline-0"></InputText>
          </div>
          <div class="inline-flex flex-col gap-2">
            <label for="password" class="font-semibold">Password</label>
            <InputText v-model="password" id="password" class="!border !p-2  w-80 outline-0" type="password"></InputText>
          </div>
          <div class="flex items-center gap-4">
            <Button label="Cancel" @click="closeDialog" text class="!p-2 w-full !border !text-black !border-black/30 hover:!bg-black/10"></Button>
            <Button v-if="!isRegister" @click="handleLogin" text class="!p-2 w-full !text-black !border !border-black/30 hover:!bg-black/10">Sign In</Button>
            <Button v-else @click="handleRegister" text class="!p-2 w-full !text-black !border !border-black/30 hover:!bg-black/10">Register</Button>
          </div>
          <div>

            <div class="cursor-pointer text-sm m-1 mx-2">
              {{
              !isRegister
              ?"Don’t have an account? Sign up"
              :"Already have an account? Sign in"
            }}
            </div>
            <Button @click="isRegister=!isRegister" text class="!p-2 w-full !text-black !border !border-black/30 hover:!bg-black/10">
              {{ isRegister ? 'Sign In':'Register' }}
              </Button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
  import Dialog from "primevue/dialog";
  import InputText from "primevue/inputtext";
  import Button from "primevue/button";
  import { ref } from "vue";
  import { useToast } from "primevue/usetoast";
  import { useAuthStore } from "@/stores/useAuthStore";

  const props = defineProps({
    visible: Boolean
  });

  const authStore = useAuthStore();
  const toast = useToast();
  const isRegister = ref(false);
  const email = ref("");
  const password = ref("");
  const emit = defineEmits(["update:visible"]);

  const closeDialog = () => {
    emit("update:visible", false);
  };

  const handleLogin = async () => {
  try {
    console.log(email.value, password.value)
    await authStore.login(email.value, password.value);

    closeDialog();
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Login successful!', life: 3000 });
    } catch (err) {
      toast.add({ severity: 'error', summary: 'Alert', detail: 'Hata:' + err.message, life: 3000 });
    }
  };

  const handleRegister = async () => {
    try {
      closeDialog();
      await authStore.register(email.value, password.value);
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Register successful!', life: 3000 });
    } catch (err) {
      toast.add({ severity: 'error', summary: 'Alert', detail: 'Hata:,' + err.message, life: 3000 });
    }
  }
</script>
