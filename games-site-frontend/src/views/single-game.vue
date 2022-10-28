<template>
    <div style="background:rgba(0, 0, 0, 1) no-repeat 50% 50%;padding-top:0;padding-bottom:0;">
        <div class="container-fluid" style="padding:0;">
            <div class="row">
                <div class="col" style="padding:0;">
                    <div class="embed-responsive  " style="    background: 50% 50% no-repeat rgb(0, 0, 0);
    height: 80vh;">
                        <iframe class="game-iframe" :src="iframe.src" allowfullscreen></iframe>
                    </div>

                </div>
            </div>
        </div>
    </div>





  

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
                            <div class="col-12" style="margin-bottom:30px;">
                                <h4 style="color:white;">{{$route.params.slugBrand}}</h4>
                            </div>

                            <div class="col-md-2" style="padding:5px;margin-bottom:10px" v-for="item in games">
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
 

<script> 
import { usersAuthStore } from '@/stores/users.js';
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
                iframe: 1,
            },
            loading: {
                iframe: true,
                games: true,
                nextpage : false,
            },
            iframe: {
                src: null,
            },

            game: {},
            games: [],
            brands: [],
            userStore: usersAuthStore()
        };
    },
    created() {
        console.log(this.$route.params)
        sdk.games.getEmbed(localStorage.getItem('auth'), this.$route.params.idGame).then(data => {
            this.game = data;
            if (data.error == 0) {
                this.iframe.src = data.response;
            }
            console.log(data)
        })
        sdk.games.getAllByBrand(this.$route.params.slugBrand).then(data => {
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
            this.pagination.brands = this.pagination.brands + 1;
            sdk.games.getAllByBrand(this.$route.params.slugBrand,this.pagination.brands).then(data => {

             data.forEach(element => {
                 this.games.push(element);
             });
             this.loading.nextpage = false;
              
            })
        }
    },
};


</script>