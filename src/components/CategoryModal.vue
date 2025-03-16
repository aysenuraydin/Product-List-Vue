<template class="card flex justify-center border">
  <Dialog
      :visible="props.visible"
      @update:visible="emit('update:visible', $event)"
      pt:root:class="!border-0"
      pt:mask:class="backdrop-blur-sm !border"
      class="w-full sm:w-[35rem]"
      modal>
      <h3 class="text-2xl text-center">{{ data.id ? "Edit Product" : "Create Product" }} </h3>
      <a-form
        :model="data"
        name="basic"
        :label-col="{span: 4}"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
        @finish="requireConfirmation"
        @finishFailed="onFinishFailed"
        style="padding: 1rem;"
        layout="horizontal"
        :disabled="false"
      >
        <a-form-item
          label="Name"
          name="name"
          :rules="[{ required: true, message: 'Please input your name!' }]"
        >
          <a-input v-model:value="data.name" />
        </a-form-item>

        <a-form-item
          label="Color"
          name="color"
          :rules="[{ required: true, message: 'Please input your color!' }]"
        >
          <a-input v-model:value="data.color" :style="{
              backgroundColor: `#${data.color}99`,
              borderColor: `#${data.color}`
            }"/>
          <div class="md:scale-[205%] md:translate-[calc(53%)] md:h-[22rem] pt-1 scale-[175%] translate-[calc(38%)] h-[19rem]">
            <ColorPicker v-model="data.color" inline style="width: 100%;"/>
          </div>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4 }">
          <a-button type="primary" html-type="submit" class="!bg-gray-800 !border-none !outline-0 w-full">
            {{ data.id ? 'Update' : 'Create' }}
          </a-button>
        </a-form-item>
      </a-form>

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
                      <Button label="Save" style="background-color: black; border-style: none;" @click="submitForm(acceptCallback)"></Button>
                      <Button label="Cancel" style="border-color: black; color: black;" outlined @click="rejectCallback"></Button>
                  </div>
              </div>
          </template>
      </ConfirmDialog>
  </Dialog>
</template>
<script setup lang="ts">
  import { defineProps, defineEmits, reactive, watch } from 'vue';
  import Dialog from "primevue/dialog";
  import Button from "primevue/button";
  import ConfirmDialog from "primevue/confirmdialog";
  import { useConfirm } from "primevue/useconfirm";
  import { useToast } from "primevue/usetoast";
  import ColorPicker from 'primevue/colorpicker';
  import { addCategory, updateCategory } from '@/services/categoryService';

  const confirm = useConfirm();
  const toast = useToast();
  const emit = defineEmits(["update:visible"]);
  const data = reactive({
    id: '',
    name: '',
    color: "#ffffff",
    createdAt: 0,
  });
  const props = defineProps({
    visible: Boolean,
    editItem: Object
  });

  watch(
    () => props.editItem,
    (newValue) => {
      if (newValue) {
        Object.assign(data, {
          ...newValue
        });
      }
    },
    { immediate: true }
  );

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
  const submitForm = async(acceptCallback?: () => void) => {
    try {
      if(data.id!=""){
      await updateCategory(data)
    }
    else {
      data.createdAt= Date.now()+ Math.floor(Math.random() * 1000);
      await addCategory(data)
    };

      console.log("ürün eklendi");
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
    emit('update:visible', false);
    if (acceptCallback) {
        acceptCallback();
    }
  };
  const onFinishFailed = (errorInfo: void) => {
    console.log('Failed:', errorInfo);
  };
</script>
<style scoped>
  .p-dialog-close-button {
    border: 2px solid red !important;
  }
  .ant-form-item-required{
    border: 2px solid red !important;
  }
</style>


