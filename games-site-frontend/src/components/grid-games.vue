<template>
    <div class="col-md-12 container-component">
        
        <div class="row" v-if="showBrandInfo">
            <div class="col-12 col-md-12 brand-info-container" > 
            <component>
                <template v-if="brandInfo.thumb">
                   
                                    
                    <img :src="imageCdn + 'brands/' + brandInfo.thumb" class="img-fluid"
                                    style="max-height: 50px;" /> 
                </template>
                <template v-if="!brandInfo.thumb" >
                    <span v-if="!brandInfo.thumb">{{ brandInfo.name }}</span>
                </template>
            </component>
          </div>
        </div>

        <div class="row" v-if="loading.games == true">
            <div class="col-4 col-md-2" style="    padding: 5px;
margin-bottom: 10px;" v-for="item in 42">
                <a class="col-12" style="     height: 150px;
background: linear-gradient(45deg,#000000,#004effa6);
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
                <a :href="'/game/' + item.internal.category + '/' + item._id" class="col-12" style="padding:0;" v-if="!setUrl">
                    <img :src="item.internal.image" class="img-fluid" />
                </a>
                <a :href="'/game/' + urlBrand + '/' + item._id" class="col-12" style="padding:0;" v-if="setUrl">
                    <div class="content-game-avatar"><img :src="item.internal.image" class="img-fluid" /></div> 
                </a>
            </div>

        </div>
    </div>
</template>

<style scoped>
.brand-info-container {
    padding: 5px; margin-bottom: 45px;margin-top:0;
}
@media (max-width: 700px) {
    .brand-info-name {
        display:none;
    }
    .brand-info-container {
    padding: 5px; margin-bottom: 20px;margin-top:20px;
    }
    /* .container-component {
      padding:20px !important
    } */
    .container-component{
        padding: 0px !important;
        overflow-x: hidden !important;
    }
}

.container-component {
    padding: 4rem
}
.content-game-avatar { 
    height: auto;
    min-height: 120px;
    background: rgba(0, 0, 0, 0.3);
    width: 100% !important;
    border-radius: 5px;
    display: block;
    animation-name: example;
    animation-duration: 4s;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
}
.content-game-avatar:hover { 
    transform: scale(1.1);
}
</style>
<script>
import sdk from '@/assets/sdk/bundle.js';
export default {
    props: ["games",'brand','brandInfo'],
    data() {
        return {
            setUrl : false,
            urlBrand : '',
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
            brandInfo : {},
            showBrandInfo : false,
            imageCdn : sdk.settings.imageCdn
        };
    },
    created() {
        console.log(this.$props)
        setTimeout(() => {
            this.loading.games = false;
            this.games = this.$props['games'];
            if(this.$props['brand']) {
                this.urlBrand = this.$props['brand'];
                this.showBrandInfo = this.$props['brandInfo'];
                 
                this.getBrandInfo();
                this.setUrl = true; 
            }

            
             
        }, 2000)
    },
    methods: {
        getBrandInfo() { 
            sdk.brands.getInfoBySlug(this.urlBrand).then(data => {
               this.brandInfo = data[0];
            })
        }
    },
};


</script>