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
        total: data?.length,
        onChange: changePagination,
        onShowSizeChange: changePaginationSize
        }"
    >
    <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'color'">
          <a-tag :color="'#'+record.color">
            <div class="!text-[12px] !px-2 !py-[4px]">
              # {{ record.color }}
            </div>
          </a-tag>
        </template>
        <template v-else-if="column.key === 'name'">
          <RouterLink :to="{ name: 'product-list', query:{ categoryName:record.name, categoryId:record.id  }}">
          <span class="underline text-gray-600"> {{ record.name }} </span>
          </RouterLink>
        </template>
        <template v-else-if="column.key === 'createdAt'">
          {{
            new Date(record.createdAt).toISOString().replace("T", " ").substring(0, 19)
          }}
        </template>
        <template v-else-if="column.key === 'operation'">
            <div class="card flex flex-wrap gap-2 justify-center">
                <a-button @click="openEditModal(record)"
                class="!w-full !bg-gray-800 relative !text-white !border-none">
                  <EditOutlined class="!absolute left-5 top-2"/> Edit
                </a-button>
                <a-button class="!w-full relative" @click="confirm2($event, record.id)" danger>
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
    @update:visible="changeVisible"
  />
</template>
<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import type { ICategory } from '@/models/ICategory';
  import CategoryModal from '@/components/CategoryModal.vue';
  import { categoryLoading, getCategories, deleteCategory } from '@/services/categoryService';

  const pageSize = ref(5);
  const currentPage = ref(1);
  const visible = ref(false);
  const confirm = useConfirm();
  const toast = useToast();
  const loading = ref(false);
  const data = ref<ICategory[] | undefined>([])
  const editItem = ref<ICategory>({} as ICategory);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left'},
    { title: 'Color', dataIndex: 'color', key: 'color' },
    { title: 'CreatedAt', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', width: 150, key: 'operation', fixed: 'right'}
  ];

  const confirm2 = (event: MouseEvent, item:string) => {
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
        accept: async() => {
            deleteCategory(item).then(()=> {
              mounted();
            });
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
  const changeVisible = async(value: boolean) => {
    visible.value = value;
    await mounted();
  };
  watch(
    () => visible.value,
    (newVisible) => {
    if (!newVisible) {
        editItem.value = {
          id: '',
          name: '',
          color: '',
          createdAt: 0,
        }
      }
    },
    { immediate: true }
  );
  onMounted(async () => {
    await mounted();
  });
  const mounted = async() => {
    data.value= await getCategories()
    loading.value = categoryLoading.value;
  }
  watch(categoryLoading, (newVal) => {
    loading.value = newVal;
  });
</script>
<style>
  .ant-pagination-options {
    width: auto !important;
  }
  .ant-select-dropdown {
    min-width: 100px !important;
  }
</style>
