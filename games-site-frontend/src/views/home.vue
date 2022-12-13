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

                    
                    <gridGames :games="games" :brandInfo="true" brand="pg-soft" />
                    <gridGames :games="games2" :brandInfo="true" brand="tomhorn" />
                    <gridGames :games="games3" :brandInfo="true" brand="booming-games" />

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
                games2: true,
                games3: true,
            },
            games: [],
            games2: [],
            games3: [],
            brands: [],
            types: [],
        };
    },
    created() {
        

        sdk.games.getAllByBrand('pg-soft').then(data => {
            this.games = data;
            setTimeout(() => {
                this.loading.games = false;
            }, 2000)
        })
        sdk.games.getAllByBrand('tomhorn').then(data => {
            this.games2 = data; 
        })
        sdk.games.getAllByBrand('booming-games').then(data => {
            this.games3 = data; 
        }) 
         
    },
    methods: {

    },
};


</script>