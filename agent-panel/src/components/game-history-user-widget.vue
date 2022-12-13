<template>

     
        <el-col class="card shadow"  v-loading="loadingCard">
        <div class="card-header bg-transparent">
            <div class="row align-items-center">
                <div class="col">
                    <h2 class="mb-0">Historial de juegos</h2>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <el-select disabled v-model="search.agent" placeholder="Filtrar por juego" style="width: 100%" filterable
                        @change="changeAgent()" clearable>
                        <el-option v-for="item in selectAgents" :key="item" :label="item.username" :value="item._id" />
                    </el-select>
                </div>
                <div class="col-nd-6">
                    <el-date-picker v-model="search.date" type="daterange" start-placeholder="Start date"
                        end-placeholder="End date" :default-time="[
                            startDate[0],
                            startDate[1],
                        ]" @change="reSearch()" />
                </div>
            </div>
            <el-divider border-style="dashed" />
            <div class="row">
                <div class="col-12" style="padding:0">
                    <el-table :data="history" v-loading="loadingHistory" class="table align-items-center table-flush">
                        <el-table-column label="Detalles" width="250">
                            <template #default="scope">
                                <div class="media align-items-center">
                                    <a href="#" class="avatar rounded-circle mr-3">
                                        <img alt="Image placeholder" :src="scope.row.game.thumb">
                                    </a>
                                    <div class="media-body">
                                        <span class="mb-0 text-sm"><b>{{ scope.row.game.name }}</b></span>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>


                        <el-table-column label="Accion" width="250">
                            <template #default="scope">
                                <span class="text-warning" v-if="scope.row.action == 'debit'">Arriesgado</span>
                                <span class="text-success" v-if="scope.row.action == 'credit'">Ganado</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="amount" label="Valor" />
                        <el-table-column prop="dateShort" label="Fecha del dia" />
                        <el-table-column prop="date" label="Fecha completa" />
                    </el-table>
                </div>
            </div>
        </div>
        </el-col>

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
            loadingCard : true
        };
    },
    created() {
        this.loadAgents();
        sdk.users.getAllHistoryGames({
            user: this.$props['user'],
            date: this.startDate
        }).then(data => {

            this.history = data[0];
            this.loadingHistoryRequest = true;

            
                this.loadingHistory = false;
                this.loadingCard = false;
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