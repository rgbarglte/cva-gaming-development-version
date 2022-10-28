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

             <h3 class="mb-0">Movimientos</h3>

             <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="example-datetime-local-input" class="form-control-label"  style="display:block">Filtrar por jugador</label>
    <!-- <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select> -->
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
                <div class="col-md-6">
                    <div class="form-group"> 
                          <!-- <input class="form-control" type="datetime-local" value="2018-11-23T10:30:00" id="example-datetime-local-input"> -->
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
             </div>
             <el-pagination
    small
    background
    layout="prev, pager, next"
    :total="pagination.totalPages"
    :default-page-size="30"
    :page-size="30"
    class="mt-4"
    @current-change="nextPage"
  />


           </div>  

           
           <div class="table-responsive">
             <table class="table align-items-center table-flush">
               <thead class="thead-light">
                 <tr>
                   <th scope="col">Detalles</th> 
                   <th scope="col">Tipo</th>  
                   <th scope="col">Carga / Descarga</th>
                   <th scope="col">Balance antiguo</th>
                   <th scope="col">Balance resultante</th>
                   <th scope="col">Fecha</th>
                   <!-- <th scope="col">Completion</th>
                   <th scope="col"></th> -->
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="item in  activity">
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

                  {{item.balance}}

                  
                   <td>
                     <span class="text-danger" v-if="item.data.ref == 'subtract'"> Descarga </span>
                     <span class="text-success" v-if="item.data.ref == 'add'"> Carga </span>
                   </td>
                    
                   <td>
                    <span class="badge badge-dot mr-4" v-if="item.data.ref == 'subtract'">
                       <i class="bg-danger"></i>  {{item.data.balance.target}}
                     </span>

                     <span class="badge badge-dot mr-4" v-if="item.data.ref == 'add'">
                       <i class="bg-success"></i>  {{item.data.balance.target}}
                     </span> 
                   </td>
                   <td>
                     <span class="badge badge-dot mr-4 text-bold">
                       {{item.data.balance.old}}
                     </span>
                   </td>
                   
                   <td>
                    <span class="badge badge-dot mr-4">
                       <i class="bg-info"></i>  {{item.data.balance.new}}
                     </span>
                     </td>

                     <td>
                      {{item.createdAt}}
                     </td>

                   <!-- <td>
                     <div class="d-flex align-items-center">
                       <span class="mr-2">60%</span>
                       <div>
                         <div class="progress">
                           <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>
                         </div>
                       </div>
                     </div>
                   </td>
                   <td class="text-right">
                     <div class="dropdown">
                       <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <i class="fas fa-ellipsis-v"></i>
                       </a>
                       <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                         <a class="dropdown-item" href="#">Action</a>
                         <a class="dropdown-item" href="#">Another action</a>
                         <a class="dropdown-item" href="#">Something else here</a>
                       </div>
                     </div>
                   </td> -->
                 </tr> 
               </tbody>
             </table>
           </div>
           <div class="card-footer py-4 text-rigth">

            <el-pagination
    small
    background
    layout="prev, pager, next"
    :total="pagination.totalPages"
    :default-page-size="30"
    :page-size="30"
    class="mt-4"
    @current-change="nextPage"
  />



             <!-- <nav aria-label="...">
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
             </nav> -->
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
          activity: 0,
          brands: 0,
          totalPages : 0,
        },
        loading: {
          activity: true,
        },
        editBalance : {
          type : 'add',
          balance : 0,
          user : {}
        },
        activity: [],
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
      this.loadActivity(); 
    },
    methods: {
      nextPage(pages) {
       this.pagination.activity = pages - 1;
       this.loadActivity();
      },
      searchSubmit() {
        sdk.activity.getAllBalance(this.pagination.history,this.search).then(data => {
          this.activity = data;
          // this.loading.history = false;
        })
 
      },
  
      loadActivity() {
 
        sdk.activity.balanceTotalPages().then(data => { 
          this.pagination.totalPages = data;
        })
        sdk.activity.getAllBalance(this.pagination.activity).then(data => {
          this.activity = data;
          this.loading.activity = false;
        })
      }, 
  
    },
  };
  
  
  </script>