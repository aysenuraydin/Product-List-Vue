<template>
  <div>
    <template v-for="(tag, index) in state.tags" :key="tag">
      <a-tag  :closable="true" @close="handleClose(tag)" style="margin: 5px;">
        {{ tag }}
      </a-tag>
    </template>

    <a-input
      v-if="state.inputVisible"
      ref="inputRef"
      v-model:value="state.inputValue"
      type="text"
      size="small"
      :style="{ width: '78px' }"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />

    <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
      <plus-outlined />
      New Tag
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, watch, defineProps } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

const props = defineProps<{ tags: string[] }>();

const state = reactive({
  tags: [...props.tags],
  inputVisible: false,
  inputValue: '',
});

const inputRef = ref<HTMLInputElement | null>(null);

watch(() => props.tags, (newTags) => {
  state.tags = [...newTags];
});

const handleClose = (removedTag: string) => {
  state.tags = state.tags.filter(tag => tag !== removedTag);
};

const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const handleInputConfirm = () => {
  const inputValue = state.inputValue.trim();
  if (inputValue && !state.tags.includes(inputValue)) {
    state.tags.push(inputValue);
  }
  state.inputVisible = false;
  state.inputValue = '';
};
</script>
