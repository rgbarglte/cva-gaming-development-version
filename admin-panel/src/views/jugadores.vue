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

            <h3 class="mb-0" style="padding-bottom:30px;">
              Jugadores
              <el-button class="btn btn-primary" @click.prevent="newUserModal()" :loading="loading.buttonCreate"
                size="large">Nuevo jugador</el-button>
            </h3>

            <div class="row">
              <div class="col-12"></div>

              <div class="col-md-8">
                <el-select v-model="search.user" placeholder="Buscar jugador..." style="width: 100%" filterable
                  @change="changeUser()" clearable>

                  <el-option v-for="item in users" :key="item" :label="item.username" :value="item._id"
                    style="height: 40px;">
                    <div class="media align-items-center">
                      <a href="#" class="avatar rounded-circle mr-3" style="height:30px;width:30px;">
                        <img style="height:30px;width:30px;" alt="Image placeholder"
                          :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + item.username">
                      </a>
                      <div class="media-body">
                        <span class="mb-0 text-sm bold"><b>{{ item.username }}</b></span>
                      </div>
                    </div>
                  </el-option>
                </el-select>

              </div>

              <div class="col-md-4">
                <el-date-picker v-model="search.date" type="daterange" start-placeholder="Start date"
                  end-placeholder="End date" :default-time="[
                    new Date(2022, 1, 1, 0, 0, 0),
                    new Date(2022, 2, 1, 23, 59, 59),
                  ]" />
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
                <tr v-for="item in filterAgents">
                  <th scope="row">
                    <div class="media align-items-center">
                      <a href="#" class="avatar rounded-circle mr-3">
                        <img alt="Image placeholder"
                          :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + item.username">
                      </a>
                      <div class="media-body">
                        <span class="mb-0 text-sm">{{ item.username }}</span>
                      </div>
                    </div>
                    <el-tag type="danger" class="mx-1" effect="dark" round style="margin:5px;" v-if="item.isDelete">
                      Usuario eliminado
                    </el-tag>
                  </th>
                  <td>
                    {{ item.balance }}
                  </td>
                  <td>
                    <el-button class="btn btn-primary btn-sm" @click="editBalanceModal(item)"
                      :loading="loading.buttonBalance">+ / -</el-button>
                    <!-- <button class="btn btn-outline-primary btn-sm">-</button> -->
                  </td>
                  <td>
                    {{ item.createdAt }}
                  </td>
                  <td>
                    <el-button href="#" @click.prevent="editUserModal(item._id)" :loading="loading.buttonEdit"
                      class="btn btn-primary btn-sm">Editar usuario</el-button>

                    <a :href="'/jugadores/' + item._id" class="btn btn-primary btn-sm">Ver perfil</a>

                    <a :href="'/actividad/vivo/' + item._id" class="btn btn-primary btn-sm">Vista en vivo</a>

                    <a href="#" class="btn btn-outline-danger btn-sm"
                      @click.prevent="openDeleteDialog(item._id)">Eliminar</a>

                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>




  <el-dialog v-model="deleteDialog" title="Eliminar jugador" width="30%" :before-close="handleClose">
    <span>Estas seguro de eliminar este jugador? Esta accion no puede revertirse.</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialog = false">No</el-button>
        <el-button class="btn btn-outline-danger btn-sm" type="primary" @click="deleteUser()">
          Si , eliminar
        </el-button>
      </span>
    </template>
  </el-dialog>


  <ComponentDialogBalanceUser ref="editBalanceUserDialog" @change="loadUsers()" />
  <ComponentDialogEditUser ref="editUserDialog" :agentmode="modeAgent" />
  <dialogCreateUser ref="createUserDialog" :agentmode="modeAgent" @change="loadUsers()" />


</template>


  
<script>
import sdk from '@/sdk/bundle.js';
import dialogCreateUser from '@/components/users/create-dialog.vue';
import ComponentDialogEditUser from '@/components/users/editUserComponent.vue';
import ComponentDialogBalanceUser from '@/components/users/editBalanceComponent.vue';


export default {
  components: {
    dialogCreateUser,
    ComponentDialogEditUser,
    ComponentDialogBalanceUser
  },
  data() {
    return {
      modeAgent: false,
      deleteDialog: false,
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
        buttonCreate: false,
        buttonEdit: false,
        buttonBalance: false,
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
    sdk.users.auth().then(data => {
      this.modeAgent = data[0].isAgent;
    })

    this.loadUsers();
    this.loadBrands();
    this.loadAgents();



  },
  computed: {
    filterAgents() {
      if (this.search.user) {
        return this.users.filter((item) => {
          if (item._id === this.search.user) {
            return item;
          }
        })


      } else {
        return this.users;
      }

    }
  },
  methods: {
    deleteUser() {
      sdk.users.deleteUser(this.deleteUserTarget).then(data => {
        if (data.error) {
          return this.$toast.show(
            data.message,
            {
              position: "bottom-right"
            }
          )
        }

        this.$toast.success(
          "El jugador fue eliminado correctamente",
          {
            position: "bottom-right"
          }
        )
        this.loadUsers();

        this.deleteDialog = false;
      })
    },
    openDeleteDialog(id) {
      this.deleteDialog = true;
      this.deleteUserTarget = id;
    },
    searchSubmit() {
      console.log(this.search)
    },

    loadAgents() {
      sdk.users.getAllAgents(this.pagination.users).then(data => {
        this.agents = data;
      })
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


    newUserModal() {
      this.loading.buttonCreate = true;
      this.$refs.createUserDialog.openDialog(() => {
        this.loading.buttonCreate = false;
      })
    },
    editUserModal(id) {
      this.loading.buttonEdit = true;
      this.$refs.editUserDialog.openDialog(id, () => {
        this.loading.buttonEdit = false;
      })
    },
    editBalanceModal(user) {
      this.loading.buttonBalance = true;
      this.$refs.editBalanceUserDialog.openDialog(user, () => {
        this.loading.buttonBalance = false;
      })
    }

  },
};


</script>