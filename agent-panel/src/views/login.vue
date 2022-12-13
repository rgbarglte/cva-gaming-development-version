<template>
  <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
    <div class="container-fluid">
      <div class="header-body">
        <!-- Card stats -->
        <div class="row">

        </div>
      </div>
    </div>
  </div>
  
  <div  class="container-fluid mt--7">
    <div class="row justify-content-center">
      <div class="col-lg-4 col-md-4">
        <div class="card bg-secondary shadow border-0">
          <!-- <div class="card-header bg-transparent pb-5">
            <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
            <div class="btn-wrapper text-center">
              <a href="#" class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon"><img src="../assets/img/icons/common/github.svg"></span>
                <span class="btn-inner--text">Github</span>
              </a>
              <a href="#" class="btn btn-neutral btn-icon">
                <span class="btn-inner--icon"><img src="../assets/img/icons/common/google.svg"></span>
                <span class="btn-inner--text">Google</span>
              </a>
            </div>
          </div> -->
          <div class="card-body px-lg-5 py-lg-5">
            <div class="text-center text-muted mb-4">
              <img src="https://cva.poker/public/cdn/img/1.svg" class="img-fluid" data-v-0b6ea73a="" style="height: 120px;"/>
              <!-- <small>Or sign in with credentials</small> -->
            </div>
            <form role="form">
              <div class="form-group mb-3">
                <div class="input-group input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                  </div>
                  <input class="form-control" placeholder="Email" type="email" v-model="login.email">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group input-group-alternative">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                  </div>
                  <input class="form-control" placeholder="Password" type="password" v-model="login.password">
                </div>
              </div>
              <div class="custom-control custom-control-alternative custom-checkbox">
                <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                <label class="custom-control-label" for=" customCheckLogin">
                  <span class="text-muted">Recordarme</span>
                </label>
              </div>
              <div class="text-center">
                <button type="button" class="btn btn-primary my-4" @click.prevent="submitLogin()">Iniciar sesion</button>
              </div>
            </form>
          </div>
        </div>
        <!-- <div class="row mt-3">
          <div class="col-6">
            <a href="#" class="text-light"><small>Forgot password?</small></a>
          </div>
          <div class="col-6 text-right">
            <a href="#" class="text-light"><small>Create new account</small></a>
          </div>
        </div> -->
      </div>
    </div>
  </div>

</template>




<script>
import sdk from '@/sdk/bundle.js';

import { ElNotification } from 'element-plus'


export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      chat: {
        tager: null,
        chats: []
      },
      activeTabNewForm: 'Usuario',
      pagination: {
        activity: 0,
        brands: 0,
      },
      loading: {
        activity: true,
      },
      editBalance: {
        type: 'add',
        balance: 0,
        user: {}
      },
      activity: [],
      brands: [],
      forms: {
        user: {
          email: '',
          password: '',
          username: '',
          nickname: '',
          balance: 0,
          isAgent: false,
          automatically_settle: false,
          enabledAllBrands: true,
          brands: [],
          enabledAllGames: true,
          games: [],
          agent_data: {
            firstname: '',
            lastname: '',
            phone: '',
            dni: ''
          },
          profile: {
            firstname: '',
            lastname: '',
            address: '',
            city: '',
            country: '',
            zip: '',
            about: '',
          },
        }
      }
    };
  },
  created() {

  },
  methods: {

    submitLogin() {
      sdk.users.login(this.login.email, this.login.password).then(data => {
        if (data.error) {
          ElNotification({
            title: 'Iniciar sesion',
            message: "Contraseña o E-Mail erroneo.",
            position: 'bottom-right',
            duration: 2500,
          })
          localStorage.setItem("auth", false);
          return;
        }
        localStorage.setItem("auth", data.authToken);
        ElNotification({
          title: 'Iniciar sesion',
          message: "Gracias por iniciar sesion.",
          position: 'bottom-right',
          duration: 0,
        })
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500)
      })
    }
  },
};


</script>