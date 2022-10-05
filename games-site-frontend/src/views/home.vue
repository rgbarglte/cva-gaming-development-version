<template>
    <div style="background:url('/bgtest.png');background-position: top;
    background-size: cover;">
        <div class="container">
            <div class="row">
                <div class="col-md-12" style="height:297px">
                </div>
            </div>
        </div>
    </div>


    <div style="background:#131E2C;height:63px">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">

                </div>
                <div class="col-md-10" style="    display: flex;
    overflow: hidden;
    overflow-x: auto;
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

export default {
    data() {
        return {
           pagination : {
             games : 1,
             brands : 1,
           },
           loading: {
             games : false,
           },
           games : [],
           brands : [],
        };
    },
    created() { 
        sdk.games.getAll(this.pagination.games).then(data => {
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