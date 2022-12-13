<template>






























    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
        <div class="container-fluid">
            <div class="header-body">
                <!-- Card stats -->
                <div class="row">

                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid mt--7">
        <!-- Table -->
        <div class="row">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">

                        <h3 class="mb-0">Detalles del agente</h3>

                        <div class="row">






                            <div class="col-12" style="margin-top:20px;margin-bottom:20px;">
                                <div class="row">
                                    
                                    <div class="col-md-6">
                                        <el-date-picker v-model="search.date" type="daterange"
                                            start-placeholder="Start date" end-placeholder="End date" :default-time="[
                                                startDate[0],
                                                startDate[1],
                                            ]" @change="reSearch()" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-12" style="padding: 0;">

                                <el-table :data="filterAgents" sum-text="Total" show-summary
                                    class="table align-items-center table-flush">
                                    <el-table-column label="Detalles" width="250">
                                        <template #default="scope">
                                            <a :href="'/agentes/' + scope.row.agent._id"
                                                class="media align-items-center">
                                                <a href="#" class="avatar rounded-circle mr-3">
                                                    <img alt="Image placeholder"
                                                        :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + scope.row.agent.username">
                                                </a>
                                                <div class="media-body">
                                                    <span class="mb-0 text-sm bold"><b>{{ scope.row.agent.username
                                                    }}</b></span>
                                                </div>
                                            </a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="debit" label="Arriesgado" />
                                    <el-table-column prop="credit" label="Ganado" />
                                    <el-table-column prop="neto" label="Neto" />
                                </el-table>



                            </div> 
 

                        </div>


                    </div>




                </div>
            </div>
        </div>

    </div>


    <div class="container-fluid" style="margin-top:30px;margin-bottom:30px;">
        <!-- Table -->
        <div class="row">
            <div class="col">
                <div class="card shadow">
                    <div class="card-header border-0">

                        <h3 class="mb-0">Jugadores</h3>

                        <div class="row">





 
                            <div class="col-12" style="padding:0;margin-top: 20px;" v-if="loadingUsers">
                                <el-table :data="users" sum-text="Total" v-loading="loadingUsersRequest" show-summary
                                    class="table align-items-center table-flush">
                                    <el-table-column label="Detalles" width="250">
                                        <template #default="scope">
                                            <div class="media align-items-center">
                                                <a href="#" class="avatar rounded-circle mr-3">
                                                    <img alt="Image placeholder"
                                                        :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + scope.row.user.username">
                                                </a>
                                                <div class="media-body">
                                                    <span class="mb-0 text-sm"><b>{{ scope.row.user.username
                                                    }}</b></span>
                                                </div>
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="debit" label="Arriesgado" />
                                    <el-table-column prop="credit" label="Ganado" />
                                    <el-table-column prop="neto" label="Neto" />

                                    <el-table-column label=""   >
                                        <template #default="scope">
                                            <a :href="'/jugadores/' + scope.row.user._id" class="btn btn-primary btn-sm">Ver / Editar perfil</a>
                                           
                                        </template>
                                    </el-table-column>

                                    <el-table-column label=""   >
                                        <template #default="scope">
                                             <a :href="'/actividad/vivo/' + scope.row.user._id" class="btn btn-primary btn-sm">Vista en vivo</a>
                                        </template>
                                    </el-table-column>


                                </el-table>

                            </div>





















                        </div>


                    </div>




                </div>
            </div>
        </div>

    </div>

 
</template>
 


<script>
import sdk from '@/sdk/bundle.js';

export default {
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
            loadingUsers: true,
            loadingUsersRequest: true,
        };
    },
    created() {
        this.loadAgents();
        sdk.users.getAllAgentsDetail({
            date: this.startDate
        }).then(data => {

            this.agents = data[0].filter((item) => {
                if (item.agent._id === this.$route.params.id) {
                    return item;
                }
            })


            this.loadingAgents = true;
        })

        this.changeAgent();
    },
    computed: {
        filterAgents() {
            if (this.search.agent) {
                return this.agents.filter((item) => {
                    if (item.agent._id === this.$route.params.id) {
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
            this.loadingUsersRequest = true;
            sdk.users.getAllDetailUsersByAgent({
                date: this.search.date,
                agent: this.$route.params.id
            }).then(data => {
                this.users = data[0]
                this.loadingUsers = true;
                this.loadingUsersRequest = false;
            })
        },

        reSearch() {
            sdk.users.getAllAgentsDetail({
                date: this.search.date
            }).then(data => {
                console.log(data)
                this.agents = data[0].filter((item) => {
                if (item.agent._id === this.$route.params.id) {
                    return item;
                }
            })

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