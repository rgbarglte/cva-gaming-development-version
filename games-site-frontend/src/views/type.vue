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
                    <div class="col-12" style="margin-top:30px;" v-if="games.length > 0">
                                <h4 style="color:white;">{{ $route.params.slug }}</h4>
                            </div>
                            <gridGames :games="games" />

<div class="col-12" style="margin-bottom:30px;margin-top:60px;">


                                <el-button class="btn btn-primary col-12" style="    background: #060f1b;
    color: white;
    border: 1px solid #091525;
    padding: 20px;
    box-shadow: 0 0 50px #06101c;" :loading="loading.nextpage" @click.prevent="nexPage()"> Cargar mas resultados
                                </el-button>
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
                brands: 1,
            },
            loading: {
                games: true,
                nextpage: false,
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
            sdk.games.getAllByType(this.$route.params.slug, this.pagination.games).then(data => {

                data.forEach(element => {
                    this.games.push(element);
                });
                this.loading.nextpage = false;

            })
        }
    },
};


</script>