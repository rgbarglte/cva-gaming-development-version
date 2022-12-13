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

      <div class="row mt-5" >
        <div class="col-xl-6 mb-5 mb-xl-0" v-if="!modeAgent">
          <div class="card   shadow">
            <div class="card-header bg-transparent">
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-uppercase text-dark ls-1 mb-1">Overview</h6>
                  <h2 class="text-black mb-0">Agentes</h2>
                </div> 
              </div>
            </div>
            <div class="card-body">
             

             <!-- insert widget -->
             <creditDebitAgents />


            </div>
          </div>
        </div>
      

    
            <div class="col-xl-12" v-if="modeAgent">
  <bestGamesCredit />
</div>
          



     
            <div class="col-xl-6"  v-if="!modeAgent">
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
      modeAgent : false,
       
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

    sdk.users.auth().then(data => {
      this.modeAgent = data[0].isAgent; 
    })

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