<template>
    <carrouselComponent />


    <brandsComponent />

    <div class="section-mid">
        <div class="container-fluid">
            <div class="row" style="position:relative">
                <div class="col-md-2 section-mid-left">
                    <div class="col-12" style="margin-top:30px;margin-bottom:100px">
                        <typesComponent />
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="col-md-12" style="padding:4rem !important">


                        <div class="row" v-if="loading.games == true">


<div class="col-md-2" style="    padding: 5px;
margin-bottom: 10px;" v-for="item in 42">
    <a class="col-12" style="     height: 150px;
background: rgb(19, 30, 44);
width: 100%;
border-radius: 5px;
width: 100% !important;
display: block;
animation-name: example;
animation-duration: 4s;">

    </a>
</div>

</div>






<div class="row" v-if="loading.games == false">

 <div class="col-12" v-if="games.length == 0" style="color:white;font-size:13px">
   No se encontraron resultados.<br />
   <p style="font-size:11px;opacity:0.8;padding:0">Reprehenderit mollit elit exercitation consequat do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum adipisicing aliqua.</p>
</div>


                            <div class="col-12" style="margin-bottom:30px;" v-if="games.length > 0">
                                <h4 style="color:white;">{{$route.params.slug}}</h4>
                            </div>

                            <div class="col-md-2" style="padding:5px;margin-bottom:10px" v-for="item in games" v-if="games.length > 0">
                                <a :href="'/game/' + item.internal.category + '/' + item._id" class="col-12"
                                    style="padding:0;">
                                    <img :src="item.internal.image" class="img-fluid" />
                                </a>
                            </div>



                            <div class="col-12" style="margin-bottom:30px;margin-top:60px;" >
                            
                                 
                                <el-button class="btn btn-primary col-12" style="    background: #060f1b;
    color: white;
    border: 1px solid #091525;
    padding: 20px;
    box-shadow: 0 0 50px #06101c;" :loading="loading.nextpage" @click.prevent="nexPage()"> Cargar mas resultados</el-button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>
<script>
import sdk from '@/assets/sdk/bundle.js';
import typesComponent from '@/components/types.vue';
import brandsComponent from '@/components/brands.vue';
import carrouselComponent from '@/components/carrousel.vue';





export default {
    components: {
        typesComponent,
        brandsComponent,
        carrouselComponent
    },
    data() {
        return {
            pagination: {
                games: 1,
                brands: 1,
            },
            loading: {
                games: true,
                nextpage : false,
            },
            games: [],
            brands: [],
        };
    },
    created() {
        console.log(this.$route.params)
        sdk.games.getAllByType(this.$route.params.slug).then(data => {
            this.games = data;
            setTimeout(() => {
                this.loading.games = false;
            }, 2000)
        })
        sdk.brands.getAll(this.pagination.brands).then(data => {
            this.brands = data;
        })
    },
    methods: {
        nexPage() { 
            this.loading.nextpage = true;
            this.pagination.games = this.pagination.games + 1;
            sdk.games.getAllByType(this.$route.params.slug,this.pagination.games).then(data => {

             data.forEach(element => {
                 this.games.push(element);
             });
             this.loading.nextpage = false;
              
            })
        }
    },
};


</script>