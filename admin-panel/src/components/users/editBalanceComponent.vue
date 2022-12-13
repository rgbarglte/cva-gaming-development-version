 
<template>

    <el-dialog v-model="showDialog" title="Editar balance" min-width="50%" :before-close="handleClose">
        <table class="table align-items-center table-flush">
            <thead class="thead-light">
                <tr>
                    <th scope="col">Detalles</th>
                    <th scope="col">Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">
                        <div class="media align-items-center">
                            <a href="#" class="avatar rounded-circle mr-3">
                                <img alt="Image placeholder"
                                    :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + editBalance.user.username">
                            </a>
                            <div class="media-body">
                                <span class="mb-0 text-sm">{{ editBalance.user.username }}</span>
                            </div>
                        </div>
                    </th>
                    <td>
                        {{ editBalance.user.balance }}

                        <span class="text-success" v-if="editBalance.type == 'add'">+ {{ editBalance.balance
                        }}</span>

                        <span class="text-danger" v-if="editBalance.type == 'subtract'">- {{ editBalance.balance
                        }}</span>

                    </td>



                </tr>
            </tbody>
        </table>

        <div class="col-12">
            <label class="form-control-label" style="display:block">Tipo de operacion</label>
            <el-radio-group v-model="editBalance.type">
                <el-radio label="add" size="large" border>Agregar</el-radio>
                <el-radio label="subtract" size="large" border>Restar</el-radio>
            </el-radio-group>
        </div>

        <el-divider border-style="dashed" />
        <div class="col-12">
            <label class="form-control-label" style="display:block">Monto</label>
            <el-radio-group v-model="editBalance.balance">
                <el-radio label="50" size="large" border>50</el-radio>
                <el-radio label="100" size="large" border>100</el-radio>
                <el-radio label="150" size="large" border>150</el-radio>
                <el-radio label="250" size="large" border>250</el-radio>
                <el-radio label="350" size="large" border>350</el-radio>
                <el-radio label="450" size="large" border>450</el-radio>
                <el-radio label="1000" size="large" border>1000</el-radio>
            </el-radio-group>
        </div>


        <el-divider border-style="dashed" />

        <div class="col-12">
            <label class="form-control-label" style="display:block">O puedes ingresar un monto</label>
            <el-input-number v-model="editBalance.balance" :min="1" :max="15000" controls-position="right" size="large"
                @change="handleChange" style="width:100%;" />
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click.prevent="showDialog = false">Cancelar</button>
            <button type="button" class="btn btn-primary" @click.prevent="saveBalance()">Editar balance</button>
        </div>
    </el-dialog>

</template>
 





 
<script>
import sdk from '@/sdk/bundle.js';
import dialogCreateUser from '@/components/users/create-dialog.vue';
import ComponentDialogEditUser from '@/components/users/editUserComponent.vue';

export default {
    emits: ['change'],
    components: {
        dialogCreateUser,
        ComponentDialogEditUser
    },
    data() {
        return {
            showDialog: false,
            deleteDialog: false,
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

    },
    computed: {

    },
    methods: {

        saveBalance() {
            if (this.editBalance.type == "add") {
                sdk.users.balanceAdd(true, this.editBalance.user._id, this.editBalance.balance).then(data => {
                    if (data.error) {
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
                    this.showDialog = false;
                    this.$emit('change')
                })
            }


            if (this.editBalance.type == "subtract") {
                sdk.users.balanceSubtract(true, this.editBalance.user._id, this.editBalance.balance).then(data => {
                    if (data.error) {
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

                    this.showDialog = false;
                    this.$emit('change')
                })
            }

        },

        openDialog(user, callback) {
            setTimeout(() => {
                this.editBalance.user = user;
                this.showDialog = true;
                callback(true)
            }, 500)
        }

    },
};


</script>