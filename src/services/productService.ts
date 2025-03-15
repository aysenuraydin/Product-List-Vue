import type { IProduct } from "@/models/IProduct";
import axios from "axios";
import { ref } from "vue";

const API_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;
export const pLoading = ref(false)

export const getProducts = async ()  :Promise<IProduct[] | undefined> => {
  pLoading.value=true;
  try {
    const response = await axios.get(`${API_URL}/products.json`);
    return response.data
    ? Object.keys(response.data)
      .map(key => {
        const product = { ...response.data[key] };
        product.id = key;
        return product;
      })
      .reverse()
    : [];
  } catch (error) {
    console.error("Ürünleri çekerken hata oluştu:", error);
  } finally {
    pLoading.value = false;
  }
};
export const getProductsByCategory = async (id:string)  :Promise<IProduct[] | undefined> => {
  pLoading.value=true;
  try {
    const response = await axios.get(`${API_URL}/products.json`);
    const data = response.data
    ? Object.keys(response.data).map(key => {
        const product = { ...response.data[key] };
        product.id = key;
        return product;
      })
    : [];
    return (id=="")
        ? data
        : data.filter(i=>i.categoryId==id) ?? [];
  } catch (error) {
    console.error("Ürünleri çekerken hata oluştu:", error);
  } finally {
    pLoading.value = false;
  }
};
export const getProduct = async (id: string) :Promise<IProduct | undefined> => {
  pLoading.value=true;
  try {
    const response = await axios.get(`${API_URL}/products/${id}.json`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Ürün bulunamadı:", error);
  } finally {
    pLoading.value = false;
  }
};
export const addProduct = async (product:IProduct)=> {
  console.log(product)
  try {
    const response = await axios.post(`${API_URL}/products.json`, product);
    console.log("Ürün eklendi:", response.data);
  } catch (error) {
    console.error("Ürün eklenirken hata oluştu:", error);
  }
};
export const updateProduct = async (updatedProduct: Partial<IProduct>) => {
  try {
    await axios.patch(`${API_URL}/products/${updatedProduct.id}.json`, updatedProduct);
    console.log("Ürün güncellendi");
  } catch (error) {
    console.error("Ürün güncellenirken hata oluştu:", error);
  }
};
export const deleteProduct = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/products/${id}.json`);
    console.log("Ürün silindi");
  } catch (error) {
    console.error("Ürün silinirken hata oluştu:", error);
  }
};

