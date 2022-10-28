import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
  

// window.ENDPOINT = 'http://localhost:4001';
// window.IMGPATH = 'http://localhost:4001/products';
 
const pinia = createPinia()
app.use(pinia)

import { usersAuthStore } from '@/stores/users.js';

usersAuthStore().start()
 



import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
 
app.use(ElementPlus)


app.use(router) 


app.mount("#app");
