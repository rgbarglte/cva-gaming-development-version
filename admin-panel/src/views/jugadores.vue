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
  <div class="container-fluid mt--7">
    <!-- Table -->
    <div class="row">
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">

            <h3 class="mb-0">Jugadores</h3>

            <div class="row">
              <!-- <div class="col-md-4" style="padding-top:20px">
                <div class="custom-control custom-radio">
                  <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                  <label class="custom-control-label" for="customRadio1">Ver solo agentes</label>
                </div>
                <div class="custom-control custom-radio">
                  <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                  <label class="custom-control-label" for="customRadio2">Ver solo jugadores</label>
                </div>
                <div class="custom-control custom-radio">
                  <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input">
                  <label class="custom-control-label" for="customRadio3">Ver Todo</label>
                </div>
              </div> -->

              <div class="col-md-3">
                <div class="form-group">
                  <label for="example-datetime-local-input" class="form-control-label">Acciones</label><br />

                  <button class="btn btn-primary" @click.prevent="newUserModal()">Nuevo jugador</button>
                  <!-- <button class="btn btn-outline-primary">Nuevo agente</button> -->

                </div>
              </div>

              <div class="col-md-4">
                <div class="form-group">
                  <label for="example-datetime-local-input" class="form-control-label">Filtrar por fecha de
                    registro</label>
                    <el-date-picker
        v-model="search.date"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        :default-time="[
  new Date(2022, 1, 1, 0, 0, 0),
  new Date(2022, 2, 1, 23, 59, 59),
]"
      />
                </div>
              </div>

              <div class="col-md-10">
                <div class="form-group">
                  <label for="example-datetime-local-input" class="form-control-label">Buscar jugador</label>
                  <input class="form-control form-control-alternative" type="text" id="example-datetime-local-input">
                </div>
              </div>

              <div class="col-md-2">
                <div class="form-group">
                  <label for="example-datetime-local-input" class="form-control-label">Aplicar filtros</label>
                  <button type="button" class="btn btn-primary col-12" @click.prevent="searchSubmit()">Buscar</button>
                </div>

                 
              </div>
            </div>


          </div>



          <el-skeleton :rows="40" animated v-if="loading.users" style="margin:20px;" />

          <div class="table-responsive" v-if="!loading.users">


            <table class="table align-items-center table-flush">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Detalles</th>
                  <th scope="col">Balance</th>
                  <th scope="col">Cargar</th>
                  <th scope="col">Fecha de registro</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in users">
                  <th scope="row">
                    <div class="media align-items-center">
                      <a href="#" class="avatar rounded-circle mr-3">
                        <img alt="Image placeholder"
                          :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + item.email">
                      </a>
                      <div class="media-body">
                        <span class="mb-0 text-sm">{{item.email}}</span>
                      </div>
                    </div>
                  </th>
                  <td>
                    {{item.balance}}
                  </td>
                  <td>
                    <button class="btn btn-primary btn-sm" @click="editBalanceModal(item)">+ / -</button>
                    <!-- <button class="btn btn-outline-primary btn-sm">-</button> -->
                  </td>
                  <td>
                    {{item.createdAt}}
                  </td>
                  <td>
                    <a :href="'/jugadores/' + item._id" class="btn btn-primary btn-sm">Ver / Editar perfil</a>
                  </td>
                  <td>
                    <a :href="'/actividad/vivo/' + item._id" class="btn btn-primary btn-sm">Vista en vivo</a>
                  </td>
                  <td class="text-right">
                    <button class="btn btn-outline-danger btn-sm">Eliminar jugador</button>

                    <div class="dropdown">
                      <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer py-4">
            <nav aria-label="...">
              <ul class="pagination justify-content-end mb-0">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">
                    <i class="fas fa-angle-left"></i>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    <i class="fas fa-angle-right"></i>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>



  <!-- Modal -->
  <div class="modal fade" id="newUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Nuevo jugador</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">





          <el-tabs v-model="activeTabNewForm" class="demo-tabs">
            <el-tab-pane label="Usuario" name="Usuario" active>

              <form class="form-row">
                <div class="form-group col-6">
                  <label class="form-control-label">E-Mail</label>
                  <input type="email" class="form-control form-control-alternative" v-model="forms.user.email" />
                </div>

                <div class="form-group col-6">
                  <label class="form-control-label">Nombre de usuario</label>
                  <input type="text" class="form-control form-control-alternative" v-model="forms.user.username" />
                </div>

                <div class="form-group col-6">
                  <label class="form-control-label">Apodo</label>
                  <input type="text" class="form-control form-control-alternative" v-model="forms.user.nickname" />
                </div>

                <div class="form-group col-6">
                  <label class="form-control-label">Contraseña</label>
                  <input type="password" class="form-control form-control-alternative" v-model="forms.user.password" />
                </div>

                <div class="form-group col-12">
                  <label class="form-control-label">Balance</label>
                  <input type="number" class="form-control form-control-alternative" v-model="forms.user.balance"
                    min="0" />
                </div>


                <div class="btn-group btn-group-toggle" data-toggle="buttons" style="margin-bottom:20px">
                  <label class="btn btn-secondary" v-bind:class="{ type_product_select: forms.user.isAgent == false }"
                    @click="forms.user.isAgent  = false">
                    <input type="radio" name="options" id="sedan" autocomplete="off" />
                    Jugador
                  </label>
                  <label class="btn btn-secondary" v-bind:class="{ type_product_select: forms.user.isAgent == true }"
                    @click="forms.user.isAgent  = true">
                    <input type="radio" name="options" id="suv" autocomplete="off" />
                    Agente
                  </label>
                </div>


              </form>
            </el-tab-pane>





            <el-tab-pane label="Perfil publico" name="Perfil publico">

              <form class="form-row">


                <div class="form-group col-6">
                  <label class="form-control-label">Nombre</label>
                  <input type="text" class="form-control form-control-alternative"
                    v-model="forms.user.profile.firstname" />
                </div>


                <div class="form-group col-6">
                  <label class="form-control-label">Apellido</label>
                  <input type="text" class="form-control form-control-alternative"
                    v-model="forms.user.profile.lastname" />
                </div>


                <div class="form-group col-6">
                  <label class="form-control-label">Telefono</label>
                  <input type="text" class="form-control form-control-alternative" v-model="forms.user.profile.phone" />
                </div>



                <div class="form-group col-6">
                  <label class="form-control-label">Direccion</label>
                  <input type="text" class="form-control form-control-alternative"
                    v-model="forms.user.profile.address" />
                </div>


                <div class="form-group col-6">
                  <label class="form-control-label">Ciudad</label>
                  <input type="text" class="form-control form-control-alternative" v-model="forms.user.profile.city" />
                </div>

                <div class="form-group col-6">
                  <label class="form-control-label">Pais</label>
                  <input type="text" class="form-control form-control-alternative"
                    v-model="forms.user.profile.country" />
                </div>


                <div class="form-group col-6">
                  <label class="form-control-label">Codigo postal</label>
                  <input type="text" class="form-control form-control-alternative" v-model="forms.user.profile.zip" />
                </div>



                <div class="form-group col-12">
                  <label class="form-control-label">Sobre el usuario</label>
                  <input type="text" class="form-control form-control-alternative" v-model="forms.user.profile.about" />
                </div>

              </form>

            </el-tab-pane>


            <el-tab-pane label="Marcas" name="Marcas">
              <div class="form-group col-12"> 
                  <div class="form-froup">
                    <Toggle v-model="forms.user.enabledAllBrands" /> Todas las marcas de juegos disponibles
                  </div>

                  <div class="form-groupd" v-if="!forms.user.enabledAllBrands" style="margin-top:20px;">
                    <el-select
              multiple
              v-model="forms.user.brands"
              placeholder="Selecciona las marcas disponibles"
              style="width: 100%"

              filterable
            >
              <el-option
                v-for="item in brands"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
                  </div>
                </div>

            </el-tab-pane>

            <el-tab-pane label="Juegos" name="Juegos">
              <div class="form-group col-12"> 
                  <div class="form-froup">
                    <Toggle v-model="forms.user.enabledAllGames" disabled  /> Todos los juegos disponibles
                  </div>
              </div>



            </el-tab-pane>



            <el-tab-pane label="Perfil del agente" name="perfil agente" v-if="forms.user.isAgent">
              <form class="form-row">
                <div class="form-group col-12">
                  <label class="form-control-label">Comisiones</label>
                  <div class="form-froup">
                    <Toggle v-model="forms.user.automatically_settle" /> Liquidar automaticamente
                    <p v-if="!forms.user.automatically_settle" style="margin-top:5px;font-size:12px;"> Se liquidara :
                      <b>Mensualmente</b>
                    </p>
                    <p v-if="forms.user.automatically_settle" style="margin-top:5px;font-size:12px;"> Se liquidara :
                      <b>Anualmente</b>
                    </p>
                  </div>
                </div>
                <div class="form-group col-6">
                  <label class="form-control-label">Nombre</label>
                  <input type="text" class="form-control form-control-alternative"
                    v-model="forms.user.agent_data.firstname" />
                </div>
                <div class="form-group col-6">
                  <label class="form-control-label">Apellido</label>
                  <input type="text" class="form-control form-control-alternative"
                    v-model="forms.user.agent_data.lastname" />
                </div>
                <div class="form-group col-6">
                  <label class="form-control-label">Telefono</label>
                  <input type="text" class="form-control form-control-alternative"
                    v-model="forms.user.agent_data.phone" />
                </div>
                <div class="form-group col-6">
                  <label class="form-control-label">D.N.I</label>
                  <input type="text" class="form-control form-control-alternative"
                    v-model="forms.user.agent_data.dni" />
                </div>
              </form>
            </el-tab-pane>
          </el-tabs>
 

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click.prevent="saveUser()">Crear usuario</button>
        </div>
      </div>
    </div>
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
                  <th scope="col" v-if="editBalance.balance !== 0"><b>Nuevo balance</b></th> 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div class="media align-items-center">
                      <a href="#" class="avatar rounded-circle mr-3">
                        <img alt="Image placeholder"
                          :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + editBalance.user.email">
                      </a>
                      <div class="media-body">
                        <span class="mb-0 text-sm">{{editBalance.user.email}}</span>
                      </div>
                    </div>
                  </th>
                  <td>
                    {{editBalance.user.balance}}
                    
                    <span class="text-success" v-if="editBalance.type == 'add'">+ {{editBalance.balance}}</span>

                    <span class="text-danger" v-if="editBalance.type == 'subtract'">- {{editBalance.balance}}</span>

                  </td> 

                  <td v-if="editBalance.balance !== 0"> 
                    <span class="text-info" v-if="editBalance.type == 'add'">{{parseFloat(editBalance.balance) + parseFloat(editBalance.user.balance)}}</span> 
                    <span class="text-info" v-if="editBalance.type == 'subtract'">{{parseFloat(editBalance.user.balance ) - parseFloat(editBalance.balance)}}</span>

                  </td>
                 
                    
                 
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
            <el-input-number
    v-model="editBalance.balance"
    :min="1"
    :max="15000"
    controls-position="right"
    size="large"
    @change="handleChange"
    style="width:100%;"
  />
          </div>


 
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click.prevent="saveBalance()">Editar balance</button>
        </div>
      </div>
    </div>
  </div>



</template>




<script>
import sdk from '@/sdk/bundle.js';

export default {
  data() {
    return {
      search : {
        date : '',
        target : '',
        type : '',
      },

      activeTabNewForm : 'Usuario',
      pagination: {
        users: 0,
        brands: 0,
      },
      loading: {
        users: true,
      },
      editBalance : {
        type : 'add',
        balance : 0,
        user : {}
      },
      users: [],
      brands : [],
      forms: {
        user: {
          email: '',
          password: '',
          username: '',
          nickname: '',
          balance: 0,
          isAgent: false,
          automatically_settle: false,
          enabledAllBrands : true,
          brands : [],
          enabledAllGames : true,
          games : [],
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
    this.loadUsers();
    this.loadBrands();
  },
  methods: {
    searchSubmit() {
      console.log(this.search)
    },

    loadUsers() {
      sdk.users.getAll(this.pagination.users).then(data => {
        this.users = data;
        this.loading.users = false;
      })
    },

    loadBrands() {
        sdk.brands.getAll(this.pagination.brands).then(data => {
              this.brands = data;
        })
    },
    saveUser() {
      sdk.users.create(this.forms.user).then(data => {
        if (data.error) {
          return this.$toast.show(
            data.message,
            {
              position: "bottom-right"
            }
          )
        }

        this.$toast.success(
          "El usuario fue registrado correctamente",
          {
            position: "bottom-right"
          }
        )

        $('#newUser').modal('hide')
        this.loadUsers();
      })
    },
    saveBalance() {
      console.log(this.editBalance);

      if(this.editBalance.type == "add" ) {
        sdk.users.balanceAdd(true,this.editBalance.user._id,this.editBalance.balance).then(data => {
        if (data.error) {
          return this.$toast.show(
            data.message,
            {
              position: "bottom-right"
            }
          )
        }

        this.$toast.success(
          "El usuario fue editado correctamente",
          {
            position: "bottom-right"
          }
        )

        $('#editBalance').modal('hide')
        this.loadUsers();
      })
      }


      if(this.editBalance.type == "subtract" ) {
        sdk.users.balanceSubtract(true,this.editBalance.user._id,this.editBalance.balance).then(data => {
        if (data.error) {
          return this.$toast.show(
            data.message,
            {
              position: "bottom-right"
            }
          )
        }

        this.$toast.success(
          "El usuario fue editado correctamente",
          {
            position: "bottom-right"
          }
        )

        $('#editBalance').modal('hide')
        this.loadUsers();
      })
      }
       
    },

     

    newUserModal() {
      $('#newUser').modal('show')
    },
    editBalanceModal(user) {
      this.editBalance.user = user;
      $('#editBalance').modal('show')
    }

  },
};


</script>