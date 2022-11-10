<template>
    <el-scrollbar max-width="800" class="hide-mobil-types"> 
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



    <el-scrollbar max-height="60px" class="hide-desktop-types show-mobil-types">
    <div class="scrollbar-flex-content">
      <a v-for="item in types" key="item"  v-if="loading.types == false" :href="'/type/'+item.slug" class="scrollbar-demo-item ">
            <div style="height: 30px;width:30px;border-radius:100%;background:rgb(255,255,255,0.1);margin-right: 10px;">
            </div> {{item.name}}
      </a>
    </div>
  </el-scrollbar>

 
</template>



<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: auto;
  margin: 10px;
  text-align: center; 
}
@media (max-width: 600px) {
    .hide-mobil-types {
        display: none !important;
    }

    .show-mobil-types {
        display: flex !important;
        width: 100% !important;
        height: 50px !important; 
    }
 
}

.hide-desktop-types {
    display: none;
}
</style>
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