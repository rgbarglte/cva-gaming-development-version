<template>
<el-col   v-loading="loadingCard"  >

     <div class="col-12"  style="margin-bottom: 20px;">
        <div class="row">
            <div class="col-md-6">


                <el-select v-model="search.agent" placeholder="Selecciona un agente" style="width: 100%" filterable
                    @change="changeAgent()" clearable>

                    <el-option v-for="item in selectAgents" :key="item" :label="item.username" :value="item._id"
                        style="height: 40px;"> 
                        <div class="media align-items-center">
                            <a href="#" class="avatar rounded-circle mr-3" style="height:30px;width:30px;">
                                <img style="height:30px;width:30px;" alt="Image placeholder"
                                    :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + item.username">
                            </a>
                            <div class="media-body">
                                <span class="mb-0 text-sm bold"><b>{{ item.username }}</b></span>
                            </div>
                        </div> 
                    </el-option>


                    <!-- <el-option v-for="item in selectAgents" :key="item" :label="item.username" :value="item._id" /> -->
                </el-select>
            </div>
            <div class="col-md-6">
                <el-date-picker v-model="search.date" type="daterange" start-placeholder="Start date"
                    end-placeholder="End date" :default-time="[
                        startDate[0],
                        startDate[1],
                    ]" @change="reSearch()" />
            </div>
        </div>
    </div>
    <div class="col-12" style="padding: 0;"> 

        <el-table :data="filterAgents" sum-text="Total" show-summary class="table align-items-center table-flush">
            <el-table-column label="Detalles" width="250">
                <template #default="scope">
                    <a :href="'/agentes/' + scope.row.agent._id" class="media align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder"
                                :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + scope.row.agent.username">
                        </a>
                        <div class="media-body">
                            <span class="mb-0 text-sm bold"><b>{{ scope.row.agent.username }}</b></span>
                        </div>
                    </a>
                </template>
            </el-table-column>
            <el-table-column prop="debit" label="Arriesgado" min-width="150px" />
            <el-table-column prop="credit" label="Ganado" min-width="150px" />
            <el-table-column prop="neto" label="Neto" min-width="150px" />
        </el-table>



    </div>


    <el-divider border-style="dashed" v-if="loadingUsers" />
    <div class="col-12" style="padding:0" v-if="loadingUsers">
        <div class="table-responsive"  >
        <el-table :data="users" sum-text="Total" v-loading="loadingUsersRequest" show-summary
        class="table align-items-center table-flush" >
            <el-table-column label="Detalles" width="250">
                <template #default="scope">
                    <div class="media align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder"
                                :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + scope.row.user.username">
                        </a>
                        <div class="media-body">
                            <span class="mb-0 text-sm"><b>{{ scope.row.user.username }}</b></span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="debit" label="Arriesgado" min-width="150px" />
            <el-table-column prop="credit" label="Ganado" min-width="150px" />
            <el-table-column prop="neto" label="Neto" min-width="150px" />
        </el-table>
    </div>
    </div>

    </el-col>
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
            loadingUsers: false,
            loadingUsersRequest: false,
            loadingCard : true
        };
    },
    created() {
        this.loadAgents();
        sdk.users.getAllAgentsDetail({
            date: this.startDate
        }).then(data => {
            console.log(data)
            this.agents = data[0];
            this.loadingAgents = true;
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
            this.loadingUsersRequest = true;
            sdk.users.getAllDetailUsersByAgent({
                date: this.search.date,
                agent: this.search.agent
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