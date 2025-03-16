<template>
  <a-upload
    list-type="picture-card"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :custom-request="handleUpload"
    :on-remove="handleRemove"
    multiple
  >
    <div v-if="fileList.length < 8">
      <plus-outlined />
      <div style="margin-top: 8px">Upload</div>
    </div>
  </a-upload>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import type { UploadProps, UploadFile } from "ant-design-vue";
import { uploadImageToFirebase } from "@/services/firebaseStorageService";
import { Modal } from "ant-design-vue";

const props = defineProps<{
  modelValue: string[];
}>();
const emit = defineEmits(["update:modelValue"]);

const fileList = ref<UploadFile[]>(props.modelValue.map((url, index) => ({
  uid: `${index}`,
  name: `image-${index}`,
  status: "done",
  url
})));

watch(() => props.modelValue, (newUrls) => {
  fileList.value = newUrls.map((url, index) => ({
    uid: `${index}`,
    name: `image-${index}`,
    status: "done",
    url
  }));
});

// Sadece belirli resim formatlarını kabul et
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  return ["image/jpeg", "image/png"].includes(file.type);
};

// Firebase'e resim yükleme
const handleUpload = async (options: any) => {
  const { file, onSuccess, onError } = options;
  try {
    const downloadURL = await uploadImageToFirebase(file);

    const updatedUrls = [...props.modelValue, downloadURL];
    emit("update:modelValue", updatedUrls);

    fileList.value.push({
      uid: `${file.uid}`,
      name: file.name,
      status: "done",
      url: downloadURL,
    });

    onSuccess();
  } catch (error) {
    console.log(error);
    onError();
  }
};

// **Resmi silme işlemi**
const handleRemove = (file: UploadFile) => {
  const updatedUrls = props.modelValue.filter((url) => url !== file.url);
  emit("update:modelValue", updatedUrls);

  fileList.value = fileList.value.filter((item) => item.uid !== file.uid);
};

// **Resim önizleme işlemi**
const handlePreview = (file: UploadFile) => {
  Modal.info({
    title: "Resim Önizleme",
    content: `<img src="${file.url}" style="width: 100%;" />`,
    okText: "Kapat",
  });
};
</script>
