<script setup>
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import Toast from "primevue/toast";
import ConfirmPopup from "primevue/confirmpopup";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import CategoryModal from '@/components/CategoryModal.vue';
const pageSize = ref(5);
const currentPage = ref(1);
const visible = ref(false);

const columns = [
  { title: 'Id', dataIndex: 'id', key: 'id', fixed: 'left', width:60},
  { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left'},
  { title: 'Color', dataIndex: 'color', key: 'color' },
  { title: 'CreatedAt', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', width: 150, key: 'operation', fixed: 'right'}
];

const data = [
  {
    id: 1,
    name: 'iMac',
    color: "#ef0000",
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
  },
  {
    id: 2,
    name: 'Macbook',
    color: "#ef0000",
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
  },
  {
    id: 3,
    name: 'iPad',
    color: "#ef0000",
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
  },
  {
    id: 4,
    name: 'iPhone',
    color: "#ef0000",
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
  },
  {
    id: 5,
    name: 'Watch',
    color: "#ef0000",
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
  },
  {
    id: 6,
    name: 'AirPods',
    color: "#ef0000",
    createdAt: Date.now()+ Math.floor(Math.random() * 1000),
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
    <a-divider orientation="left" class="!text-2xl !pb-5">Categories</a-divider>
    <div class="absolute -top-1 right-0">
      <a-button @click="visible = true" class="!p-4 !bg-gray-800 relative w-40 !text-white right-5">
      <PlusOutlined class="absolute left-3 bottom-2"/>
      <span class="absolute bottom-1 right-3"> Create Category </span>
    </a-button>
    </div>

    <a-table
      :columns="columns"
      :data-source="data"
      :rowKey="record => record.id"
      :scroll="{ x: 100 }"
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
        <template v-if="column.key === 'name'">
          <span class="bf-red-400">{{ record.name }}</span>
        </template>
        <template v-if="column.key === 'color'">
          <a-tag :color="record.color">{{ record.color }}</a-tag>
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
                <a-button class="!w-full relative">
                  <EditOutlined class="!absolute left-5 top-2"/> Edit
                </a-button>
                <a-button class="!w-full !bg-gray-800 relative !border-none" @click="confirm2($event)" danger>
                  <DeleteOutlined class="!absolute left-5 top-2"/> Delete
                </a-button>
            </div>
        </template>
      </template>
    </a-table>
  </div>
  <CategoryModal :visible="visible" @update:visible="visible = $event" />
</template>


<style>
  .ant-pagination-options {
    width: auto !important;
  }
  .ant-select-dropdown {
    min-width: 100px !important;
  }
</style>

