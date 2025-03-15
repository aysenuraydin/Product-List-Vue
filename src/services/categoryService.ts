import type { ICategory } from "@/models/ICategory";
import axios from "axios";
import { ref } from "vue";

const API_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const categoryLoading = ref(false)

export const getCategories = async ()  :Promise<ICategory[] | undefined> => {
  categoryLoading.value=true;
  try {
    const response = await axios.get(`${API_URL}/categories.json`);
    return response.data
    ? Object.keys(response.data).map(key => {
        const product = { ...response.data[key] };
        product.id = key;
        return product;
      })
      .reverse()
    : [];
  } catch (error) {
    console.error("Ürünleri çekerken hata oluştu:", error);
  } finally {
    categoryLoading.value = false;
  }
};
export const categories = async ()  :Promise<ICategory[] | undefined> => {
  categoryLoading.value=true;
  try {
    const response = await axios.get(`${API_URL}/categories.json`);
    return response.data
    ? Object.keys(response.data).map(key => {
        const product = { ...response.data[key] };
        // product.id = key;
        return product;
      })
    : [];
  } catch (error) {
    console.error("Ürünleri çekerken hata oluştu:", error);
  } finally {
    categoryLoading.value = false;
  }
};
export const getCategory = async (id: string) :Promise<ICategory | undefined> => {
  categoryLoading.value=true;
  try {
    const response = await axios.get(`${API_URL}/categories/${id}.json`);
    return response.data;
  } catch (error) {
    console.error("Ürün bulunamadı:", error);
  } finally {
    categoryLoading.value = false;
  }
};
export const addCategory = async (product:ICategory) => {
  try {
    const response = await axios.post(`${API_URL}/categories.json`, product);
    console.log("Kategori eklendi:", response);
  } catch (error) {
    console.error("Kategori eklenirken hata oluştu:", error);
  }
};
export const updateCategory = async (updatedCategory: Partial<ICategory>) => {
  try {
    await axios.patch(`${API_URL}/categories/${updatedCategory.id}.json`, updatedCategory);
    console.log("Kategori güncellendi");
  } catch (error) {
    console.error("Kategori güncellenirken hata oluştu:", error);
  }
};
export const deleteCategory = async (id: string) => {
  console.log(id)
  try {
    await axios.delete(`${API_URL}/categories/${id}.json`);
    console.log("Kategori silindi");
  } catch (error) {
    console.error("Kategori silinirken hata oluştu:", error);
  }
};

