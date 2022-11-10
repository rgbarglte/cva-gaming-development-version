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

                    <gridGames :games="games" />


                    <!-- <div class="col-md-12" style="padding:4rem !important">
                        


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


                            <div class="col-md-2" style="padding:5px;margin-bottom:10px" v-for="item in games">
                                <a :href="'/game/' + item.internal.category + '/' + item._id" class="col-12"
                                    style="padding:0;">
                                    <img :src="item.internal.image" class="img-fluid" />
                                </a>
                            </div>

                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>




</template>
<style scoped>
@keyframes example {
    from {
        background-color: red;
    }

    to {
        background-color: yellow;
    }
}
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
                types: 0,
                brands: 1,
            },
            loading: {
                games: true,
            },
            games: [],
            brands: [],
            types: [],
        };
    },
    created() {
        sdk.games.getAll(this.pagination.games).then(data => {
            this.games = data;
            setTimeout(() => {
                this.loading.games = false;
            }, 2000)
        })
        sdk.brands.getAll(this.pagination.brands).then(data => {
            this.brands = data;
        })

        sdk.types.getAll(this.pagination.types).then(data => {
            console.log('types', data)
            this.types = data;
        })
    },
    methods: {

    },
};


</script>