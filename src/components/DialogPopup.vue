<script setup lang="ts">
  import { defineProps, defineEmits, reactive, ref } from 'vue';
  import Dialog from "primevue/dialog";
  // import FileUpload from 'primevue/fileupload';
  import Button from "primevue/button";
  import ConfirmDialog from "primevue/confirmdialog";
  import Toast from "primevue/toast";
  import { useConfirm } from "primevue/useconfirm";
  import { useToast } from "primevue/usetoast";
  import Editor from "primevue/editor";
  import { PlusOutlined } from '@ant-design/icons-vue';

  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');

  const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
  };

  const handlePreview = async (file: { url?: string }) => {
    if (!file.url) return;

    previewImage.value = file.url;
    previewVisible.value = true;
    previewTitle.value = file.url.substring(file.url.lastIndexOf('/') + 1);
  };

  const options = ref([
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ]);

  const props = defineProps({
    visible: Boolean
  });

  const data = reactive({
    id: 1,
    name: 'John Brown',
    price: 1200,
    description: 'deneme',
    categoryId: 1,
    category: "Electronics",
    isConfirmed: true,
    createdAt: "2021-09-01",
    stockAmount: 10,
    image: [
      { uid: '1', url: "https://dummyimage.com/600x500/ccc/aaa", name: "image-1" },
      { uid: '2', url: "https://dummyimage.com/600x700/ccc/bbb", name: "image-2" },
      { uid: '3', url: "https://dummyimage.com/600x700/ccc/ccc", name: "image-3" }
    ],
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
      class="lg:w-[40rem]"
      modal>
      <form class="flex flex-col sm:flex-row">
        <div class="card p-3 min-w-40 sm:w-40 sm:max-h-[34rem] max-h-[8rem] sm:overflow-scroll overflow-x-scroll border sm:border-none border-gray-300 rounded-2xl mx-5">

          <a-upload
            v-model:file-list="data.image"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            @preview="handlePreview"
          >
            <div v-if="data.image.length < 8">
              <plus-outlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </a-upload>

          <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel" class="!border">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>

        <div class="p-5 w-full mt-5 sm:mt-0">
          <div class="flex">
            <div class="pt-2 text-sm w-24">Name</div>
            <a-input v-model:value="data.name" placeholder="Basic usage" />
          </div>
          <div class="flex">
            <div class="pt-2 text-sm w-24">Price</div>
            <a-input class="!mt-3" prefix="$" suffix="USD" v-model:value="data.price"/>
          </div>
          <div class="flex">
            <div class="pt-2 text-sm w-24">Stock</div>
            <a-input-number  v-model:value="data.stockAmount" :min="1" :max="100" class="!w-full !mt-3"/>
          </div>
          <div class="flex">
            <div class="pt-2 text-sm w-24">Category </div>
            <a-select   v-model:value="data.category" :options="options" :getPopupContainer="(triggerNode: HTMLElement) => triggerNode.parentNode" class="!w-full !mt-3"></a-select>
          </div>
          <div class="flex">
            <div class="pt-2 text-sm w-20">Confirm</div>
            <a-checkbox v-model:checked="data.isConfirmed" class="!mt-3"/>
          </div>
          <div class="flex">
            <div class="pt-2 text-sm w-24">Description </div>
            <Editor v-model="data.description" editorStyle="height: 150px" class="!mt-3 w-full"/>
          </div>
            <div class="flex !space-x-1 !mt-4 pl-20">
                <Button @click="requireConfirmation()" label="Save" class="!bg-gray-800 !border-none !outline-0"></Button>
                <Button @click="requireConfirmation()" label="Save" class="!bg-gray-800 !border-none !outline-0"></Button>
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


