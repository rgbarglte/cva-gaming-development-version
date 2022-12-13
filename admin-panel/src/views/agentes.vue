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
              Agentes
              <button class="btn btn-primary" @click.prevent="newUserModal()">Nuevo agente</button>
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
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filterAgents">
                  <th scope="row">


                    <a :href="'/agentes/' + item._id" class="media align-items-center">
                      <div class="avatar rounded-circle mr-3">
                        <img alt="Image placeholder"
                          :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + item.username">
                      </div>
                      <div class="media-body">
                        <el-tooltip class="box-item" effect="dark"
                          :content="'Ver jugadores del agente ' + item.username" placement="bottom-start">
                          <span class="mb-0 text-sm">{{ item.username }}</span>
                        </el-tooltip>

                      </div>
                    </a>
                  </th>
                  <td>
                    {{ item.balance }}
                  </td>
                  <td>
                    <el-button class="btn btn-primary btn-sm" @click="editBalanceModal(item)"
                      :loading="loading.buttonBalance">+ / -</el-button>
                  </td>
                  <td>
                    {{ item.createdAt }}
                  </td>

                  <td>

                    <el-button @click.prevent="editUserModal(item._id);" class="btn btn-primary btn-sm"
                      :loading="loading.buttonEdit">Editar usuario</el-button>
                    <a :href="'/jugadores/' + item._id" class="btn btn-primary btn-sm">Ver perfil</a>
                    <a :href="'/actividad/vivo/' + item._id" class="btn btn-primary btn-sm">Vista en vivo</a>
                    <el-button class="btn btn-outline-danger btn-sm"
                      @click.prevent="openDeleteDialog(item._id)">Eliminar</el-button>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>





  <ComponentDialogCreateAgent ref="createUserDialog" @change="loadUsers()" />
  <ComponentDialogEditUser ref="editUserDialog" @change="loadUsers()" />
  <ComponentDialogBalanceUser ref="editBalanceUserDialog" @change="loadUsers()" />

</template>
  
  
  
  
<script>
import sdk from '@/sdk/bundle.js';
import ComponentDialogCreateAgent from '@/components/users/createAgentComponent.vue';
import ComponentDialogEditUser from '@/components/users/editUserComponent.vue';
import ComponentDialogBalanceUser from '@/components/users/editBalanceComponent.vue';

export default {
  components: {
    ComponentDialogEditUser,
    ComponentDialogBalanceUser,
    ComponentDialogCreateAgent
  },
  data() {
    return {
      search: {
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
        users: true,
        buttonEdit: false,
        buttonBalance: false,
      },
      editBalance: {
        type: 'add',
        balance: 0,
        user: {}
      },
      users: [],
      brands: [],
      forms: {
        user: {
          email: '',
          password: '',
          username: '',
          nickname: '',
          balance: 0,
          isAgent: true,
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
  created() {
    this.loadUsers();
    this.loadBrands();
  },
  methods: {
    editUserModal(id) {
      this.loading.buttonEdit = true
      this.$refs.editUserDialog.openDialog(id, () => {
        this.loading.buttonEdit = false
      })
    },
    searchSubmit() {
      console.log(this.search)
    },

    loadUsers() {
      sdk.users.getAllAgents(this.pagination.users).then(data => {
        this.users = data;
        this.loading.users = false;
      })
    },

    loadBrands() {
      sdk.brands.getAll(this.pagination.brands).then(data => {
        this.brands = data;
      })
    },

    saveBalance() {
      console.log(this.editBalance);

      if (this.editBalance.type == "add") {
        sdk.users.balanceAdd(true, this.editBalance.user._id, this.editBalance.balance).then(data => {
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


      if (this.editBalance.type == "subtract") {
        sdk.users.balanceSubtract(true, this.editBalance.user._id, this.editBalance.balance).then(data => {
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
      this.$refs.createUserDialog.openDialog()
    },
    editBalanceModal(user) {
      this.loading.buttonBalance = true
      this.$refs.editBalanceUserDialog.openDialog(user, () => {
        this.loading.buttonBalance = false
      })
    }

  },
};


</script>