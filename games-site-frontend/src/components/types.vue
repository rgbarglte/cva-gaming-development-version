<template>
    <el-scrollbar max-width="800">

        <div style="    width: 100%;
    margin-bottom: 15px;
    background: rgba(255, 255, 255, 0.03);
    height: 50px;
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    padding-left: 5px;" v-for="item in 20" v-if="loading.types == true">
            
        </div>


        <a style="    width: 100%;
    margin-bottom: 15px;
    background: rgba(255, 255, 255, 0.03);
    height: 50px;
    color: white;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    border-radius: 5px;
    padding-left: 5px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    " v-for="item in types"  v-if="loading.types == false" :href="'/type/'+item.slug">
            <div style="height: 30px;width:30px;border-radius:100%;background:rgb(255,255,255,0.1);margin-right: 10px;">
            </div> {{item.name}}
        </a>
    </el-scrollbar>





    
 



</template>



<script>
import sdk from '@/assets/sdk/bundle.js';

export default {
    data() {
        return {
            pagination: { 
                types: 0, 
            },
            loading: {
                types: true,
            }, 
            types: [],
        };
    },
    created() { 

        sdk.types.getAll(this.pagination.types).then(data => { 
           this.types = data;
           setTimeout(() => {
               this.loading.types = false;
           },600)
        })
    },
    methods: {

    },
};


</script>