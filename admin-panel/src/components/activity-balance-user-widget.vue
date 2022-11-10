<template>

    <div class="card shadow">
        <div class="card-header bg-transparent">
            <div class="row align-items-center">
                <div class="col">
                    <h2 class="mb-0">Historial de cargas / descargas</h2>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">

                <div class="col-md-12" style="padding-bottom:20px">
                    <el-date-picker v-model="search.date" type="daterange" start-placeholder="Start date"
                        end-placeholder="End date" :default-time="[
                            startDate[0],
                            startDate[1],
                        ]" @change="reSearch()" />
                </div>
            </div>
             
            <div class="row">
                <div class="col-12" style="padding:0">
                    <el-table :data="history" v-loading="loadingHistory" class="table align-items-center table-flush">



                        <el-table-column label="Tipo"  >
                            <template #default="scope">
                                <span class="text-danger" v-if="scope.row.data.ref == 'subtract'"> Descarga </span>
                                <span class="text-success" v-if="scope.row.data.ref == 'add'"> Carga </span>
                            </template>
                        </el-table-column>


                        <el-table-column label="Carga / Descarga" >
                            <template #default="scope">
                                <span class="badge badge-dot mr-4" v-if="scope.row.data.ref == 'subtract'">
                                    <i class="bg-danger"></i> {{ scope.row.data.balance.target }}
                                </span>

                                <span class="badge badge-dot mr-4" v-if="scope.row.data.ref == 'add'">
                                    <i class="bg-success"></i> {{ scope.row.data.balance.target }}
                                </span>
                            </template>
                        </el-table-column>



                        <el-table-column label="Balance antiguo" >
                            <template #default="scope">
                                <span class="badge badge-dot mr-4 text-bold">
                       {{scope.row.data.balance.old}}
                     </span>
                            </template>
                        </el-table-column>




                        <el-table-column label="Balance resultante"  >
                            <template #default="scope">
                                <span class="badge badge-dot mr-4 text-bold">
                       {{scope.row.data.balance.new}}
                     </span>
                            </template>
                        </el-table-column>


                        <el-table-column label="Fecha" >
                            <template #default="scope">
                                <span class="badge badge-dot mr-4 text-bold">
                       {{scope.row.createdAt}}
                     </span>
                            </template>
                        </el-table-column>






                    </el-table>
                </div>
            </div>
        </div>
    </div>

</template>







<script>
import sdk from '@/sdk/bundle.js';

export default {
    props: ["user"],
    data() {
        return {
            selectAgents: [],
            loadingAgents: false,
            search: {
                date: sdk.tools.getCurrentMonthDate(),
                target: '',
                type: '',
                agent: '',
            },
            agents: [],
            startDate: sdk.tools.getCurrentMonthDate(),
            users: [],
            loadingUsers: false,
            loadingUsersRequest: false,
            loadingHistory: true,
            loadingHistoryRequest: false,
        };
    },
    created() {
        this.loadAgents();
        sdk.activity.getAllBalanceByUser(this.$props['user'], 0, this.startDate).then(data => {

            this.history = data;
            this.loadingHistoryRequest = true;


            this.loadingHistory = false;

        })
    },
    computed: {
        filterAgents() {
            if (this.search.agent) {
                return this.agents.filter((item) => {
                    if (item.agent._id === this.search.agent) {
                        return item;
                    }
                })


            } else {
                return this.agents;
            }

        }
    },
    methods: {

        changeAgent() {
            this.loadingHistory = true;


            sdk.users.getAllHistoryGames({
                user: this.$props['user'],
                date: this.search.date,
            }).then(data => {

                this.history = data[0];
                this.loadingHistoryRequest = true;


                this.loadingHistory = false;

            })


        },

        reSearch() {
            sdk.users.getAllAgentsDetail({
                date: this.search.date
            }).then(data => {
                console.log(data)
                this.agents = data[0];
                this.loadingAgents = true;
                this.changeAgent();
            })

        },
        searchSubmit() {
            console.log(this.search)
        },

        loadAgents() {
            sdk.users.getAllAgents().then(data => {
                console.log(data)
                this.selectAgents = data;
            })
        },



    },
};


</script>