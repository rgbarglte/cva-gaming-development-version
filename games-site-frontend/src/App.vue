 

<template>

   
  <el-scrollbar max-height="100vh">
    <Navbar />
    <RouterView />
    <div style="    background: linear-gradient(89deg, rgb(5 14 25), #091626);
    position: relative;
    border-top: 1px solid #ffffff05;">

    <div class="container-fluid">
      <div class="row">



        <div class="col-md-6" style="padding:4rem">
          <div class="row">
            <div class="col-4" style="padding-top:30px;padding-bottom: 30px;">
              <a class="col-12" style="     height: 150px;
    background: rgb(19, 30, 44);
    width: 100%;
    border-radius: 5px;
    width: 100% !important;
    display: block;
    animation-name: example;
  animation-duration: 4s;"></a>
            </div>

            <div class="col-8"
              style="padding-top:30px;padding-bottom: 30px;font-size:12px;color:white;font-weight: 350;">
              Irure fugiat adipisicing pariatur elit qui esse est Lorem exercitation anim elit adipisicing tempor. Duis
              adipisicing sint quis id. Anim sit occaecat voluptate exercitation officia ullamco mollit incididunt qui
              occaecat minim ex. Irure voluptate nulla occaecat et est incididunt exercitation ex minim. Irure fugiat
              adipisicing pariatur elit qui esse est Lorem exercitation anim elit adipisicing tempor. Duis adipisicing
              sint quis id. Anim sit occaecat voluptate exercitation officia ullamco mollit incididunt qui occaecat
              minim ex. Irure voluptate nulla occaecat et est incididunt exercitation ex minim.
            </div>
          </div>
        </div>





        <div class="col-md-6" style="padding:4rem">
          <div class="row">
            <div class="col-4" style="padding-top:30px;padding-bottom: 30px;">
              <a class="col-12" style="     height: 150px;
    background: rgb(19, 30, 44);
    width: 100%;
    border-radius: 5px;
    width: 100% !important;
    display: block;
    animation-name: example;
  animation-duration: 4s;"></a>
            </div>

            <div class="col-8"
              style="padding-top:30px;padding-bottom: 30px;font-size:12px;color:white;font-weight: 350;">
              Irure fugiat adipisicing pariatur elit qui esse est Lorem exercitation anim elit adipisicing tempor. Duis
              adipisicing sint quis id. Anim sit occaecat voluptate exercitation officia ullamco mollit incididunt qui
              occaecat minim ex. Irure voluptate nulla occaecat et est incididunt exercitation ex minim. Irure fugiat
              adipisicing pariatur elit qui esse est Lorem exercitation anim elit adipisicing tempor. Duis adipisicing
              sint quis id. Anim sit occaecat voluptate exercitation officia ullamco mollit incididunt qui occaecat
              minim ex. Irure voluptate nulla occaecat et est incididunt exercitation ex minim.
            </div>
          </div>
        </div>


        <div class="col-12" style=" 
    color: white;
    font-size: 12px;
    color: white;
    opacity: 0.9;
 padding-bottom:15px;padding-top: 15px;background: #050f1b;">
          Eu nisi fugiat aliquip laboris eiusmod reprehenderit ut magna u nisi fugiat aliquip laboris eiusmod
          reprehenderit ut magna.
        </div>


      </div>
    </div>
  </div>

  </el-scrollbar>



  

  <!-- <div class="adv">
        Dolore dolore enim proident nulla nulla pariatur ea dolor minim fugiat. Non irure Lorem culpa ipsum reprehenderit laborum est incididunt. Et velit minim anim ex ex id adipisicing. Irure nulla sunt adipisicing deserunt veniam proident nisi velit cupidatat ullamco elit. Excepteur elit nulla sit et culpa aliqua.  Dolore dolore enim proident nulla nulla pariatur ea dolor minim fugiat. Non irure Lorem culpa ipsum reprehenderit laborum est incididunt. Et velit minim anim ex ex id adipisicing. Irure nulla sunt adipisicing deserunt veniam proident nisi velit cupidatat ullamco elit. Excepteur elit nulla sit et culpa aliqua.
      </div> -->
</template>




<style  >
html {
  overflow: hidden;
}
.el-table__body-wrapper {
  overflow: hidden;
  position: relative;
  background: #040910;
  color: white;
  border: none;
}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: rgb(255, 255, 255, 0.1);
  background: #050b13;
  color: white;
}

a:hover {
  color: white;
  opacity: 1;
  text-decoration: none;
}

a {
  opacity: 0.7;
  color: white;
}

.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  max-width: 200px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: transparent;
  color: var(--el-color-danger);
  color: white;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
}

body {
  background: #12171E;
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
  font-size: 13px !important;
}

.form-control:focus {
  color: #ffffff;
  background-color: #09131f;
  border-color: #2f6095;
  outline: 0;
  box-shadow: 0 0 20px #103057;
}

p {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 14px;
  color: #242424;
  font-family: 'Inter', sans-serif;

}

.btn-primary.disabled,
.btn-primary:disabled {
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



.section-top {
  background: linear-gradient(183deg, #050c14, transparent);
  height: 63px;
  box-shadow: #005eff 0px 0px 150px;
  border-top: 2px solid #0071ff;
  /* border-bottom: 2px solid #0071ff; */

}

.section-mid {
  height: auto;
  background: rgb(9 22 38);
}

.section-mid-left {
  background: linear-gradient(181deg, rgb(5 14 25), transparent);
  height: auto;
  position: sticky;
  padding-top: 30px;
  top: 0px;
  /* border-right: 2px solid #0071ff; */
}

.footer {
  background: #091626;
  position: relative;
  box-shadow: 0 0 50px #0072ff38;
  border-top: 2px solid #0071ff;
}

.navbar {
  background: rgb(9 22 38);

}

label {
  display: inline-block;
  margin-bottom: .5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: white;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #000;
  background-clip: padding-box;
  border: 1px solid #242a30;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.h2,
h2 {
  font-size: 2rem;
  color: white;
}

p {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 14px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
}

.modal-body {
  padding: 4rem;
  background: linear-gradient(181deg, rgb(20 33 48), black) !important;
  border: 2px solid #0068f6;
  box-shadow: 0 0 20px black;
  border-radius: 5px !important
}

.adv {
  position: fixed;
  bottom: 0;
  left: 0;
  rigth: 0;
  padding: 40px;
  background: linear-gradient(45deg, #363071, #8c00ff);
  color: white;
  z-index: 2000;
}

body {
  overflow-x: hidden !important;
}

html {
  overflow-x: hidden !important;
}

.navbar-footer-menu {
  text-decoration: none;
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar-footer-menu li {
  color: white;
  text-decoration: none;
  list-style: none;
  margin-bottom: 10px
}

.navbar-footer-menu li {
  color: white;
  text-decoration: none;
  list-style: none;
  font-size: 13px
}

.navbar-footer-menu li a {
  text-align: center;
}



















.title-menu-footer-r {
  color: white;
  display: block;
  margin-top: 15px;
  margin-bottom: 25px;
  text-align: right;
  font-weight: 600;
  text-transform: uppercase;
}



.navbar-footer-menu-r {
  text-decoration: none;
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: right;
}

.navbar-footer-menu-r li {
  color: white;
  text-decoration: none;
  list-style: none;
  text-align: right;
  margin-bottom: 10px
}

.navbar-footer-menu-r li {
  color: white;
  text-decoration: none;
  list-style: none;
  text-align: right;
  font-size: 13px
}

.navbar-footer-menu-r li a {
  text-align: center;
  text-align: right;
}






.title-menu-footer {
  color: white;
  display: block;
  margin-top: 15px;
  margin-bottom: 25px;
  font-weight: 600;
  text-transform: uppercase;
}





.modal-content {
  padding: 0 !important;
  background: transparent !important;
}

.el-notification { 
    background: #06101c  !important;
    color: white !important;
    box-shadow: 0 0 50px #0070fd  !important;
    border: 2px solid #0070fd  !important;
}
.el-notification__title { 
    color: white  !important;
}
</style>







 
<script>

import { RouterLink, RouterView } from "vue-router";

import config from '@/assets/settings.js';
import Navbar from '@/components/navbar.vue';
 
import { ElNotification } from 'element-plus'


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
  components: {
    Navbar,
  },
  data() {
    return {
      socket : null
    };
  },
  created() {
 
    ElNotification({
       title: 'Demo account',
       message: "Email : pruebaregistermodal@gmail.com - Password : 123",
       position: 'bottom-right',
       duration: 0,
    })

  },
  methods: {

  },
};
</script>
 












 