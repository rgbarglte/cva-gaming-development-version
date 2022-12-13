<template>
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <div class="header-body">
          <!-- Card stats -->
           <!-- insertar widget -->
           <topWidgetsDashboard />
        </div>
      </div>
    </div>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
        <bestBrandsCredit />
        </div>
        
        <div class="col-xl-4">
          <bestPlayers />
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-xl-6 mb-5 mb-xl-0">
          <div class="card   shadow">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-uppercase text-dark ls-1 mb-1">Overview</h6>
                  <h2 class="text-black mb-0">Agentes</h2>
                </div>
                <!-- <div class="col">
                  <ul class="nav nav-pills justify-content-end">
                    <li class="nav-item mr-2 mr-md-0" data-toggle="chart" data-target="#chart-sales" data-update='{"data":{"datasets":[{"data":[0, 20, 10, 30, 15, 40, 20, 60, 60]}]}}' data-prefix="$" data-suffix="k">
                      <a href="#" class="nav-link py-2 px-3 active" data-toggle="tab">
                        <span class="d-none d-md-block">Month</span>
                        <span class="d-md-none">M</span>
                      </a>
                    </li>
                    <li class="nav-item" data-toggle="chart" data-target="#chart-sales" data-update='{"data":{"datasets":[{"data":[0, 20, 5, 25, 10, 30, 15, 40, 40]}]}}' data-prefix="$" data-suffix="k">
                      <a href="#" class="nav-link py-2 px-3" data-toggle="tab">
                        <span class="d-none d-md-block">Week</span>
                        <span class="d-md-none">W</span>
                      </a>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
            <div class="card-body">
             

             <!-- insert widget -->
             <creditDebitAgents />


            </div>
          </div>
        </div>


<div class="col-xl-6">
  <bestGamesCredit />
</div>


 

</div>
    
      <!-- Footer -->
       
    </div>

    
</template>




<script>
import sdk from '@/sdk/bundle.js';
import creditDebitAgents from '@/components/credit-debit-agents-widget.vue';
import topWidgetsDashboard from '@/components/dashaboard-top-card-widget.vue';
import bestPlayers from '@/components/best-players.vue';

import bestGamesCredit from '@/components/general/chart/bestGamesCredit.vue';

import bestBrandsCredit from '@/components/general/chart/bestBrandsCredit.vue';


export default {
  components : {
    creditDebitAgents,
    topWidgetsDashboard,
    bestPlayers,
    bestGamesCredit,
    bestBrandsCredit
  },
  data() {
    return {
       
      search: {
        date: '',
        target: '',
        type: '',
        agent : '',
      }, 
      agents : [],
    };
  },
  created() { 

     

    this.loadAgents(); 
  },
  methods: {
    searchSubmit() {
      console.log(this.search)
    },

    loadAgents() {
      sdk.users.getAllAgents(0).then(data => {
        this.agents = data; 
      }) 
    },
 
 

  },
};


</script>