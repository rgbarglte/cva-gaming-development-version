<template>
    <div class="col-md-12 container-component" >


        <div class="row" v-if="loading.games == true"> 
            <div class="col-4 col-md-2" style="    padding: 5px;
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


            <div class="col-4 col-md-2" style="padding:5px;margin-bottom:10px" v-for="item in games">
                <a :href="'/game/' + item.internal.category + '/' + item._id" class="col-12" style="padding:0;">
                    <img :src="item.internal.image" class="img-fluid" />
                </a>
            </div>

        </div>
    </div>
</template>

<style scoped>
@media (max-width: 600px) {
    .container-component {
      padding:20px !important
    }
}
.container-component {
    padding:4rem  
}
</style>
<script>
export default {
    props: ["games"],
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
        console.log(this.$props)
        setTimeout(() => {
            this.loading.games = false;
            this.games = this.$props['games'];
        }, 2000)
    },
    methods: {

    },
};


</script>