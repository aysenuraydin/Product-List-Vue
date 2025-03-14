<template >
  <div class="relative">
    <a-divider orientation="left" class="!text-2xl !pb-5">Products</a-divider>
    <div class="absolute -top-1 right-0">
      <a-button @click="visible = true" class="!p-4 !bg-gray-800 relative w-36 !text-white right-5">
      <PlusOutlined class="absolute left-3 bottom-2"/>
      <span class="absolute bottom-1 right-3"> Create Product </span>
    </a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="productStore.items"
      :rowKey="(record: any) => record.id"
      :scroll="{ x: 'max-content' }"
      :expand-column-width="50"
      :loading="loading"
      :pagination="{
        current: currentPage,
        pageSize: pageSize,
        pageSizeOptions: [5, 10, 20, 50],
        showSizeChanger: true,
        showQuickJumper: true,
        total: productStore.items?.length,
        onChange: changePagination,
        onShowSizeChange: changePaginationSize
        }"
    >
    <template #bodyCell="{ column, record }: { column: any, record: any }">
        <template v-if="column.key === 'image'">
          <a-image
          v-if="record.imgUrls && record.imgUrls[0]?.length > 0"
          :width="100"
          :src="(record?.imgUrls[0] && record?.imgUrls[0]?.length > 0) ? record?.imgUrls[0] : 'https://dummyimage.com/600x500/ccc/aaa'"
          :alt="record.name"
          style="width: 100px; height: 100%; object-fit: contain; border-radius: 8px;"/>
          <ImageLorem v-else :width="100" class="rounded"/>
        </template>
        <template v-else-if="column.key === 'price'">
          $ {{ record.price }}
        </template>
        <template v-else-if="column.key === 'categoryId'">
          <a-tag :color="'#'+getCategory(record.categoryId)?.color">
            <div class="!text-[15px] !px-4 !py-[5px]">
              {{ getCategory(record.categoryId)?.name }}
            </div>
          </a-tag>
        </template>
        <template v-else-if="column.key === 'raiting'">
          <a-rate :value="record.raiting" disabled style=" margin-bottom: 10px;"/>
        </template>
        <template v-else-if="column.key === 'isConfirmed'">
          <div class="text-center">
            <a-checkbox v-model:checked="record.isConfirmed" disabled style="scale:150%"/>
          </div>
        </template>
        <template v-else-if="column.key === 'stockAmount'">
          <Tag :value="record.stockAmount" :severity="getSeverity(record.stockAmount)" class="!w-16 !px-4 !py-[5px]" />
        </template>
        <template v-else-if="column.key === 'createdAt'">
          {{
            new Date(record.createdAt).toISOString().replace("T", " ").substring(0, 19)
          }}
        </template>
        <template v-else-if="column.key === 'operation'">
            <Toast />
            <ConfirmPopup></ConfirmPopup>
            <div class="card flex flex-wrap gap-2 justify-center">
                <a-button @click="openEditModal(record)"
                class="!w-full !bg-gray-800 relative !text-white !border-none">
                  <EditOutlined class="!absolute left-5 top-2"/> Edit
                </a-button>
                <a-button class="!w-full relative" @click="confirm2($event, record)" danger>
                  <DeleteOutlined class="!absolute left-5 top-2"/> Delete
                </a-button>
            </div>
        </template>
      </template>

      <template #expandedRowRender="{ record }">
        <div class="p-10">
        <div class="w-full overflow-scroll flex gap-3">
          <div v-for="(item, index) in record.imgUrls" :key="index">
            <a-image
            v-if="item && item?.length > 0"
              :width="100"
              :src="(item && item?.length > 0) ? item : 'https://dummyimage.com/600x500/ccc/aaa'"
              style="height: 100px; width: 100px; object-fit: cover; border-radius: 6px; border:1px solid #bcbcbc"
            />
            <ImageLorem v-else :width="100" class="rounded !border-gray-400"/>
          </div>
        </div>
          <p class="font-semibold my-3 !pt-5">
          {{
            new Date(record.createdAt).toISOString().replace("T", " ").substring(0, 19)
          }}
        </p>
        <p style="margin: 0" v-html="record.description"></p>
        <div v-for="(tag) in record.tags" :key="tag" class="!inline-block mt-5">
          <a-tag style="margin: 5px;">
            # {{ tag }}
          </a-tag>
        </div>
        </div>
      </template>
    </a-table>
  </div>
  <ProductModal
    :editItem="editItem"
    :visible="visible"
    @update:visible="visible = $event"
  />
</template>
<style>
  .ant-pagination-options {
    width: auto !important;
  }
  .ant-select-dropdown {
    min-width: 100px !important;
  }
</style>
<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Tag from 'primevue/tag';
  import ImageLorem from '@/components/ImageLorem.vue';
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import Toast from "primevue/toast";
  import ConfirmPopup from "primevue/confirmpopup";
  import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import ProductModal from '@/components/ProductModal.vue';
  import { useProductStore } from '@/stores/productStore';
  import { useCategoryStore } from '@/stores/categoryStore';
  import type { ICategory } from '@/models/ICategory';
  import type { IProduct } from '@/models/IProduct';

  const pageSize = ref(5);
  const currentPage = ref(1);
  const visible = ref(false);
  const loading = ref(false);
  const confirm = useConfirm();
  const toast = useToast();
  const productStore = useProductStore();
  const categoryStore = useCategoryStore();
  const editItem = ref<IProduct>({} as IProduct);

  const getSeverity = (stockAmount:number) :string  =>
    stockAmount >= 10 ? "success" :
    stockAmount > 0 ? "warn" :
    stockAmount == 0 ? "danger" : "";

  const columns = [
    { title: 'Image', width: 150, dataIndex: 'image', key: 'image', fixed: 'left' },
    { title: 'Full Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Raiting', dataIndex: 'raiting', key: 'raiting', width:200 },
    { title: 'Category', dataIndex: 'categoryId', key: 'categoryId' },
    { title: 'Confirm?', dataIndex: 'isConfirmed', key: 'isConfirmed', width:100  },
    { title: 'Stock Amount', dataIndex: 'stockAmount', key: 'stockAmount' },
    { title: 'CreatedAt', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', width: 150, key: 'operation', fixed: 'right' }
  ];
  const getCategory = (id: string): ICategory => {
    return categoryStore.items.find(c => c.id === id) ?? {
      id: '',
      name: "Unknown",
      createdAt: Date.now(),
      color: "gray"
    };
  };
  const confirm2 = (event: MouseEvent, item: IProduct) => {
    confirm.require({
        target: event.currentTarget as HTMLElement,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            productStore.deleteItem(item);
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
  };
  const changePagination = (page: number) => {
    currentPage.value = page;
  };
  const changePaginationSize = (current: number, size: number) => {
    pageSize.value = size;
    currentPage.value = 1;
  };
  const openEditModal = (item: IProduct) => {
    visible.value = true;
    editItem.value = { ...item };
  };
  watch(
    () => visible.value,
    (newVisible) => {
    if (!newVisible) {
        editItem.value = {
          id: '',
          name: '',
          price: 0,
          description: '',
          categoryId: '',
          raiting: 0,
          isConfirmed: true,
          createdAt: 0,
          stockAmount: 0,
          tags: [],
          imgUrls: [],
        }
      }
    },
    { immediate: true }
  );
</script>













