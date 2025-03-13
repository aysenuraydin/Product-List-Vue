<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import Toast from "primevue/toast";
  import ConfirmPopup from "primevue/confirmpopup";
  import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import { useCategoryStore } from '@/stores/CategoryStore';
  import type { ICategory } from '@/models/ICategory';
import CategoryModal from '@/components/CategoryModal.vue';

  const pageSize = ref(5);
  const currentPage = ref(1);
  const visible = ref(false);
  const loading = ref(false);
  const confirm = useConfirm();
  const toast = useToast();
  const data = useCategoryStore();
  const editItem = ref<ICategory>({} as ICategory);

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id', fixed: 'left', width:60},
    { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left'},
    { title: 'Color', dataIndex: 'color', key: 'color' },
    { title: 'CreatedAt', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', width: 150, key: 'operation', fixed: 'right'}
  ];

  const confirm2 = (event: MouseEvent) => {
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
  const openEditModal = (item: ICategory) => {
    visible.value = true;
    editItem.value = { ...item };
  };
  watch(
    () => visible.value,
    (newVisible) => {
    if (!newVisible) {
        editItem.value = {
          id: 0,
          name: '',
          color: '',
          createdAt: 0,
        }
      }
    },
    { immediate: true }
  );
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
      :data-source="data.items"
      :rowKey="(record:any) => record.id"
      :scroll="{ x: 100 }"
      :expand-column-width="50"
      :loading="loading"
      :pagination="{
        current: currentPage,
        pageSize: pageSize,
        pageSizeOptions: [5, 10, 20, 50],
        showSizeChanger: true,
        showQuickJumper: true,
        total: data.items?.length,
        onChange: changePagination,
        onShowSizeChange: changePaginationSize
        }"
    >
    <template #bodyCell="{ column, record }">
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
                <a-button @click="openEditModal(record)"
                class="!w-full !bg-gray-800 relative !text-white !border-none">
                  <EditOutlined class="!absolute left-5 top-2"/> Edit
                </a-button>
                <a-button class="!w-full relative" @click="confirm2($event)" danger>
                  <DeleteOutlined class="!absolute left-5 top-2"/> Delete
                </a-button>
            </div>
        </template>
      </template>

    </a-table>
  </div>
  <CategoryModal
    :editItem="editItem ?? undefined"
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
