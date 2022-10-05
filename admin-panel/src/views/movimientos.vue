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
                        <label for="example-datetime-local-input" class="form-control-label">Filtrar por jugador</label>
    <select class="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                          <label for="example-datetime-local-input" class="form-control-label">Filtrar por fecha</label>
                          <input class="form-control" type="datetime-local" value="2018-11-23T10:30:00" id="example-datetime-local-input">
                    </div>
                </div>
             </div>


           </div>  
           <div class="table-responsive">
             <table class="table align-items-center table-flush">
               <thead class="thead-light">
                 <tr>
                   <th scope="col">Detalles</th>
                   <th scope="col">Monto</th>
                   <th scope="col">Hora</th>
                   <th scope="col">Fecha</th>
                   <!-- <th scope="col">Completion</th>
                   <th scope="col"></th> -->
                 </tr>
               </thead>
               <tbody>
                 <tr v-for="item in [1,1,1,1,1,1,1,1,1,1,1,1,1]">
                   <th scope="row">
                     <div class="media align-items-center">
                       <a href="#" class="avatar rounded-circle mr-3">
                         <img alt="Image placeholder" src="../assets/img/theme/team-1-800x800.jpg">
                       </a>
                       <div class="media-body">
                         <span class="mb-0 text-sm">Argon Design System</span>
                       </div>
                     </div>
                   </th>
                   <td>
                     $2,500 USD
                   </td>
                   <td>
                     <span class="badge badge-dot mr-4">
                       <i class="bg-info"></i> 21:00
                     </span>
                   </td>
                   <td>
                     <span class="badge badge-dot mr-4">
                       <i class="bg-info"></i> 08/09/2022
                     </span>
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