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

            <h3 class="mb-0">Categorias de juegos</h3>

          </div>
          <el-skeleton :rows="40" animated v-if="loading.history" style="margin:20px;" />

          <div class="table-responsive" v-if="!loading.history">
            <table class="table align-items-center table-flush">
              <thead class="thead-light">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Referencia</th>
                  <th scope="col">Activo</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in history" v-if="history.length > 0">
 
                  <th scope="row">
                    <img :src="urlImages + item.thumb" class="img-fluid" style="    max-width: 30px;background:black" />  {{ item.name }}
                  </th>
                  <td>
                    {{ item.slug }}
                  </td>
                  <td>
                    <b class="text-success" v-if="item.active">Si</b>
                    <b class="text-danger" v-if="!item.active">No</b>
                  </td>
                  <td>
                    {{ item.createdAt }}
                  </td>

                  <td>
                    <el-switch v-model="item.active" @change="disabledEnabled(item)" />
                  </td>


                  <td>
                    <a href="#" class="btn btn-primary btn-sm col" @click.prevent="openEdit(item)">Editar</a>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>

  </div>












  <!-- Modal -->
  <div class="modal fade" id="openEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Editar categoria</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <form class="form-row">
            <div class="form-group col-12">
              <label class="form-control-label">Nombre</label>
              <input type="text" class="form-control form-control-alternative" v-model="editTarget.name" />
            </div>

            <div class="form-group col-12">
              <label class="form-control-label">Slug / Referencia</label>
              <input type="text" class="form-control form-control-alternative" v-model="editTarget.slug" />
            </div>


            <div class="form-group col-12">
              <label class="form-control-label">Thumb</label>
              <el-upload show-file-list="false" class="avatar-uploader" :action="endpoint + 'brands/upload'"
                :on-success="
                  (req, file) => {
                    if (req.success) {
                      imageUrl.value = createObject(file.raw)
                      editTarget.thumb = req.name
                    }
                    loading.editButton = false;
                  }
                " :before-upload="() => {
  loading.editButton = true
}">
                <img v-if="imageUrl" :src="imageUrl.value" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </div>


          </form>




        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button> 
          <el-button type="button" class="btn btn-primary" @click.prevent="save()" size="large"
                        :loading="loading.editButton">Editar categoria</el-button>
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
      endpoint: sdk.settings.host,
      urlImages: sdk.settings.socketHost + "/brands/",
      imageUrl: {
        value: 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=',
      },

      search: {
        date: '',
        target: '',
        type: '',
      },

      activeTabNewForm: 'Usuario',
      pagination: {
        history: 0,
        brands: 0,
      },
      loading: {
        editButton : false,
        history: true,
      },
      history: [],
      users: [],
      editTarget: {
        name: null,
        active: false,
        activeLoginOnly: false,
        activeGroupOnly: false,
      },
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
    this.loadHistory();
  },
  methods: {
    createObject(raw) {
      return URL.createObjectURL(raw)
    },
    disabledEnabled(item) {
      sdk.types.updateField(item._id, 'active', item.active).then(data => {
        this.$toast.success(
          "Evento completo.",
          {
            position: "bottom-right"
          }
        )
      })
    },
    save() {
      sdk.types.update(this.editTarget._id, this.editTarget).then(data => {
        this.$toast.success(
          "Evento completo.",
          {
            position: "bottom-right"
          }
        )
        this.loadHistory();
        $('#openEdit').modal('hide')
      })
    },

    searchSubmit() {
      sdk.history.getAllLogin(this.pagination.history, this.search).then(data => {
        this.history = data;
        // this.loading.history = false;
      })

    },

    loadHistory() {
      sdk.types.getAll(this.pagination.history).then(data => {
        this.history = data;
        this.loading.history = false;
      })
    },

    openEdit(target) {
      this.editTarget = target;
      this.imageUrl.value = this.urlImages + this.editTarget.thumb;
      $('#openEdit').modal('show')
    }



  },
};


</script>