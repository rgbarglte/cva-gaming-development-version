 

<template> 
      <Navbar />
      <RouterView /> 
</template>


 


<style  >
body {
  background:#12171E;
  scrollbar-color: #555d6d #19202e;
	scrollbar-width: thin;
  font-family: 'Inter', sans-serif;

}
::-webkit-scrollbar-corner {
    background: #19202e !important;
}
::-webkit-scrollbar-thumb {
    border-radius: 2px !important;
    background: #555d6d !important;
}
::-webkit-scrollbar-track {
    border-radius: 0 !important;
}
::selection {
    background: #5a81ea !important;
}

label {
    display: inline-block;
    margin-bottom: .5rem;
    font-weight: 600;
    font-size: 0.9rem;
}
.btn-primary {
    height: 33px;
    text-align: center;
    background: #6100FF;
    border: 1px solid #6100FF;
    border-radius: 5px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-transform: uppercase;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    font-family: 'Inter', sans-serif;

}
.form-control {
  font-size:13px
}
p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 14px;
    color: #242424;
    font-family: 'Inter', sans-serif;

}

.btn-primary.disabled, .btn-primary:disabled {
    color: #fff;
    background-color: #898a8a;
    border-color: #959595;
}
.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    font-size: 13px;
    border: 1px solid #f7aaaa;
    background: #ffe8e8;
    color: #cb0000;
}
.alert-success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    font-size: 13px;
    border: 1px solid #63d5a3;
    background: #e1fff4;
    color: #079d17;
}
</style>







 
<script>

import { RouterLink, RouterView } from "vue-router"; 

import config from '@/assets/settings.js';
import Navbar from '@/components/navbar.vue';


export default {
  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        // if (to.meta.layout) {
        //   this.showLayout = true;
        // } else {
        //   this.showLayout = false;
        // }

        // if (to.meta.authAdmin) {
        //   this.AuthAdmin();
        // }
        // console.log(to, from);
      },
    },
  },
  components : {
    Navbar, 
  },
  data() {
    return { 
    };
  },
  created() {
    
     // this.checkAuth();
  },
  methods: {
    
  },
};
</script>
 












 