<script setup lang="ts">
  import { defineProps, defineEmits, reactive, ref, watch, computed } from 'vue';
  import Dialog from "primevue/dialog";
  import Button from "primevue/button";
  import ConfirmDialog from "primevue/confirmdialog";
  import Toast from "primevue/toast";
  import { useConfirm } from "primevue/useconfirm";
  import { useToast } from "primevue/usetoast";
  import Editor from "primevue/editor";
  import { PlusOutlined } from '@ant-design/icons-vue';
  import Tags from './tags.vue';
  import { useCategoryStore } from '@/stores/CategoryStore';

  const categories = useCategoryStore();
  const previewVisible = ref(false);
  const previewImage = ref('');
  const previewTitle = ref('');
  const doc= ref(document);

  const data = reactive({
    id: 0,
    name: '',
    price: 0,
    description: '',
    categoryId: 0,
    raiting: 0,
    category: 'Select Category',
    isConfirmed: false,
    createdAt: 0,
    stockAmount: 0,
    tags: [],
    imgUrls: [],
  });

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

  const getCategories = () => {
    return categories.items?.map(c=> ({
      label: c.name,
      value: c.id,
      color:c.color
    }))
  };

  const getCategory = computed({
    get: () => {
      const category = categories.items.find(c => c.id === data.categoryId);
      return category
        ? category.id
        : null;
    },
    set: (val) => {
      data.categoryId = val ?? 0;
    }
  });

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

  watch(
    () => props.editItem,
    (newValue) => {
      if (newValue) {
        data.id= newValue.id;
        data.name= newValue.name;
        data.price= newValue.price;
        data.raiting= newValue.raiting;
        data.description= newValue.description;
        data.categoryId= newValue.categoryId;
        data.category= newValue.category;
        data.isConfirmed= newValue.isConfirmed;
        data.createdAt= newValue.createdAt;
        data.stockAmount= newValue.stockAmount;
        data.tags= newValue.tags?? [];
        data.imgUrls= newValue.imgUrls?? [];
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

  const submitForm = (acceptCallback?: () => void) => {
    console.log(data);
    emit('update:visible', false)
    if (acceptCallback) {
        acceptCallback();
    }

};
</script>

<template class="card flex justify-center border">
  <Dialog
  :visible="props.visible"
  @update:visible="emit('update:visible', $event)"
  pt:root:class="!border-0"
  pt:mask:class="backdrop-blur-sm !border"
  class="md:w-[43rem]"
  modal>

      <h3 class="text-2xl text-center">{{ data.id ? "Edit Product" : "Create Product" }}
      </h3>
      <form class="flex flex-col sm:flex-row">
        <div class="file-card p-3 min-w-32 sm:w-40 sm:max-h-[34rem] max-h-[8rem] overflow-scroll border border-gray-300 rounded-2xl sm:mx-5  scrollbar-hide">
          <a-upload
            v-model:file-list="fileList"
            list-type="picture-card"
          >
            <div v-if="fileList?.length < 8">
              <plus-outlined />
              <div style="margin-top: 8px">Upload</div>
            </div>
          </a-upload>
          <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>

        <div class="p-5 w-full mt-5 sm:mt-0">
          <div class="flex">
            <div class="pt-2 text-sm w-24">Name</div>
            <a-input v-model:value="data.name" placeholder="Name" />
          </div>
          <div class="flex">
            <div class="pt-4 text-sm w-24">Price</div>
            <a-input class="!mt-3" prefix="$" suffix="USD" v-model:value="data.price"/>
          </div>
          <div class="flex">
            <div class="pt-4 text-sm w-24">Stock</div>
            <a-input-number  v-model:value="data.stockAmount" :min="1" :max="100" class="!w-full !mt-3"/>
          </div>
          <div class="flex">
            <div class="pt-4 text-sm w-24">Category </div>
            <a-select
            v-model:value="getCategory"
            :options="getCategories()"
            :getPopupContainer="(triggerNode: HTMLElement) => triggerNode.parentNode" class="!w-full !mt-3">
            </a-select>
          </div>
          <div class="flex">
            <div class="pt-4 text-sm w-20">Confirm</div>
            <a-checkbox v-model:checked="data.isConfirmed" class="!mt-3"/>
          </div>
          <div class="flex !items-start">
            <div class="pt-4 text-sm w-24">Tags</div>
            <div class="!w-full !mt-3"> <Tags :tags="data.tags"/></div>
          </div>
          <div class="flex my-2" v-if="data.raiting">
            <div class="text-sm w-20">Raiting</div>
            <a-rate v-model:value="data.raiting" disabled/>
          </div>
          <div class="flex">
            <div class="pt-4 text-sm w-24">Description </div>
            <Editor v-model="data.description" editorStyle="height: 150px" class="!mt-3 w-full"/>
          </div>
          <div class="flex !space-x-1 !mt-4 pl-20">
              <Button @click="requireConfirmation()" :label="data.id ? 'Update' : 'Create'" class="!bg-gray-800 !border-none !outline-0 w-full"></Button>
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
                      <Button label="Save" @click="submitForm(acceptCallback)"></Button>
                      <Button label="Cancel" outlined @click="rejectCallback"></Button>
                  </div>
              </div>
          </template>
      </ConfirmDialog>
      <Toast />
  </Dialog>
</template>

<style scoped>
  .file-card {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  .file-card::-webkit-scrollbar {
    display: none !important;
  }
  .p-dialog.p-component {
  border: 2px solid red !important;
}
/* class="p-dialog p-component md:w-[43rem] !border-0" */
</style>
