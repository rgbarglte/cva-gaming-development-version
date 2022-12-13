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
                <div class="col-md-10" style="background: #0c1014 !important;"> 
                    <gridGames :games="games" :brand="$route.params.slug" :brandInfo="true" />
                    
                    <!-- <div class="col-12" style="margin-bottom:30px;margin-top:60px;" >
                            
                                 
                            <el-button class="btn btn-primary col-12" style="      background: transparent !important;
    color: white;
    border: 1px solid #0071ff;
    padding: 20px;
    box-shadow: rgb(6, 16, 28) 0px 0px 50px;" :loading="loading.nextpage" @click.prevent="nexPage()"> Cargar mas resultados</el-button>
                    </div> -->


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

import gridGames from '@/components/grid-games.vue';




export default {
    components: {
        typesComponent,
        brandsComponent,
        carrouselComponent,
        gridGames
    },
    data() {
        return {
            pagination: {
                games: 1, 
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
        sdk.games.getAllByBrand(this.$route.params.slug).then(data => {
            this.games = data;
            setTimeout(() => {
                this.loading.games = false;
            }, 2000)
        })
        // sdk.brands.getAll(this.pagination.brands).then(data => {
        //     this.brands = data;
        // })
    },
    methods: {
        nexPage() { 
            this.loading.nextpage = true;
            this.pagination.games = this.pagination.games + 1;
            sdk.games.getAllByBrand(this.$route.params.slug,this.pagination.games).then(data => {

             data.forEach(element => {
                 this.games.push(element);
             });
             this.loading.nextpage = false;
              
            })
        }
    },
};


</script>