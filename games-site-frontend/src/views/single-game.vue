<template>
    <div style="background:rgba(0, 0, 0, 1) no-repeat 50% 50%;padding-top:40px;padding-bottom:40px;">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="embed-responsive  " style="    background: 50% 50% no-repeat rgb(0, 0, 0);
    height: 550px;">
  <iframe class="game-iframe" :src="iframe.src" allowfullscreen></iframe>
</div>
                 
                </div>
            </div>
        </div>
    </div>






    
    <div style="background:#131E2C;height:63px">
        <div class="container-fluid">
            <div class="row">
                <!-- <div class="col-md-2">

                </div> -->
                <div class="col" style="    display: flex;
    overflow: hidden;
    overflow-x: hidden;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    height: 50px;">
                    <a style="    width: 200px;
    margin-right: 15px;
    background: rgba(255, 255, 255, 0.03);
    height: 50px;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 13px;
line-height: 16px;
"
                        v-for="item in brands" :href="'/brand/'+item">
                        <div style="width:40px;height: 40px;border-radius: 100%;margin-right: 10px;background:rgb(255,255,255,0.1)"></div>
                        {{item}}
            </a>
                </div>
            </div>
        </div>
    </div>

    <div style="height: auto;background: #0A1117;">
        <div class="container-fluid">
            <div class="row" style="position:relative">
                <div class="col-md-2"
                    style="background:#131E2C;height: auto;position: relative;padding-top:30px;position:sticky;top:0;">
                    <div class="col-12" style="margin-top:30px">
                        <div style="width:100%;margin-bottom: 15px;background:rgb(255,255,255,0.03);height:50px"
                            v-for="item in [1,1,1,1,1,2,3,4,5,6]">
                        </div>
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="col-md-12" style="padding-top:60px">
                        <div class="row">
                            <div class="col-12" style="margin-bottom:30px;">
                                <h4 style="color:white;">{{$route.params.slugBrand}}</h4>
                            </div>

                            <div class="col-md-2" style="padding:5px;margin-bottom:10px"
                                v-for="item in games">
                                <a  :href="'/game/' + item.internal.category + '/' + item._id" class="col-12" style="padding:0;">
                                    <img :src="item.internal.image"
                                        class="img-fluid" />
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>


 


<script>
    import sdk from '@/assets/sdk/bundle.js';
    import { usersAuthStore } from '@/stores/users.js';

    export default {
        data() {
            return {
               pagination : {
                 games : 1,
                 brands : 1,
                 iframe : 1,
               },
               loading: {
                 iframe : true,
                 games : false,
               },
               iframe : {
                src : null,
               },

               game : {},
               games: [],
               brands : [],
               userStore : usersAuthStore()
            };
        },
        created() { 
            console.log(this.$route.params)
            sdk.games.getEmbed(localStorage.getItem('auth'),this.$route.params.idGame).then(data => {
                  this.game = data;
                  if(data.error == 0) {
                    this.iframe.src = data.response;
                  }
                  console.log(data)
            })
            sdk.games.getAllByBrand(this.$route.params.slugBrand).then(data => {
              this.games = data;
        })
        sdk.brands.getAll(this.pagination.brands).then(data => {
              this.brands = data;
        })
        },
        methods: {
    
        },
    };
    
    
    </script>