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
               
                <div class="col-md-3" style="padding-top:20px">
                    
                    <table class="table align-items-center table-flush">
               
               <tbody>
                 <tr v-for="(item , index) in [1,1,1,1,1,1,1,1,1,1]">
                    <th scope="row" v-if="index > 1">
                     <div class="media align-items-center">
                       <a href="#" class="avatar rounded-circle mr-3">
                         <img alt="Image placeholder" src="../assets/img/theme/team-1-800x800.jpg">
                       </a>
                       <div class="media-body">
                         <span class="mb-0 text-sm">Argon Design System</span><br /> 
                       </div>
                       
                     </div>
                   </th>  


                   <th scope="row" v-if="index == 0" style="background: rgb(243 245 251);">
                     <div class="media align-items-center">
                       <a href="#" class="avatar rounded-circle mr-3">
                         <img alt="Image placeholder" src="../assets/img/theme/team-1-800x800.jpg">
                       </a>
                       <div class="media-body">
                         <span class="mb-0 text-sm">Argon Design System</span><br /> 
                       </div>
                       
                     </div>
                   </th>  
                   
                 </tr> 
               </tbody>
             </table>

                </div>
                <div class="col-md-9"  style="padding-top:0;"> 

<div class="col-12" style="height: calc(100vh - 200px);overflow:hidden;overflow-y:auto;">

 

<div class="col-12" style="margin-top:20px;display:flex;margin-bottom: 50px;" v-for="item in [1,1,1,1,1,1,1]" > 
     <div class="" style="    display: flex;
    width: 60px;
    justify-content: center;
    align-items: center;
    align-content: center;">
      <img
              :src="'https://ui-avatars.com/api/?background=2dce89&color=fff&name=f4'"
              style="height:50px;border-radius:100%;margin-right:10px"   />
    </div> 

    <div class="" style=" 
        display: flex;
    width: auto;
    text-align: left;
    flex-direction: column; 
     ">

    <b style="font-size: 13px;">Argon Design System</b>
    <div class="" style="   
    display: flex;
    width: auto;
    background: rgb(243 245 251);
    align-items: center;
    padding: 15px 15px 15px 20px;
    border-radius: 8px;
    text-align: left;
    margin-top: 10px;
    /* border: 1px solid rgb(255 255 255); */
    /* border: 1px solid rgb(140 66 66); */
    font-size: 15px;
    padding:15px
 ">
      Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias ...


      <small style="font-size:11px;opacity:0.8;margin-left:20px;">20/06/2022</small>
    </div>
    </div> 
</div>

















<div class="col-12" style="margin-top:20px;display:flex;margin-bottom: 50px;flex-direction: row-reverse;" v-for="item in [1,1]" > 
     <div class="" style="    display: flex;
    width: 60px;
    justify-content: center;
    align-items: center;
    align-content: center;">
      <img
              :src="'https://ui-avatars.com/api/?background=8965e0&color=fff&name=ra'"
              style="height:50px;border-radius:100%;margin-left:10px"   />
    </div> 

    <div class="" style=" 
        display: flex;
    width: auto;
    text-align: left;
    flex-direction: column; 
     ">

    <b style="font-size: 13px;">Firstname lastname</b>
    <div class="" style="   
    display: flex;
    width: auto;
    background: rgb(243 245 251);
    align-items: center;
    padding: 15px 15px 15px 20px;
    border-radius: 8px;
    text-align: left;
    margin-top: 10px;
    /* border: 1px solid rgb(255 255 255); */
    /* border: 1px solid rgb(140 66 66); */
    font-size: 15px;
    padding:15px
 ">
      Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias ...


      <small style="font-size:11px;opacity:0.8;margin-left:20px;">20/06/2022</small>
    </div>
    </div> 
</div>




</div>

<form    class="col-12" style="margin-top:20px;display:flex">
 
  <div class="" style="display:flex;width:60px;">
   <img
           :src="'https://ui-avatars.com/api/?background=8965e0&color=fff&name=raa'"
           style="height:50px;border-radius:100%;margin-right:10px"   />
 </div>  
 <div style="display:flex;width:100%;">
   <input type="text"  class="form-control"   placeholder="Escribe un mensaje.." style="
 border-radius: 30px;
 border: 1px solid rgb(199, 199, 199) !important;
 background: rgb(251 251 251) !important;
" />
 </div>
 <!-- <div style="display:flex;width:250px;">
   <button type="submit" class="btn btn-primary" style="width:auto;position:relative" >send</button>
 </div> -->
  
</form> 



                </div>
             </div>


           </div>  
         
           
         </div>
       </div>
     </div>
     
   </div>
</template>