<template>
    <div class="row">
            <div class="col-xl-3 col-lg-6">

            
              <el-col class="card card-stats mb-4 mb-xl-0"  v-loading="loadingCards">
                 
                  
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Netwin</h5>
                      <span class="h2 font-weight-bold mb-0">{{data.netwin}}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i class="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <!-- <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p> -->
                </div>
              </el-col>
            </div>
            <div class="col-xl-3 col-lg-6">
              <el-col class="card card-stats mb-4 mb-xl-0"  v-loading="loadingCards">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Clientes creados</h5>
                      <span class="h2 font-weight-bold mb-0">{{data.users}}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i class="fas fa-chart-pie"></i>
                      </div>
                    </div>
                  </div>
                  <!-- <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-danger mr-2"><i class="fas fa-arrow-down"></i> 3.48%</span>
                    <span class="text-nowrap">Since last week</span>
                  </p> -->
                </div>
              </el-col>
            </div>
            <div class="col-xl-3 col-lg-6">
              <el-col class="card card-stats mb-4 mb-xl-0"  v-loading="loadingCards">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Cargas totales</h5>
                      <span class="h2 font-weight-bold mb-0">{{data.balanceUp}}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-yellow text-white rounded-circle shadow">
                        <i class="fas fa-users"></i>
                      </div>
                    </div>
                  </div>
                  <!-- <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-warning mr-2"><i class="fas fa-arrow-down"></i> 1.10%</span>
                    <span class="text-nowrap">Since yesterday</span>
                  </p> -->
                </div>
              </el-col>
            </div>
            <!-- <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Efectividad en tareas</h5>
                      <span class="h2 font-weight-bold mb-0">49,65%</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i class="fas fa-percent"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-success mr-2"><i class="fas fa-arrow-up"></i> 12%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div> -->
          </div>
</template>>



<script>
import sdk from '@/sdk/bundle.js';

export default {
    data() {
        return {
            selectAgents: [],
            loading: false,
            data : {},
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
            loadingCards : true,
        };
    },
    created() { 
        sdk.platform.getDetails({
            date: this.startDate
        }).then(data => {
            console.log(data)
            this.data = data[0];
            this.loadingCards = false;
        })
    },
    methods: {
 

    },
};


</script>