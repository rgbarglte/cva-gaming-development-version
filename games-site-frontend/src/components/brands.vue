<template>
    <div class="section-top ">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2" style="padding-top:15px">
                    <input type="text" class="form-control" @click.prevent="openModal()"
                        style="height: 30px;border:none;font-size:12px;background:rgb(0,0,0,0.3) !important"
                        placeholder="Search game...." />
                </div>
                <div class="col-md-10">
                    <el-scrollbar>
                        <div class="scrollbar-flex-content">

                            <a v-for="item in 30" v-if="loading.brands" href="" @click.prevent=""
                                class="scrollbar-demo-item"
                                style="heigth:25px;background: rgba(255, 255, 255, 0.05);border-radius: 5px;    height: 35px !important">

                            </a>

                            <a v-for="item in brands" v-if="loading.brands == false" :href="'/brand/' + item.slug"
                                class="scrollbar-demo-item">
                                <img :src="imageCdn + 'brands/' + item.thumb"  class="img-fluid"
                                    style="height: 35px;" v-if="item.thumb" /> 
                                    <span v-if="!item.thumb">{{ item.name }}</span>
                            </a>
                        </div>
                    </el-scrollbar>
                </div>

            </div>
        </div>
    </div>






    <!-- Modal -->
    <div class="modal fade" id="searchGameModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form class="modal-body" style="padding:2rem">


                    <div class="col-12" style="color:white;font-size:14px;padding:0">
                        Buscar juegos..<br />
                        <p style="font-size:12px;opacity:0.8;padding:0">Reprehenderit mollit elit exercitation consequat
                            do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt
                            fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum
                            adipisicing aliqua.</p>
                    </div>

                    <input type="text" class="form-control input-search-games" placeholder="Texto de busqueda..."
                        @keyup.prevent="searchSubmit()" v-model="search.query" style="margin-bottom:25px" />


                    <div class="col-md-12 text-center" v-if="loading.search">
                        <div class="spinner-border text-info" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>


                    <div class="col-12" style="color:white;font-size:14px;padding:0"
                        v-if="search.loading == false && search.results.length == 0">
                        No se encontraron resultados..<br />
                        <p style="font-size:12px;opacity:0.8;padding:0">Reprehenderit mollit elit exercitation consequat
                            do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt
                            fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum
                            adipisicing aliqua.</p>
                    </div>



                    <el-scrollbar max-height="600px">
                        <a :href="'/game/' + item.internal.category + '/' + item._id" style="    width: 100%;
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
    padding-top:5px;padding-bottom: 5px;" v-for="item in search.results">
                            <img :src="item.internal.image" class="img-fluid"
                                style="height: 50px;width:50px;margin-right: 10px;" />

                            {{ item.internal.name }}
                        </a>

                    </el-scrollbar>

                </form>
            </div>
        </div>
    </div>




</template>



<style scoped>
@media (max-width: 800px) {
    .hide-mobil {
        display: none !important;
    }

    .show-mobil {
        display: flex !important;
        width: 100% !important;
        height: auto !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 2000 !important;
    }

    .scrollbar-demo-item {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-width: 40px;
        max-width: 200px;
        height: 50px;
        margin: 10px;
        text-align: center;
        border-radius: 4px;
        background: transparent;
        color: var(--el-color-danger);
        color: white;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        line-height: 16px;
    }

    .container-fluid {
        padding: 0;
        margin: 0;
    }
}

.hide-desktop {
    display: none;
}
</style>

<script>
import sdk from '@/assets/sdk/bundle.js';
export default {
    data() {
        return {
            search: {
                query: null,
                results: []
            },
            pagination: {
                brands: 1,
            },
            loading: {
                search: false,
                brands: true,
            },
            brands: [],
            imageCdn : sdk.settings.imageCdn
        };
    },
    created() {
        sdk.brands.getAll(this.pagination.brands).then(data => {
            this.brands = data;
            setTimeout(() => {
                this.loading.brands = false;
            }, 600)
        })
    },
    methods: {
        searchSubmit() {
            this.loading.search = true;
            sdk.games.search(this.search.query).then(data => {
                this.search.results = data;
                setTimeout(() => {
                    this.loading.search = false;
                }, 600)
            })
        },
        openModal() {
            $('#searchGameModal').modal('show');
            $('.input-search-games').trigger('focus');
        }
    },
};


</script>