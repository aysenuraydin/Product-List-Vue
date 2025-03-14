<template>
  <div>
    <template v-for="tag in state.tags" :key="tag">
      <a-tag :closable="true" @close="handleClose(tag)" style="margin: 5px;">
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
import { ref, reactive, nextTick, watch, defineProps, defineEmits } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

const props = defineProps<{ modelValue: string[] }>(); // v-model için modelValue tanımlandı
const emit = defineEmits(["update:modelValue"]);

const state = reactive({
  tags: [...props.modelValue],
  inputVisible: false,
  inputValue: '',
});

const inputRef = ref<HTMLInputElement | null>(null);

// props.modelValue değiştiğinde state.tags güncellenir
watch(() => props.modelValue, (newTags) => {
  state.tags = [...newTags];
});

const handleClose = (removedTag: string) => {
  state.tags = state.tags.filter(tag => tag !== removedTag);
  emit("update:modelValue", state.tags);
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
    emit("update:modelValue", state.tags);
  }
  state.inputVisible = false;
  state.inputValue = '';
};
</script>
