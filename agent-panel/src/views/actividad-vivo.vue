<template>
    <!-- Header -->
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style="min-height: 600px; background-image: url(../assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
        <!-- Mask -->
        <span class="mask bg-gradient-default opacity-8"></span>
        <!-- Header container -->
        <div class="container-fluid d-flex align-items-center">
            <div class="row">
                <div class="col-lg-8 col-md-10">
                    <h1 class="display-2 text-white">Actividad en tiempo real</h1>
                    <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with
                        your work and manage your projects or assigned tasks</p>
                    <!-- <a href="#!" class="btn btn-info">Edit profile</a> -->
                </div>
            </div>
        </div>
    </div>
    <!-- Page content -->
    <div class="container-fluid mt--7">
        <div class="row">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div class="card card-profile shadow">

                    <div class="row justify-content-center">
                        <div class="col-lg-3 order-lg-2">
                            <div class="card-profile-image">
                                <a href="#">
                                    <img src="../assets/img/theme/team-4-800x800.jpg" class="rounded-circle">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                        <div class="d-flex justify-content-between">
                            <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                            <a href="#" class="btn btn-sm btn-default float-right">Message</a>
                        </div>
                    </div>
                    <div class="card-body pt-0 pt-md-4">
                        <div class="row">
                            <div class="col">
                                <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                    <div>
                                        <span class="heading">22</span>
                                        <span class="description">Friends</span>
                                    </div>
                                    <div>
                                        <span class="heading">10</span>
                                        <span class="description">Photos</span>
                                    </div>
                                    <div>
                                        <span class="heading">89</span>
                                        <span class="description">Comments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <h3>
                                Jessica Jones<span class="font-weight-light">, 27</span>
                            </h3>
                            <div class="h5 font-weight-300">
                                <i class="ni location_pin mr-2"></i>Bucharest, Romania
                            </div>
                            <div class="h5 mt-4">
                                <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                            </div>
                            <div>
                                <i class="ni education_hat mr-2"></i>University of Computer Science
                            </div>
                            <hr class="my-4" />
                            <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                                and records all of his own music.</p>
                            <a href="#">Show more</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-8 order-xl-1">
                <div class="card bg-secondary shadow">
                    <div class="card-header bg-white border-0">
                        <div class="row align-items-center">

                            <div class="col">
                                <div class="card card-stats mb-4 mb-xl-0">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col">
                                                <h5 class="card-title text-uppercase text-muted mb-0">Ganado</h5>
                                                <span class="h2 font-weight-bold mb-0">{{amounts.credit}}</span>
                                            </div>
                                            <div class="col-auto">
                                                <div
                                                    class="icon icon-shape bg-success text-white rounded-circle shadow">
                                                    <i class="fas fa-chart-bar"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                    <span class="text-nowrap">Since last month</span>
                  </p> -->
                                    </div>
                                </div>
                            </div>



                            <div class="col">
                                <div class="card card-stats mb-4 mb-xl-0">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col">
                                                <h5 class="card-title text-uppercase text-muted mb-0">Perdido</h5>
                                                <span class="h2 font-weight-bold mb-0">{{amounts.debit}}</span>
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
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="card-body">
                        <el-timeline style=" display: flex;
    flex-direction: column-reverse;">
                            <el-timeline-item :timestamp="activity.date" placement="top" v-for="activity in activities">
                                <el-card v-if="activity.type == 'debit'">
                                    <h4>Debito </h4>
                                    <p>Balance debitado al usuario : {{activity.amount}}</p>
                                </el-card>

                                <el-card v-if="activity.type == 'credit'">
                                    <h4>Credito</h4>
                                    <p>Balance acreditado al usuario : {{activity.amount}}</p>
                                </el-card>
                            </el-timeline-item>
                            <!-- <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>Update Github template</h4>
        <p>Tom committed 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item> -->
                        </el-timeline>
                    </div>
                </div>
            </div>
        </div>
        <!-- Footer -->
        <footer class="footer">
            <div class="row align-items-center justify-content-xl-between">
                <div class="col-xl-6">
                    <div class="copyright text-center text-xl-left text-muted">
                        &copy; 2018 <a href="https://www.creative-tim.com" class="font-weight-bold ml-1"
                            target="_blank">Creative Tim</a>
                    </div>
                </div>
                <div class="col-xl-6">
                    <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                        <li class="nav-item">
                            <a href="https://www.creative-tim.com" class="nav-link" target="_blank">Creative Tim</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://www.creative-tim.com/presentation" class="nav-link" target="_blank">About
                                Us</a>
                        </li>
                        <li class="nav-item">
                            <a href="http://blog.creative-tim.com" class="nav-link" target="_blank">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                                class="nav-link" target="_blank">MIT License</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>
</template>





<script>
import sdk from '@/sdk/bundle.js';

export default {
    data() {
        return {
            users: [],
            search: {
                date: '',
                target: '',
                type: '',
            },
            chat: {
                tager: null,
                chats: []
            },
            activeTabNewForm: 'Usuario',
            pagination: {
                activity: 0,
                brands: 0,
            },
            loading: {
                activity: true,
            },
            editBalance: {
                type: 'add',
                balance: 0,
                user: {}
            },
            activity: [],
            brands: [],
            activities: [],
            amounts : {
                credit : 0,
                debit : 0,
            },
            forms: {
                user: {
                    email: '',
                    password: '',
                    username: '',
                    nickname: '',
                    balance: 0,
                    isAgent: false,
                    automatically_settle: false,
                    enabledAllBrands: true,
                    brands: [],
                    enabledAllGames: true,
                    games: [],
                    agent_data: {
                        firstname: '',
                        lastname: '',
                        phone: '',
                        dni: ''
                    },
                    profile: {
                        firstname: '',
                        lastname: '',
                        address: '',
                        city: '',
                        country: '',
                        zip: '',
                        about: '',
                    },
                }
            }
        };
    },
    created() {
        sdk.socket.connect(localStorage.getItem('auth')).then(socket => {

            sdk.socket.joinActivityLive(this.$route.params.id);


            socket.on('back-activity-join-room', (response) => {
                this.$toast.success(
                    "Conectado al socket de actividad " + response.user,
                    {
                        position: "bottom-right"
                    }
                )
            })

            socket.on('credit-game', (response) => {
                response.type = "credit";
                response.date = new Date;
                this.amounts.credit = this.amounts.credit + parseFloat(response.amount);
                response.msg = 'Balance acreditado al usuario : ' + response.amount;
                if(!response.amount == 0) {
                    this.activities.push(response);
                }
                // this.activities.push(response);
            })


         

            socket.on("debit-game", (response) => {
                this.amounts.debit = this.amounts.debit + parseFloat(response.amount);
                response.type = "debit";
                response.date = new Date;
                response.msg = 'Balance debitado al usuario : ' + response.amount;
                this.activities.push(response);
            })
        });



        sdk.users.get(this.$route.params.id).then(data => {
            this.user = data;
            this.loading.users = false;
        })
    },
    methods: {

    },
};


</script>