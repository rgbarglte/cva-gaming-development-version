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

             <h3 class="mb-0">Registros IP</h3>

             <div class="row">
               
                <div class="col-md-4">
                    <div class="form-group">
                          <label for="example-datetime-local-input" class="form-control-label" style="display:block">Filtrar por fecha</label>
                          <el-date-picker
        v-model="search.date"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        @change="searchSubmit()"
        :default-time="[
  new Date(),
  new Date(),
]"
      />
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="form-group">
                          <label for="example-datetime-local-input" class="form-control-label" style="display:block">Buscar jugador</label>
                          <!-- <input class="form-control" type="text"  id="example-datetime-local-input"> -->


                          <el-autocomplete
        v-model="search.target"
        :fetch-suggestions="searchUsers"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        
        value-key="email"
        style="width:100%;"
      />



                          
                    </div>
                </div>
             </div>


           </div>  
           <el-skeleton :rows="40" animated v-if="loading.history" style="margin:20px;" />

<div class="table-responsive" v-if="!loading.history">
             <table class="table align-items-center table-flush">
               <thead class="thead-light">
                 <tr>
                   <th scope="col">Detalles</th>
                   <th scope="col">Direccion ip</th>
                   <th scope="col">Referencia</th>
                   <th scope="col">Navegador</th>
                   <th scope="col">Fecha</th>
                   <th scope="col">Ver perfil</th>
                   <th scope="col">Cerrar sesion</th> 
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="item in history" v-if="history.length > 0">
                   <th scope="row">
                     <div class="media align-items-center">
                       <a href="#" class="avatar rounded-circle mr-3">
                        <img alt="Image placeholder"
                          :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + item.user.email">
                       </a>
                       <div class="media-body">
                         <span class="mb-0 text-sm">{{item.user.email}}</span>
                       </div>
                     </div>
                   </th>
                   <td>
                    <span class="badge badge-dot mr-4">
                       <i class="bg-warning"></i> {{item.data.ip}}
                     </span>  
                   </td>
                   <td>
                    <b>Nuevo inicio de sesion</b>
                   </td>
                   <td> 
                    {{item.data.agent.browser}}
                   </td>

                   <td> 
                    {{item.createdAt}}
                   </td>

                    
                   <td>
                    <a :href="'/jugadores/' + item.userid" class="btn btn-primary btn-sm">Ver / Editar perfil</a>  
                   </td>
                   <td class="text-right">
                    <button class="btn btn-outline-danger btn-sm">Eliminar token</button>  

                     <!-- <div class="dropdown">
                       <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <i class="fas fa-ellipsis-v"></i>
                       </a>
                       <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                         <a class="dropdown-item" href="#">Action</a>
                         <a class="dropdown-item" href="#">Another action</a>
                         <a class="dropdown-item" href="#">Something else here</a>
                       </div>
                     </div> -->
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
          history: 0,
          brands: 0,
        },
        loading: {
          history: true,
        },
        history: [],
        users : [],
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
      this.loadHistory(); 
    },
    methods: {
      searchSubmit() {
        sdk.history.getAllLogin(this.pagination.history,this.search).then(data => {
          this.history = data;
          // this.loading.history = false;
        })
 
      },
  
      loadHistory() {
        sdk.history.getAllLogin(this.pagination.history).then(data => {
          this.history = data;
          this.loading.history = false;
        })
      },
  
      searchUsers(target,callback) {
        console.log('search user')
          sdk.users.searchText(target).then(data => {
            callback(data)
          })
      },
     
      newUserModal() {
        $('#newUser').modal('show')
      }
  
    },
  };
  
  
  </script>