import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

import Toaster from "@meforma/vue-toaster";

 


import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

 
app.component('Datepicker', Datepicker);



import Toggle from "@vueform/toggle";
import "@vueform/toggle/themes/default.css";

 
app.component('Toggle', Toggle);


import VueApexCharts from "vue3-apexcharts";

 
app.use(VueApexCharts);

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

app.component('vSelect', vSelect);


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
 


 
import "./assets/js/plugins/@fortawesome/fontawesome-free/css/all.min.css"; 
import "./assets/js/plugins/nucleo/css/nucleo.css";
import "./assets/css/argon-dashboard.css?v=1.1.2";
 

app.use(ElementPlus)

// window.ENDPOINT = 'http://localhost:4001';
// window.IMGPATH = 'http://localhost:4001/products';

app.use(Toaster);
app.use(createPinia());
app.use(router);
  
app.mount("#app");
