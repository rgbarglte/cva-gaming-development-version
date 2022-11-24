 
<template>
    <navBarTop  v-if="showLayout" style="    background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%) !important;
    z-index: 500;position:fixed;top:0;left:0;right:0;
}"/>
  <navBar v-if="showLayout" />
  <div class="main-content"  >



    <!-- Navbar -->
   
    <!-- End Navbar -->
    <!-- Header -->

    <RouterView />

  </div>



</template>

 

 



<style  >
 

html, body{min-height:100%;}
body{height:100vh;}
#app { 
    height: 100%;
    min-height: 100%;
    max-height: 100%;
 
}

.main-content { 
    height: 100%;
    min-height: 100%;
    max-height: 100%;
 
}

.bg-gradient-primary {
    background: linear-gradient(87deg, #5e72e4 0, #825ee4 100%) !important;
    background: #f3f3f3 !important;
}
</style>
 
<script>
// import config from '@/assets/settings.js';
import navBar from '@/components/nav-bar.vue';

import navBarTop from '@/components/nav-bar-top.vue';


export default {
  components: {
    navBar,
    navBarTop
  },

  watch: {
    $route: {
      deep: true,
      handler(to, from) {
        if (to.meta.layout) {
          this.showLayout = true;
        } else {
          this.showLayout = false;
        }

        if (to.meta.login) {
          this.class = {};
        }

        if (to.meta.authAdmin) {
          this.AuthAdmin();
        }
        console.log(to, from);
      },
    },
  },
  computed: {
    classSet() {
      this.showLayout = true;
    }
  },
  data() {
    return {
      showLoading: true,
      showLayout: true,
      auth: localStorage.getItem("auth"),
      endpoint: 'google.com',
      user: {},
      type: 0,
    };
  },
  created() {
    // this.checkAuth();
  },
  methods: {
    checkAuth() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: localStorage.getItem("auth"),
        }),
      };
      fetch(this.endpoint + "/api/customers/get/auth/admin", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error || data.error == 'not_found') {
            this.$toast.show("Eror de autenticacion.", {
              position: "bottom-right",
            });
            this.$router.push({ name: "login" });
            localStorage.removeItem("auth");
            return;
          }

          if (data.empty) {
            this.$toast.show("Eror de autenticacion.", {
              position: "bottom-right",
            });
            this.$router.push({ name: "login" });
            localStorage.removeItem("auth");
            return;
          }


        })

    },
    AuthAdmin() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: localStorage.getItem("auth"),
        }),
      };
      fetch(this.endpoint + "/api/customers/get/auth/admin", requestOptions)
        .then((response) => response.json())
        .then((data) => {


          if (data.empty) {
            this.$toast.show("Eror de autenticacion.", {
              position: "bottom-right",
            });
            this.$router.push({ name: "login" });
            localStorage.removeItem("auth");
          }

          this.user = data[0];
          this.type = data[0].data.type;

        });
    },
  },
};
</script>

<script setup>


import { RouterLink, RouterView } from "vue-router";


</script>




 