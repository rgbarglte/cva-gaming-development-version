<template>
     <!-- Header -->
     <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 600px; background-image: url(../assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <!-- Mask -->
      <span class="mask bg-gradient-default opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello Jesse</h1>
            <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
            <a href="#!" class="btn btn-info">Edit profile</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Page content -->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img src="../assets/img/theme/team-4-800x800.jpg" class="rounded-circle">
                  </a>
                </div>
              </div>
            </div>
            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                <a href="#" class="btn btn-sm btn-default float-right">Message</a>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">22</span>
                      <span class="description">Friends</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>
                  Jessica Jones<span class="font-weight-light">, 27</span>
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Bucharest, Romania
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer Science
                </div>
                <hr class="my-4" />
                <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                <a href="#">Show more</a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-8 order-xl-1">
          <div class="card bg-secondary shadow">
            <div class="card-header bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Editar usuario</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Guardar cambios</a>
                </div>
              </div>
            </div>
            
            <div class="card-body">
              <form>
                <h6 class="heading-small text-muted mb-4">Informacion del usuario</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-username">Nombre de usuario</label>
                        <input type="text" id="input-username" class="form-control form-control-alternative" placeholder="Username" v-model="forms.user.username" >
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-email">E-Mail</label>
                        <input type="email" id="input-email" class="form-control form-control-alternative" placeholder="jesse@example.com" v-model="forms.user.email" >
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-first-name">Nombre</label>
                        <input type="text" id="input-first-name" class="form-control form-control-alternative" placeholder="First name"  v-model="forms.user.profile.firstname" >
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-last-name">Apellido</label>
                        <input type="text" id="input-last-name" class="form-control form-control-alternative" placeholder="Last name" v-model="forms.user.profile.lastname">
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Address -->
                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <label class="form-control-label" for="input-address">Direccion</label>
                        <input id="input-address" class="form-control form-control-alternative" placeholder="Home Address" v-model="forms.user.profile.address"  type="text">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label" for="input-city">Ciudad</label>
                        <input type="text" id="input-city" class="form-control form-control-alternative" placeholder="City" v-model="forms.user.profile.city" >
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label" for="input-country">Pais</label>
                        <input type="text" id="input-country" class="form-control form-control-alternative" placeholder="Country" v-model="forms.user.profile.country"  >
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label" for="input-country">Codigo postal</label>
                        <input type="number" id="input-postal-code" class="form-control form-control-alternative" placeholder="Postal code" v-model="forms.user.profile.zip" >
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Description -->
                <h6 class="heading-small text-muted mb-4">About me</h6>
                <div class="pl-lg-4">
                  <div class="form-group">
                    <label>Sobre mi</label>
                    <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">{{forms.user.profile.about}}</textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <footer class="footer">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              &copy; 2018 <a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">Creative Tim</a>
            </div>
          </div>
          <div class="col-xl-6">
            <ul class="nav nav-footer justify-content-center justify-content-xl-end">
              <li class="nav-item">
                <a href="https://www.creative-tim.com" class="nav-link" target="_blank">Creative Tim</a>
              </li>
              <li class="nav-item">
                <a href="https://www.creative-tim.com/presentation" class="nav-link" target="_blank">About Us</a>
              </li>
              <li class="nav-item">
                <a href="http://blog.creative-tim.com" class="nav-link" target="_blank">Blog</a>
              </li>
              <li class="nav-item">
                <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" class="nav-link" target="_blank">MIT License</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
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
    sdk.users.get(this.$route.params.id).then(response => {
      // alert(JSON.stringify(response));
      this.forms.user = response[0];
    })
  },
  methods: {

    // submitLogin() {
    //   sdk.users.login(this.login.email, this.login.password).then(data => {
    //     if (data.error) {
    //       ElNotification({
    //         title: 'Iniciar sesion',
    //         message: "Contraseña o E-Mail erroneo.",
    //         position: 'bottom-right',
    //         duration: 0,
    //       })
    //       localStorage.setItem("auth", false);
    //       return;
    //     }
    //     localStorage.setItem("auth", data.authToken);
    //     ElNotification({
    //       title: 'Iniciar sesion',
    //       message: "Gracias por iniciar sesion.",
    //       position: 'bottom-right',
    //       duration: 0,
    //     })
    //     setTimeout(() => {
    //       window.location.href = '/jugadores';
    //     }, 1500)
    //   })
    // }
  },
};


</script>