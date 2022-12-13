<template>
     <!-- Header -->
     <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 600px; background-image: url(../assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <!-- Mask -->
      <span class="mask bg-gradient-default opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row" style="width:100%">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">{{forms.user.username}}</h1>
            <p class="text-white ">{{forms.user.profile.firstname}} {{forms.user.profile.lastname}}</p>
            <p class="text-white " style="font-size:12px">{{forms.user.email}}</p>
            <el-button href="#!" class="btn btn-info" @click.prevent="editBalanceModal()" size="large" :loading="loading.buttonBalance">Cargar / Descargar fichas</el-button>
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
                    <img  :src="'https://ui-avatars.com/api/?size=512&background=5e72e4&color=fff&name=' + forms.user.username"  class="rounded-circle">
                  </a>
                </div>
              </div>
            </div>
            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div class="d-flex justify-content-between">
                <!-- <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                <a href="#" class="btn btn-sm btn-default float-right">Message</a> -->
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <!-- <span class="heading">22</span>
                      <span class="description">Friends</span> -->
                    </div>
                    <div>
                      <!-- <span class="heading">10</span>
                      <span class="description">Photos</span> -->
                    </div>
                    <div>
                      <!-- <span class="heading">89</span>
                      <span class="description">Comments</span> -->
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>
                  {{forms.user.profile.firstname}} {{forms.user.profile.lastname}}
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>{{forms.user.profile.address}} 
                </div>
                <!-- <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer Science
                </div>
                <hr class="my-4" />
                <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                <a href="#">Show more</a> -->
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
                <!-- <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Guardar cambios</a>
                </div> -->
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

                    <div class="col-lg-12">
                      <div class="form-group">
                        <label class="form-control-label" for="input-last-name">Contraseña</label>
                        <input type="password" id="input-last-name" class="form-control form-control-alternative" placeholder="******" v-model="forms.user.password">
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Address -->
                <h6 class="heading-small text-muted mb-4">Direccion</h6>
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

      <usersActivityBalance  style="margin-top:50px;margin-bottom:50px" :user="$route.params.id" />


      <usersHistoryWidget  style="margin-top:50px;margin-bottom:50px" :user="$route.params.id" />
       
    </div>


























    


  <!-- Modal -->
  <div class="modal fade" id="editBalance" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Editar balance</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">




          <table class="table align-items-center table-flush">
            <thead class="thead-light">
              <tr>
                <th scope="col">Detalles</th>
                <th scope="col">Balance</th>
                <!-- <th scope="col" v-if="editBalance.balance !== 0"><b>Nuevo balance</b></th> -->
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <div class="media align-items-center">
                    <a href="#" class="avatar rounded-circle mr-3">
                      <img alt="Image placeholder"
                        :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + editBalance.user.username">
                    </a>
                    <div class="media-body">
                      <span class="mb-0 text-sm">{{ editBalance.user.username }}</span>
                    </div>
                  </div>
                </th>
                <td>
                  {{ editBalance.user.balance }}

                  <span class="text-success" v-if="editBalance.type == 'add'">+ {{ editBalance.balance }}</span>

                  <span class="text-danger" v-if="editBalance.type == 'subtract'">- {{ editBalance.balance }}</span>

                </td>

                <!-- <td v-if="editBalance.balance !== 0">
                  <span class="text-info" v-if="editBalance.type == 'add'">{{ parseFloat(editBalance.balance) +
                      parseFloat(editBalance.user.balance)
                  }}</span>
                  <span class="text-info" v-if="editBalance.type == 'subtract'">{{ parseFloat(editBalance.user.balance)
                      - parseFloat(editBalance.balance)
                  }}</span>

                </td> -->



              </tr>
            </tbody>
          </table>




          <div class="col-12">
            <label class="form-control-label" style="display:block">Tipo de operacion</label>
            <el-radio-group v-model="editBalance.type">
              <el-radio label="add" size="large" border>Agregar</el-radio>
              <el-radio label="subtract" size="large" border>Restar</el-radio>
            </el-radio-group>
          </div>

          <el-divider border-style="dashed" />
          <div class="col-12">
            <label class="form-control-label" style="display:block">Monto</label>
            <el-radio-group v-model="editBalance.balance">
              <el-radio label="50" size="large" border>50</el-radio>
              <el-radio label="100" size="large" border>100</el-radio>
              <el-radio label="150" size="large" border>150</el-radio>
              <el-radio label="250" size="large" border>250</el-radio>
              <el-radio label="350" size="large" border>350</el-radio>
              <el-radio label="450" size="large" border>450</el-radio>
              <el-radio label="1000" size="large" border>1000</el-radio>
            </el-radio-group>
          </div>


          <el-divider border-style="dashed" />

          <div class="col-12">
            <label class="form-control-label" style="display:block">O puedes ingresar un monto</label>
            <el-input-number v-model="editBalance.balance" :min="1" :max="15000" controls-position="right" size="large"
              @change="handleChange" style="width:100%;" />
          </div>



        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click.prevent="saveBalance()">Editar balance</button>
        </div>
      </div>
    </div>
  </div>

  <ComponentDialogBalanceUser  ref="editBalanceUserDialog" @change="init()" />

</template>




<script>
import sdk from '@/sdk/bundle.js';

import { ElNotification } from 'element-plus'


import usersHistoryWidget from '@/components/game-history-user-widget.vue';
import usersActivityBalance from '@/components/activity-balance-user-widget.vue';
import ComponentDialogBalanceUser from '@/components/users/editBalanceComponent.vue';
export default {
  components : {
    usersHistoryWidget,
    usersActivityBalance,
    ComponentDialogBalanceUser
  },
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
        buttonBalance : false,
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
    this.init()
  },
  methods: {
    editBalanceModal() {
      this.loading.buttonBalance = true
      this.$refs.editBalanceUserDialog.openDialog(this.forms.user,() => { 
        this.loading.buttonBalance = false
      })  
    },
  
    init() {
      sdk.users.get(this.$route.params.id).then(response => {
      // alert(JSON.stringify(response)); 
      this.forms.user = response[0];
    })
    }
  },
};


</script>