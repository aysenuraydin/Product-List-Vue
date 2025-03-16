import { storage } from "../plugins/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from "nanoid";

export const uploadImageToFirebase = async (file: File): Promise<string> => {
  const fileRef = ref(storage, `uploads/${nanoid()}-${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};
