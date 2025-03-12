<script setup>
import { ref } from 'vue';
import Rating from 'primevue/rating';
import Tag from 'primevue/tag';
import ImageLorem from '@/components/ImageLorem.vue';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import Toast from "primevue/toast";
import ConfirmPopup from "primevue/confirmpopup";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import ProductModal from '@/components/ProductModal.vue';

const pageSize = ref(5);
const currentPage = ref(1);
const visible = ref(false);

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getSeverity = (stockAmount) =>
  stockAmount >= 10 ? "success" :
  stockAmount > 0 ? "warn" :
  stockAmount == 0 ? "danger" :
  null;


const columns = [
  { title: 'Id', dataIndex: 'id', key: 'id', fixed: 'left', width:60},
  { title: 'Image', width: 150, dataIndex: 'image', key: 'image', fixed: 'left' },
  { title: 'Full Name', dataIndex: 'name', key: 'name' },
  { title: 'Price', dataIndex: 'price', key: 'price' },
  { title: 'Rating', dataIndex: 'rating', key: 'rating' },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'is Confirmed', dataIndex: 'isConfirmed', key: 'isConfirmed' },
  { title: 'Stock Amount', dataIndex: 'stockAmount', key: 'stockAmount' },
  { title: 'Action', width: 150, key: 'operation', fixed: 'right' }
];


const data = [
    {
      id: 1,
      name: 'John Brown',
      price: 1200,
      rating:1,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate omnis praesentium sunt architecto enim. Corporis explicabo consequatur molestiae distinctio, natus impedit error vitae. Dolorum laboriosam beatae at delectus maxime molestiae deleniti facilis aspernatur quaerat dolor necessitatibus expedita, eum corrupti nobis soluta, nesciunt, ut impedit saepe magnam tempora! Voluptate, corrupti aspernatur.',
      categoryId: 1,
      category: "Electronics",
      isConfirmed: false,
      createdAt: "2021-09-01",
      stockAmount: 9,
      image: [
        { uid: '1', url: "https://dummyimage.com/600x500/ccc/aaa", name: "image-1" },
        { uid: '2', url: "https://dummyimage.com/600x700/ccc/bbb", name: "image-2" },
        { uid: '3', url: "https://dummyimage.com/600x700/ccc/ccc", name: "image-3" }
      ],
    },
    {
      id: 2,
      name: 'John Brown',
      price: 1200,
      rating:5,
      description: 'deneme',
      categoryId: 1,
      category: "Electronics",
      isConfirmed: false,
      createdAt: "2021-09-01",
      stockAmount: 0,
      image: [
        { uid: '1', url: "https://dummyimage.com/600x500/ccc/aaa", name: "image-1" },
        { uid: '2', url: "https://dummyimage.com/600x700/ccc/bbb", name: "image-2" },
        { uid: '3', url: "https://dummyimage.com/600x700/ccc/ccc", name: "image-3" }
      ],
    },
    {
      id: 3,
      name: 'John Brown',
      price: 1200,
      rating:5,
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
    },
    {
      id: 4,
      name: 'John Brown',
      price: 1200,
      rating:5,
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
    },
    {
      id: 5,
      name: 'John Brown',
      price: 1200,
      rating:5,
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
    },
    {
      id: 6,
      name: 'John Brown',
      price: 1200,
      rating:5,
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
    },
    {
      id: 7,
      name: 'John Brown',
      price: 1200,
      rating:5,
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
    },
  ];

const confirm = useConfirm();
const toast = useToast();

const confirm2 = (event) => {
  confirm.require({
      target: event.currentTarget,
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
          toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
      },
      reject: () => {
          toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
};

</script>
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
      :data-source="data"
      :rowKey="record => record.id"
      :scroll="{ x: 1500 }"
      :expand-column-width="50"
      :pagination="{
        current: currentPage.value,
        pageSize: pageSize.value,
        pageSizeOptions: [5, 10, 20, 50],
        showSizeChanger: true,
        showQuickJumper: true,
        total: data.length,
      }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'image'">
          <a-image
          v-if="record.image && record.image[0].url.length > 0"
          :width="100" :src="record?.image[0].url" :alt="record.name" style="width: 100px; height: 100%; object-fit: contain; border-radius: 8px;"/>
          <ImageLorem v-else :width="100" class="rounded"/>
        </template>
        <template v-else-if="column.key === 'price'">
          {{ formatCurrency(record.price) }}
        </template>
        <template v-else-if="column.key === 'rating'">
          <Rating :modelValue="record.rating" readonly />
        </template>
        <template v-else-if="column.key === 'isConfirmed'">
         <div class="text-center pr-10">
          <a-checkbox v-model:checked="record.isConfirmed" disabled style="scale:150%"/>
         </div>
        </template>
        <template v-else-if="column.key === 'stockAmount'">
          <Tag :value="record.stockAmount" :severity="getSeverity(record.stockAmount)" class="!w-28" />
        </template>
        <template v-else-if="column.key === 'operation'">
            <Toast />
            <ConfirmPopup></ConfirmPopup>
            <div class="card flex flex-wrap gap-2 justify-center">
                <a-button class="!w-full relative">
                  <EditOutlined class="!absolute left-5 top-2"/> Edit
                </a-button>
                <a-button class="!w-full !bg-gray-800 relative !border-none" @click="confirm2($event)" danger>
                  <DeleteOutlined class="!absolute left-5 top-2"/> Delete
                </a-button>
            </div>
        </template>
      </template>

      <template #expandedRowRender="{ record }">
        <div class="p-10">
        <div class="w-full overflow-scroll flex gap-3">
          <div v-for="(item, index) in record.image" :key="index">
            <a-image
            v-if="item?.url && item.url?.length > 0"
            :width="100" :src="item?.url" style="height: 100px; width: 100px; object-fit: cover; border-radius: 6px; border:1px solid #bcbcbc" />
            <ImageLorem v-else :width="100" class="rounded !border-gray-400"/>
          </div>
        </div>
          <p class="font-semibold my-3 !pt-5">
          {{
            new Date(record.createdAt).toISOString().replace("T", " ").substring(0, 19)
          }}
        </p>
        <p style="margin: 0">
          {{ record.description }}
        </p>
        </div>
      </template>
    </a-table>
  </div>
  <ProductModal :visible="visible" @update:visible="visible = $event" />
</template>


<style>
  .ant-pagination-options {
    width: auto !important;
  }
  .ant-select-dropdown {
    min-width: 100px !important;
  }
</style>
