<template>
    <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
    <div class="container-fluid">
      <!-- Brand -->
      <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="./index.html">Dashboard</a>
      <!-- Form -->
      <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
        <div class="form-group mb-0">
          <div class="input-group input-group-alternative">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
            </div>

             

            <input class="form-control" placeholder="Search" type="text">
          </div>
        </div>
      </form>
      <!-- User -->
     
      <ul class="navbar-nav align-items-center d-none d-md-flex">
         
        <li class="nav-item">
          <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" :src="'https://ui-avatars.com/api/?background=ffffff&color=000&name=' + forms.user.username">
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                 {{forms.user.username}} 
              </div>
            </div>
          </a>
          <!-- <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Bienvenido!</h6>
            </div>
            <a href="#" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My perfil</span>
            </a>
            <a href="#" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Ajustes</span>
            </a>
            <a href="#" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Actividad</span>
            </a>
            <a href="#" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Soporte</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#!" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Cerrar sesion</span>
            </a>
          </div> -->
        </li>
        <li class="nav-item">
          <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.prevent="logout()">
            Cerrar sesion
          </a>
       </li>
      </ul>
    
    </div>
  </nav>
</template>




<style scoped>
 .el-card__body {
    background: transparent;
    border: transparent;
    max-height: 48px !important;
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
    margin: 0 !important;
}

.card-user {
     
    max-width: fit-content !important;
}

.el-loading-mask {
    position: absolute;
    z-index: 2000;
    background-color: rgb(128 96 228);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity var(--el-transition-duration);
}
</style>


<script>
import sdk from '@/sdk/bundle.js';

export default {
    data() {
        return {
            showDialog: false,
            deleteUserTarget: '',
            search: {
                user: '',
                date: '',
                target: '',
                type: '',
            },

            activeTabNewForm: 'Usuario',
            pagination: {
                users: 0,
                brands: 0,
            },
            loading: {
                widgetUser : true,
                users: true,
            },
            editBalance: {
                type: 'add',
                balance: 0,
                user: {}
            },
            users: [],
            brands: [],
            agents: [],
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
       this.init()
    }, 
    methods: { 
      logout() {
            localStorage.removeItem('auth')
            window.location.href = '/login';
        },

        init() {
            sdk.users.auth().then(data => {
              this.forms.user = data[0];
               
            })
        }  
    },
};


</script>