<template>

     
    <el-col class="card shadow"  v-loading="loadingCard">
    <div class="card-header bg-transparent">
        <div class="row align-items-center">
            <div class="col">
                <h2 class="mb-0">Mejores jugadores</h2>
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
        </div>
        <!-- <el-divider border-style="dashed" /> -->
        <div class="row">
            <div class="col-12" style="padding:0">
                <el-table :data="history" v-loading="loadingHistory" class="table align-items-center table-flush">
                    <el-table-column label="Detalles" width="250">
                        <template #default="scope">
                            <div  class="media align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder"
                                :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + scope.row._id.user.username">
                        </a>
                        <div class="media-body">
                            <span class="mb-0 text-sm bold"><b>{{ scope.row._id.user.username }}</b></span>
                        </div>
                    </div>
                        </template>
                    </el-table-column>



                    <el-table-column label="Ganado" min-width="150px"  >
                        <template #default="scope">
                            <i class="fas fa-arrow-up text-success mr-3"></i> {{scope.row.amount}}
                        </template>
                    </el-table-column>

 

                    <el-table-column label="" min-width="150px" >
                        <template #default="scope">
                            <a :href="'/jugadores/' + scope.row._id._id" class="btn btn-primary btn-sm">Revisar</a>
                        </template>
                    </el-table-column>
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
    sdk.users.gestPlayers({ 
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


        sdk.users.gestPlayers({ 
            date: this.search.date,
        }).then(data => {

            this.history = data[0];
            this.loadingHistoryRequest = true;

       
                this.loadingHistory = false;
           
        })


    },

    reSearch() {
        sdk.users.gestPlayers({
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