<script setup lang="ts">
  import { defineProps, defineEmits, reactive, ref } from 'vue';
  import Dialog from "primevue/dialog";
  import Button from "primevue/button";
  import ConfirmDialog from "primevue/confirmdialog";
  import Toast from "primevue/toast";
  import { useConfirm } from "primevue/useconfirm";
  import { useToast } from "primevue/usetoast";
  import ColorPicker from 'primevue/colorpicker';


  const props = defineProps({
    visible: Boolean
  });

  const data = reactive({
    id: 1,
    name: 'iMac',
    color: "#ef0000",
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
  });

  const emit = defineEmits(["update:visible"]);

  const confirm = useConfirm();
  const toast = useToast();

  const requireConfirmation = () => {
  confirm.require({
      group: 'headless',
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
          toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
      },
      reject: () => {
          toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
  };
</script>

<template class="card flex justify-center border">
  <Dialog
      :visible="props.visible"
      @update:visible="emit('update:visible', $event)"
      pt:root:class="!border-0"
      pt:mask:class="backdrop-blur-sm !border"
      class="w-full sm:w-[35rem]"
      modal>
      <form class="flex flex-col sm:flex-row">
        <div class="p-5 w-full mt-5 sm:mt-0">
          <div class="flex">
            <div class="pt-2 text-sm w-24">Name</div>
            <a-input v-model:value="data.name" placeholder="Basic usage" />
          </div>
          <div class="flex mt-2">
            <div class="pt-2 text-sm w-24">Color</div>
            <div class="w-full">
              <a-input v-model:value="data.color" placeholder="Basic usage" />
              <div class="md:scale-[205%] md:translate-[calc(53%)] md:h-[22rem] pt-1 scale-[175%] translate-[calc(38%)] h-[19rem]"><ColorPicker v-model="data.color" inline style="width: 100%;"/></div>
              <!--  scale-[175%] translate-[calc(38%)] h-[19rem]-->
            </div>
          </div>
          <div class="flex !space-x-1 !mt-4 pl-20">
              <Button @click="requireConfirmation()" label="Save" class="!bg-gray-800 !border-none !outline-0 !w-1/2"></Button>
              <Button @click="requireConfirmation()" label="Save" class="!bg-gray-800 !border-none !outline-0 !w-1/2"></Button>
          </div>
          </div>
      </form>



      <ConfirmDialog group="headless">
          <template #container="{ message, acceptCallback, rejectCallback }">
              <div class="flex flex-col items-center p-10 bg-surface-0 dark:bg-surface-900 rounded">
                  <div class="rounded-full inline-flex justify-center items-center h-16 w-16 -mt-16"
                  style="background-color: black; color: white;">
                      <i class="pi pi-question text-5xl"></i>
                  </div>
                  <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                  <p class="mb-0">{{ message.message }}</p>
                  <div class="flex items-center gap-2 mt-6">
                      <Button label="Save" @click="acceptCallback"></Button>
                      <Button label="Cancel" outlined @click="rejectCallback"></Button>
                  </div>
              </div>
          </template>
      </ConfirmDialog>
      <Toast />
  </Dialog>
</template>

<style scoped>
  .p-dialog-close-button {
    border: 2px solid red !important;
  }
</style>


