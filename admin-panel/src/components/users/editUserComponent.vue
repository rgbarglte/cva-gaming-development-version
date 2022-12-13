<template>

    <el-dialog v-model="showDialog" title="Editar jugador" min-width="50%" :before-close="handleClose">


        <el-tabs v-model="activeTabNewForm" class="demo-tabs" v-if="loadingTabs">
            <el-tab-pane label="Usuario" name="Usuario" active>

                <form class="form-row">
                    <div class="form-group col-6">
                        <label class="form-control-label">E-Mail</label>
                        <input type="email" class="form-control form-control-alternative" v-model="forms.user.email" />
                    </div>

                    <div class="form-group col-6">
                        <label class="form-control-label">Nombre de usuario</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.username" />
                    </div>

                    <div class="form-group col-6">
                        <label class="form-control-label">Apodo</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.nickname" />
                    </div>

                    <div class="form-group col-6">
                        <label class="form-control-label">Contraseña</label>
                        <input type="password" class="form-control form-control-alternative"
                            v-model="forms.user.password" />
                    </div>

                    <div class="form-group col-12">
                        <label class="form-control-label">Balance</label>
                        <el-input-number v-model="forms.user.balance" :min="0" :max="15000" controls-position="right"
                            size="large" style="width:100%;" />
                    </div>


                    <div class="form-group col-12" v-if="!$props['agentmode']">
                        <label class="form-control-label" style="display:block">Tipo de usuario</label>
                        <el-radio-group v-model="forms.user.isAgent">
                            <el-radio :label="true" size="large" border>Agente</el-radio>
                            <el-radio :label="false" size="large" border>Jugador</el-radio>
                        </el-radio-group>
                    </div>

                    <div class="form-group col-12" v-if="(!$props['agentmode'] && forms.user.isAgent == true)">
                        <label class="form-control-label" style="display:block">Selecciona una moneda</label>
                        <el-radio-group v-model="forms.user.currency">
                            <el-radio label="EUR" size="large" border>EUR</el-radio>
                            <el-radio label="USD" size="large" border>USD</el-radio>
                            <el-radio label="PKR" size="large" border>PKR</el-radio>
                        </el-radio-group>
                    </div>



                    <div class="form-group col-12" v-if="!$props['agentmode'] && forms.user.isAgent == false">
                        <label class="form-control-label" style="display:block">Selecciona un agente</label>
                        <el-select v-model="forms.user.agent_id" placeholder="Selecciona un agente" style="width: 100%"
                            filterable>
                            <el-option v-for="item in agents" :key="item" :label="item.username" :value="item._id" />
                        </el-select>
                    </div>


                    <div class="form-group col-12">
                        <label class="form-control-label" style="display:block">Estado</label>
                        <el-radio-group v-model="forms.user.isDelete">
                            <el-radio label="true" size="large" border>Usuario eliminado</el-radio>
                            <el-radio label="false" size="large" border>Usuario activo</el-radio>

                        </el-radio-group>
                    </div>

                </form>
            </el-tab-pane>





            <el-tab-pane label="Perfil publico" name="Perfil publico">

                <form class="form-row">


                    <div class="form-group col-6">
                        <label class="form-control-label">Nombre</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.profile.firstname" />
                    </div>


                    <div class="form-group col-6">
                        <label class="form-control-label">Apellido</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.profile.lastname" />
                    </div>


                    <div class="form-group col-6">
                        <label class="form-control-label">Telefono</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.profile.phone" />
                    </div>



                    <div class="form-group col-6">
                        <label class="form-control-label">Direccion</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.profile.address" />
                    </div>


                    <div class="form-group col-6">
                        <label class="form-control-label">Ciudad</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.profile.city" />
                    </div>

                    <div class="form-group col-6">
                        <label class="form-control-label">Pais</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.profile.country" />
                    </div>


                    <div class="form-group col-6">
                        <label class="form-control-label">Codigo postal</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.profile.zip" />
                    </div>



                    <div class="form-group col-12">
                        <label class="form-control-label">Sobre el usuario</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.profile.about" />
                    </div>



                </form>

            </el-tab-pane>


            <el-tab-pane label="Marcas" name="Marcas" v-if="!$props['agentmode']">
                <div class="form-group col-12">
                    <div class="form-froup">
                        <Toggle v-model="forms.user.enabledAllBrands" /> Todas las marcas de juegos
                        disponibles
                    </div>

                    <div class="form-groupd" v-if="!forms.user.enabledAllBrands" style="margin-top:20px;">
                        <el-select multiple v-model="forms.user.brands" placeholder="Selecciona las marcas disponibles"
                            style="width: 100%" filterable>
                            <el-option v-for="item in brands" :key="item" :label="item.internal" :value="item.name" />
                        </el-select>
                    </div>
                </div>

            </el-tab-pane>

            <el-tab-pane label="Juegos" name="Juegos" v-if="!$props['agentmode']">
                <div class="form-group col-12">
                    <div class="form-froup">
                        <Toggle v-model="forms.user.enabledAllGames" disabled /> Todos los juegos
                        disponibles
                    </div>
                </div>



            </el-tab-pane>
             


            <el-tab-pane label="Perfil del agente" name="perfil agente"
                v-if="(!$props['agentmode'] && forms.user.isAgent && forms.user.agent_data)">
                <form class="form-row">
                    <div class="form-group col-12">
                        <label class="form-control-label">Comisiones</label>
                        <div class="form-froup">
                            <Toggle v-model="forms.user.automatically_settle" /> Liquidar automaticamente
                            <p v-if="!forms.user.automatically_settle" style="margin-top:5px;font-size:12px;"> Se
                                liquidara :
                                <b>Mensualmente</b>
                            </p>
                            <p v-if="forms.user.automatically_settle" style="margin-top:5px;font-size:12px;"> Se
                                liquidara :
                                <b>Anualmente</b>
                            </p>
                        </div>
                    </div>
                    <div class="form-group col-6">
                        <label class="form-control-label">Nombre</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.agent_data.firstname" />
                    </div>
                    <div class="form-group col-6">
                        <label class="form-control-label">Apellido</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.agent_data.lastname" />
                    </div>
                    <div class="form-group col-6">
                        <label class="form-control-label">Telefono</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.agent_data.phone" />
                    </div>
                    <div class="form-group col-6">
                        <label class="form-control-label">D.N.I</label>
                        <input type="text" class="form-control form-control-alternative"
                            v-model="forms.user.agent_data.dni" />
                    </div>
                </form>
            </el-tab-pane>
        </el-tabs>


        <div class="modal-footer">
            <el-button type="button" class="btn btn-secondary" @click.prevent="showDialog = false"  size="large" >Cancelar</el-button>
            <el-button type="button" class="btn btn-primary" @click.prevent="saveUser()"  size="large" :loading="loading.editButton">Editar usuario</el-button>
        </div>
    </el-dialog>

</template>





<script>
import sdk from '@/sdk/bundle.js';

export default {
    props:['agentmode'],
    emits: ['change'],
    data() {
        return {
            loadingTabs: false,
            showDialog: false,
            deleteUserTarget: '',
            search: {
                user: '',
                date: '',
                target: '',
                type: '',
            },

            activeTabNewForm: 'Usuario',
            pagination: {
                users: 0,
                brands: 0,
            },
            loading: {
                editButton : false,
                users: true,
            },
            editBalance: {
                type: 'add',
                balance: 0,
                user: {}
            },
            users: [],
            brands: [],
            agents: [],
            userData: {},
            forms: {
                user: {
                    currency: 'PKR',
                    email: '',
                    password: '',
                    username: '',
                    nickname: '',
                    balance: 0,
                    isDelete: false,
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
        this.loadUsers();
        this.loadBrands();
        this.loadAgents();
    },
    computed: {
        filterAgents() {
            if (this.search.user) {
                return this.users.filter((item) => {
                    if (item._id === this.search.user) {
                        return item;
                    }
                })
            } else {
                return this.users;
            }
        }
    },
    methods: {
        handleClose() {
            this.loadingTabs = false;
            this.forms = {
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
            };
            this.showDialog = false;
        },


        openDialog(id,callback) {

            sdk.users.get(id).then(data => {
                this.forms.user = data[0];
                this.userData = data[0]
                this.loadingTabs = true;
                this.showDialog = true;
                callback(true)
            })


        },

        loadAgents() {
            sdk.users.getAllAgents(this.pagination.users).then(data => {
                this.agents = data;
            })
        },

        loadUsers() {
            sdk.users.getAll(this.pagination.users).then(data => {
                this.users = data;
                this.loading.users = false;
            })
        },

        loadBrands() {
            sdk.brands.getAll(this.pagination.brands).then(data => {
                this.brands = data;
            })
        },
        saveUser() {
            this.loading.editButton = true;
            sdk.users.edit(this.userData._id, this.forms.user).then(data => {
                if (data.error) {
                    this.loading.editButton = false;
                    return this.$toast.show(
                        data.message,
                        {
                            position: "bottom-right"
                        }
                    )
                }

                this.$toast.success(
                    "El usuario fue editado correctamente",
                    {
                        position: "bottom-right"
                    }
                )

                setTimeout( () => {
                    this.loading.editButton = false;
                    this.showDialog = false;
                },1000)
                this.$emit('change')

            })
        },

    },
};


</script>