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
import DialogPopup from '@/components/DialogPopup.vue';

const pageSize = ref(5);
const currentPage = ref(1);
const visible = ref(false);

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success';
    case 'LOWSTOCK':
      return 'warn';
    case 'OUTOFSTOCK':
      return 'danger';
    default:
      return null;
  }
};

const columns = [
  { title: 'Image', width: 150, dataIndex: 'image', key: 'image', fixed: 'left' },
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name' },
  { title: 'Price', dataIndex: 'price', key: 'price' },
  { title: 'Category', dataIndex: 'category', key: 'category' },
  { title: 'Rating', dataIndex: 'rating', key: 'rating' },
  { title: 'Status', dataIndex: 'inventoryStatus', key: 'status' },
  { title: 'Column 1', dataIndex: 'column1', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'column2', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'column3', key: '3', width: 150 },
  { title: 'Action', width: 150, key: 'operation', fixed: 'right' }
];

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    column1: 'New York No. 1 Lake Park',
    column2: 'Column 2 Data',
    column3: 'Column 3 Data',
    price: 1200,
    category: "Electronics",
    image: [
      "https://dummyimage.com/600x700/ccc/aaa",
      "https://dummyimage.com/600x700/ccc/bbb",
      "https://dummyimage.com/600x700/ccc/ccc"
    ],
    rating: 4,
    inventoryStatus: "INSTOCK",
    description: 'My name is John Brown, I am 32 years old.'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    column1: 'London No. 1 Lake Park',
    column2: 'Column 2 Data',
    column3: 'Column 3 Data',
    price: 800,
    category: "Electronics",
    image: [
      "https://dummyimage.com/600x700/ccc/bbb",
      "https://dummyimage.com/600x700/ccc/ccc"
    ],
    rating: 5,
    inventoryStatus: "LOWSTOCK",
    description: 'My name is Jim Green, I am 42 years old.'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    column1: 'Sidney No. 1 Lake Park',
    column2: 'Column 2 Data',
    column3: 'Column 3 Data',
    price: 900,
    category: "Electronics",
    rating: 3,
    inventoryStatus: "OUTOFSTOCK",
    description: 'My name is Joe Black, I am 32 years old.'
  },
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    column1: 'New York No. 1 Lake Park',
    column2: 'Column 2 Data',
    column3: 'Column 3 Data',
    price: 1200,
    category: "Electronics",
    image: [
      "https://dummyimage.com/600x700/ccc/aaa",
      "https://dummyimage.com/600x700/ccc/bbb",
      "https://dummyimage.com/600x700/ccc/ccc"
    ],
    rating: 4,
    inventoryStatus: "INSTOCK",
    description: 'My name is John Brown, I am 32 years old.'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    column1: 'London No. 1 Lake Park',
    column2: 'Column 2 Data',
    column3: 'Column 3 Data',
    price: 800,
    category: "Electronics",
    image: [ "https://dummyimage.com/600x500/ccc/aaa"],
    rating: 5,
    inventoryStatus: "LOWSTOCK",
    description: 'My name is Jim Green, I am 42 years old.'
  },
  {
    key: 3,
    name: 'Joe Black',
    age: 32,
    column1: 'Sidney No. 1 Lake Park',
    column2: 'Column 2 Data',
    column3: 'Column 3 Data',
    price: 900,
    category: "Electronics",
    image: [ ""],
    rating: 3,
    inventoryStatus: "OUTOFSTOCK",
    description: 'My name is Joe Black, I am 32 years old.'
  }
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
    <a-divider orientation="left" class="!text-2xl !pb-5">Admin Panel</a-divider>
    <div class="absolute -top-1 right-0">
      <a-button @click="visible = true" class="!p-4 !bg-gray-800 relative w-36 !text-white right-5">
      <PlusOutlined class="absolute left-3 bottom-2"/>
      <span class="absolute bottom-1 right-3"> Create Product </span>
    </a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="data"
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
          v-if="record.image && record.image[0].length > 0"
          :width="100" :src="record?.image[0]" :alt="record.name" style="width: 100px; height: 100%; object-fit: contain; border-radius: 8px;"/>
          <ImageLorem v-else :width="100" class="rounded"/>
        </template>
        <template v-else-if="column.key === 'price'">
          {{ formatCurrency(record.price) }}
        </template>
        <template v-else-if="column.key === 'rating'">
          <Rating :modelValue="record.rating" readonly />
        </template>
        <template v-else-if="column.key === 'status'">
          <Tag :value="record.inventoryStatus" :severity="getSeverity(record)" class="!w-28" />
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
        <p style="margin: 0">
          {{ record.description }}
        </p>
      </template>

      <template #expandColumnTitle>
        <span style="color: red"></span>
      </template>
    </a-table>
  </div>
  <DialogPopup :visible="visible" @update:visible="visible = $event" />
</template>


<style>
  .ant-pagination-options {
    width: auto !important;
  }
  .ant-select-dropdown {
    min-width: 100px !important;
  }
</style>








