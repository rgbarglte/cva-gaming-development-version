<template>
    <el-col class="card shadow" v-loading="loadingCard">
        <div class="card-header bg-transparent">
            <div class="row align-items-center">
                <div class="col">
                    <h2 class="mb-0">Mejores marcas</h2>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-12" style="margin-bottom:20px">
                <el-date-picker v-model="search.date" type="daterange" start-placeholder="Fecha de inicio"
                    end-placeholder="Fecha final" :default-time="[
                        startDate[0],
                        startDate[1],
                    ]" @change="reSearch()" />
            </div>
                <div class="col-12">
                    <apexchart width="100%" type="area" :options="options" :series="series" v-if="loadingChart" />
                </div>
            </div>
        </div>
    </el-col>
</template>
     
    
    
<script>
import sdk from '@/sdk/bundle.js';

export default {
    data() {
        return {
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }],
            selectAgents: [],
            loadingAgents: false,

            users: [],
            loadingChart: false,
            loadingCard: true,
            search: {
                date : sdk.tools.getCurrentMonthDate()
            },
            startDate : sdk.tools.getCurrentMonthDate()
        };
    },
    created() {
        sdk.general.chart.bestBrandsCredit(sdk.tools.getCurrentMonthDate()).then(data => {
            var brands = []
            var amounts = []
            data[0].forEach(element => {
                brands.push(element.brand)
                amounts.push(element.credit)
            });
            console.log(brands,amounts)
            this.series = [{
                name: 'Ganancias totales',
                data: amounts
            }]

            this.options = {
                chart: {
                    id: 'yt',
                    group: 'social',
                    type: 'area',
                    height: 160
                },
                colors: ['#00E396'],
                theme: {
                    mode: 'ligth',
                    palette: 'palette10',
                },
                stroke: {
                    curve: 'smooth',
                },
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: brands,
                    points: amounts
                }
            };
            this.loadingChart = true;
            this.loadingCard = false;

            //             data[0].forEach(function callback(value, index) {

            //   console.log(`${index}: ${value}`);
            // });
        });

    },
    computed: {

    },
    methods: {


        reSearch() {
            this.loadingCard = true;
        
            
            sdk.general.chart.bestBrandsCredit(this.search.date).then(data => {
            var brands = []
            var amounts = []
            data[0].forEach(element => {
                brands.push(element.brand)
                amounts.push(element.credit)
            });
            console.log(brands,amounts)
            this.series = [{
                name: 'Ganancias totales',
                data: amounts
            }]

            this.options = {
                chart: {
                    id: 'yt',
                    group: 'social',
                    type: 'area',
                    height: 160
                },
                colors: ['#00E396'],
                theme: {
                    mode: 'ligth',
                    palette: 'palette10',
                },
                stroke: {
                    curve: 'smooth',
                },
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: brands,
                    points: amounts
                }
            };
            this.loadingChart = true;
            this.loadingCard = false;
            

            //             data[0].forEach(function callback(value, index) {

            //   console.log(`${index}: ${value}`);
            // });
        });



    },

    },
};


</script>