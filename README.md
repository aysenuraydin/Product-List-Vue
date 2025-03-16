# Product List

## Vue.js - Tailwind CSS Project with Firebase, Pinia, Axios, and Ant Design, and More

This project is a web application built using **Vue.js**, **Tailwind CSS**, **Firebase**, **Pinia**, **Axios**, and **Ant Design**. The application implements modern state management with Pinia, while Firebase is used for authentication and data storage.

## Project Overview

This project leverages the power of **Vue.js** to build interactive UIs, **Tailwind CSS** for efficient styling, and **Firebase** for backend services like authentication and cloud data storage. The state management is handled using **Pinia**, and **Axios** is used for making API requests. The UI components are built using **Ant Design**.

## Technologies Used

- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Tailwind** CSS: A utility-first CSS framework for rapid UI development.
- **Firebase**: Backend-as-a-Service (BaaS) for authentication and cloud data storage.
- **Pinia**: State management for Vue.js applications.
- **Axios**: Promise-based HTTP client for API calls.
- **Ant Design**: A UI framework with ready-to-use Vue components.

## Vue Features Used

1. **`ref and reactive`**

   - **Description**: Used to create reactive state variables..
   - **Example**:

     ```javascript
     import { ref } from "vue";

     const count = ref(0);
     const increment = () => count.value++;
     ```

2. **`Computed Properties`**

   - **Description**: Used for deriving state based on existing values.
   - **Example**:

     ```javascript
     import { ref, computed } from "vue";

     const price = ref(100);
     const tax = computed(() => price.value * 1.2);
     ```

3. **`Watchers`**

   - **Description**: Used to watch changes in state and execute functions accordingly.
   - **Example**:
     ```javascript
     import { ref, watch } from "vue";
     const name = ref("");
     watch(name, (newValue) => {
       console.log("Name changed to:", newValue);
     });
     ```

4. **`Lifecycle Hooks`**

   - **Description**: Used to run code at different stages of a component’s lifecycle.
   - **Example**:
     ```javascript
     import { onMounted } from "vue";
     onMounted(() => {
       console.log("Component mounted");
     });
     ```

## Firebase Integration

Firebase is used for authentication and cloud storage in this project. You can set up Firebase by following these steps:

1. Install Firebase SDK:

   ```bash
   npm install firebase
   ```

2. Configure Firebase in FirebaseConfig.js::

   ```javascript
   import { initializeApp } from "firebase/app";

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };

   const app = initializeApp(firebaseConfig);
   export default app;
   ```

## Pinia Integration

Pinia is used for managing the global state of the application.

1. Install Pinia::
   ```bash
   npm install pinia
   ```

## React Router Integration

React Router is used to navigate between different views. You can set up React Router by following these steps:

1. Install React Router SDK:

   ```bash
   npm install react-router-dom
   ```

2. Create a store (authStore.js):

   ```javascript
   import { defineStore } from "pinia";
   import { ref } from "vue";
   import { auth } from "@/plugins/FirebaseConfig";
   import {
     signInWithEmailAndPassword,
     createUserWithEmailAndPassword,
     signOut,
   } from "firebase/auth";

   export const useAuthStore = defineStore("auth", () => {
     const user = ref(null);

     const login = async (email, password) => {
       const response = await signInWithEmailAndPassword(auth, email, password);
       user.value = response.user;
     };

     const register = async (email, password) => {
       await createUserWithEmailAndPassword(auth, email, password);
     };

     const logout = async () => {
       await signOut(auth);
       user.value = null;
     };

     return { user, login, register, logout };
   });
   ```

## Axios Integration

Axios is used for handling HTTP requests.

1.           Install Axios:

    ```bash
    npm install axios
    ```

2.  Create an Axios instance (axiosInstance.js):

    ```javascript
    import axios from "axios";
    const api = axios.create({
      baseURL: "https://api.example.com",
      headers: { "Content-Type": "application/json" },
    });

    export default api;
    ```

## Ant Design Integration

UUID are used for generating unique IDs. You can set up UUID by following these steps:

1. Install UUID SDK:
   ```bash
   npm install ant-design-vue
   ```
2. Import Ant Design components in main.js::

   ```javascript
   import { createApp } from "vue";
   import App from "./App.vue";
   import Antd from "ant-design-vue";
   import "ant-design-vue/dist/antd.css";

   const app = createApp(App);
   app.use(Antd);
   app.mount("#app");
   ```

## NANOID Integration

nanoid are used for generating unique IDs. You can set up UUID by following these steps:

1. Install UUID SDK:

   ```bash
   npm install nanoid
   ```

## Tailwind CSS Integration

Tailwind CSS is a utility-first CSS framework.

1. Install Tailwind CSS::

   ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
   ```

2. Configure tailwind.config.js:
   ```javascript
   module.exports = {
     content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
     theme: { extend: {} },
     plugins: [],
   };
   ```
3. Configure tailwind.config.js:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

## Project Setup

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aysenuraydin/product-list.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd Product-List-Vue
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
