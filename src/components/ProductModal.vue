<template class="card flex justify-center border">
  <Dialog
  :visible="props.visible"
  @update:visible="emit('update:visible', $event)"
  pt:root:class="!border-0"
  pt:mask:class="backdrop-blur-sm !border"
  class="md:w-[43rem]"
  modal>
      <h3 class="text-2xl text-center">
        {{ data.id ? "Edit Product" : "Create Product" }}
      </h3>
      <a-form
        :model="data"
        name="basic"
        :label-col="{span: 5}"
        :wrapper-col="{ span: 20 }"
        autocomplete="off"
        @finish="requireConfirmation"
        @finishFailed="onFinishFailed"
        style="padding: 0 1rem;"
        layout="horizontal"
        :disabled="false"
      >
      <div class="flex flex-col sm:flex-row">
        <div class="file-card p-3 min-w-32 sm:w-40 sm:max-h-[35rem] max-h-[8rem] overflow-scroll border border-gray-300 rounded-2xl sm:mx-5  scrollbar-hide">
          <UploadImage v-model="data.imgUrls" />
        </div>
        <div class="w-full">
          <a-form-item
          label="Name"
          name="name"
          :rules="[{ required: true, message: 'Please input your name!' }]">
            <a-input v-model:value="data.name" />
          </a-form-item>
          <a-form-item
            label="Price"
            name="price"
            :rules="[
              { required: true, message: 'Please input your price!' },
            ]">
            <a-input-number prefix="$" :min="1" class="!w-full"  v-model:value="data.price"/>
          </a-form-item>
          <a-form-item
            label="Stock"
            name="stockAmount"
            :rules="[
              { required: true, message: 'Please input your stock amount!' },
              { type: 'number', message: 'Must be a number!' },
              {
                validator: (_: any, value: number, callback: Function) => {
                  if (value < 1 || value > 1000) {
                    callback(new Error('Stock must be between 1 and 1000!'));
                  } else {
                    callback();
                  }
                }
              }
            ]"
          >
            <a-input-number v-model:value="data.stockAmount" :min="1" :max="1000" class="!w-full"/>
          </a-form-item>
          <a-form-item
            label="Category"
            name="category"
            :rules="[
              {
                validator: (_: any, value: any, callback: Function) => {
                  if (!isSelected) {
                    callback(new Error('Category must selected!'));
                  } else {
                    callback();
                  }
                }
              }
            ]">
          <a-select
          v-model:value="data.categoryId"
          :options="cData"
          :getPopupContainer="(triggerNode: HTMLElement) => triggerNode.parentNode" class="!w-full !border-3  rounded-lg"
          :style="{borderColor:color}"
          >
          </a-select>
          </a-form-item>
          <a-form-item
            label="Confirm"
            name="confirm">
            <a-checkbox v-model:checked="data.isConfirmed"/>
          </a-form-item>
          <a-form-item
            label="Tags"
            name="tags">
          <Tags v-model:modelValue="data.tags"/>
        </a-form-item>
          <a-form-item
            v-if="data.raiting"
            label="Raiting"
            name="raiting">
          <a-rate v-model:value="data.raiting" disabled/>
        </a-form-item>
        <a-form-item
            label="Description"
            name="description"
            :rules="[{ required: true, message: 'Please input your description!' },
            { min: 10, max:1500, message: 'Description must be between 10 and 1000!' }
            ]">
          <Editor v-model="data.description" editorStyle="height: 150px" class="w-full"/>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 5 }">
          <a-button type="primary" html-type="submit" class="!bg-gray-800 !border-none !outline-0 w-full">
            {{ data.id ? 'Update' : 'Create' }}
          </a-button>
        </a-form-item>
        </div>
      </div>
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
<style>
  /* .ant-select-selector {
    background-color: red !important;
  } */
</style>
<script setup lang="ts">
  import { reactive, ref, watch, onMounted } from 'vue';
  import Dialog from "primevue/dialog";
  import Button from "primevue/button";
  import ConfirmDialog from "primevue/confirmdialog";
  import { useConfirm } from "primevue/useconfirm";
  import { useToast } from "primevue/usetoast";
  import Editor from "primevue/editor";
  import { PlusOutlined } from '@ant-design/icons-vue';
  import Tags from './Tags.vue';
  import { addProduct, updateProduct } from '@/services/productService';
  import type { IProduct } from '@/models/IProduct';
  import { categories } from '@/services/categoryService';
  import UploadImage from './UploadImage.vue'

  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');
  const isSelected = ref(false);
  const color = ref('#ffffff');

  const data = reactive<IProduct>({
    id: '',
    name: '',
    price: 0,
    description: '',
    categoryId: '' ,
    raiting: 4,
    isConfirmed: false,
    createdAt: 0,
    stockAmount: 0,
    tags: [],
    imgUrls: [],
  });
  const cData = ref<{ label: string; value: string; color: string }[]>([]);

  const fileList = ref(
    data.imgUrls?.map((img, index) => ({
        uid: String(index),
        name: `image-${index}.png`,
        status: "done",
        url: typeof img === 'string' ? img : img,
      }))
  );

  const props = defineProps({
    visible: Boolean,
    editItem: Object
  });

  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
  };
  watch(
    () => data.categoryId,
    (newValue) => {
      if (newValue) {
        isSelected.value=true;
      }
      const category = cData.value.find(i=>i.value==data.categoryId);

      color.value=(category?.color==undefined)
                  ? color.value= '#fff'
                :'#'+category?.color;
    },
    { immediate: true }
  );
  watch(
    () => props.editItem,
    (newValue) => {
      if (newValue) {
        Object.assign(data, {
          ...newValue,
          tags: newValue.tags ?? [],
          imgUrls: newValue.imgUrls ?? [],
        });
      }
    },
    { immediate: true }
  );
  watch(
    () => data.imgUrls,
    (newImages) => {
      fileList.value = newImages?.map((img, index) => ({
        uid: String(index),
        name: `image-${index}.png`,
        status: "done",
        url: typeof img === 'string' ? img : img,
      }));
    },
    { deep: true, immediate: true }
  );

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

  const submitForm = async(acceptCallback?: () => void) => {
    await submitProduct()
    emit('update:visible', false)
    if (acceptCallback) {
        acceptCallback();
    }
  };
  const onFinishFailed = (errorInfo: void) => {
    console.log('Failed:', errorInfo);
  };


  onMounted(async () => {
    await mounted();
  });
  const mounted = async () => {
    const c = await categories() ?? [];

    cData.value = c.map(c => ({
      label: c.name,
        value: c.id,
        color:c.color
    }));
  };

  const submitProduct = async () => {
    try {
      if(data.id!=""){
        await updateProduct(data)
      }
      else {
        data.raiting=0;
        data.createdAt= Date.now()+ Math.floor(Math.random() * 1000);
        await addProduct(data);
      }
      console.log("ürün eklendi");
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };
</script>
