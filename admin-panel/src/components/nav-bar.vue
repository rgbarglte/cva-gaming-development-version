<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
      <!-- Toggler -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Brand -->
      <a class="navbar-brand pt-0" href="./index.html">
        <img src="https://via.placeholder.com/150" class="navbar-brand-img" alt="...">
      </a>
      <!-- User -->
      <ul class="nav align-items-center d-md-none">
        <li class="nav-item dropdown">
          <a class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="ni ni-bell-55"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right" aria-labelledby="navbar-default_dropdown_1">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" src="https://via.placeholder.com/150">
              </span>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <a href="./examples/profile.html" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </a>
            <a href="./examples/profile.html" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </a>
            <a href="./examples/profile.html" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </a>
            <a href="./examples/profile.html" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#!" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </div>
        </li>
      </ul>
      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="sidenav-collapse-main">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <a href="./index.html">
                <img src="https://via.placeholder.com/150">
              </a>
            </div>
            <div class="col-6 collapse-close">
              <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-4 mb-3 d-md-none">
          <div class="input-group input-group-rounded input-group-merge">
            <input type="search" class="form-control form-control-rounded form-control-prepended" placeholder="Search" aria-label="Search">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="fa fa-search"></span>
              </div>
            </div>
          </div>
        </form>
        <!-- Navigation -->
        <ul class="navbar-nav">
          <li class="nav-item  "> 
            <RouterLink class="nav-link" to="/dashboard"> <i class="ni ni-tv-2 text-primary"></i> Tablero <span class="badge badge-dot mr-4"><i class="bg-info"></i></span></RouterLink> 
          </li>


          <li class="nav-item  "> 
            <RouterLink class="nav-link" to="/movimientos"> <i class="ni ni-tv-2 text-primary"></i> Movimientos</RouterLink> 
          </li>


          <li class="nav-item  "> 
            <RouterLink class="nav-link" to="/jugadores"> <i class="ni ni-tv-2 text-primary"></i> Jugadores </RouterLink> 
          </li>

          <li class="nav-item  " v-if="(forms.user.isAgent == false)"> 
            <RouterLink class="nav-link" to="/agentes"> <i class="ni ni-tv-2 text-primary"></i> Agentes</RouterLink> 
          </li>



          <li class="nav-item  " v-if="(forms.user.isAgent == false)"> 
            <RouterLink class="nav-link" to="/juegos/categorias"> <i class="ni ni-tv-2 text-primary"></i> Categorias de juegos</RouterLink> 
          </li>




          <li class="nav-item  " v-if="(forms.user.isAgent == false)"> 
            <RouterLink class="nav-link" to="/juegos/marcas"> <i class="ni ni-tv-2 text-primary"></i> Marcas de juegos</RouterLink> 
          </li>


          <li class="nav-item    "> 
            <RouterLink class="nav-link" to="/log/ip"> <i class="ni ni-tv-2 text-primary"></i> Registros ip</RouterLink> 
          </li>



           



          <li class="nav-item"> 
            <RouterLink class="nav-link" to="/chat"> <i class="ni ni-tv-2 text-primary"></i> Chat</RouterLink> 
          </li>



           


          <!-- <li class="nav-item    "> 
            <RouterLink class="nav-link" to="/crm"> <i class="ni ni-tv-2 text-primary"></i> Crm <span class="badge badge-dot mr-4"><i class="bg-warning"></i></span></RouterLink> 
          </li> -->



          <!-- <li class="nav-item  active "> 
            <RouterLink class="nav-link" to="/stats"> <i class="ni ni-tv-2 text-primary"></i> Estadisticas</RouterLink> 
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/reports"> <i class="ni ni-tv-2 text-primary"></i> Reportes de juegos</RouterLink> 
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/users"> <i class="ni ni-tv-2 text-primary"></i> Clientes</RouterLink> 
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/users/groups"> <i class="ni ni-tv-2 text-primary"></i> Grupos de clientes</RouterLink> 
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/orders"> <i class="ni ni-tv-2 text-primary"></i> Estadisticas</RouterLink> 
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/orders"> <i class="ni ni-tv-2 text-primary"></i> Estadisticas</RouterLink> 
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/orders"> <i class="ni ni-tv-2 text-primary"></i> Estadisticas</RouterLink> 
          </li> -->
        </ul>
        <!-- Divider -->
        <!-- <hr class="my-3"> -->
        <!-- Heading -->
        <!-- <h6 class="navbar-heading text-muted">Submenu</h6> -->
        <!-- Navigation -->
        <!-- <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="ni ni-spaceship"></i> Link submenu
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="ni ni-spaceship"></i> Link submenu
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="ni ni-spaceship"></i> Link submenu
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="ni ni-spaceship"></i> Link submenu
            </a>
          </li> -->
          <!-- <li class="nav-item">
            <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard/docs/foundation/colors.html">
              <i class="ni ni-palette"></i> Foundation
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://demos.creative-tim.com/argon-dashboard/docs/components/alerts.html">
              <i class="ni ni-ui-04"></i> Components
            </a>
          </li> -->
        <!-- </ul> -->
        <!-- <ul class="navbar-nav">
          <li class="nav-item active active-pro">
            <a class="nav-link" href="./examples/upgrade.html">
              <i class="ni ni-send text-dark"></i> Upgrade to PRO
            </a>
          </li>
        </ul> -->
      </div>
    </div>
  </nav>
</template>


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
     

        init() {
            sdk.users.auth().then(data => {
              this.forms.user = data[0];
               
            })
        }  
    },
};


</script>