<template>


    <div class="col-md-12" style="padding-top:20px">
        <el-select v-model="search.user" placeholder="Buscar agente..." style="width: 100%" filterable
            @change="changeAgent()" clearable>
            <el-option v-for="item in users" :key="item" :label="item.username" :value="item._id" style="height: 40px;">
                <div class="media align-items-center">
                    <div href="#" class="avatar rounded-circle mr-3" style="height:30px;width:30px;">
                        <img style="height:30px;width:30px;" alt="Image placeholder"
                            :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + item.username">
                    </div>
                    <div class="media-body">
                        <span class="mb-0 text-sm bold"><b>{{ item.username }}</b></span>
                    </div>
                </div>
            </el-option>
        </el-select>

        <el-tree :data="usersTest" node-key="id" default-expand-all :expand-on-click-node="false" @node-click="selectedTree">
            <template #default="{ node, data }">

                <div class="media align-items-center"  >
                    <div class="avatar rounded-circle mr-3" style="height:30px;width:30px;">
                        <img style="height:30px;width:30px;" alt="Image placeholder"
                            :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + data.username">
                    </div>
                    <div class="media-body">
                        <span class="mb-0 text-sm bold"><b>{{ data.username }}</b></span>
                    </div>
                </div>
            </template>
        </el-tree>
    </div>

</template>


<style  >
.el-tree-node__content {
    /* width: 100%; */
    height: 50px !important;
}

/* .el-tree-node { 
    height: 50px !important;
} */
</style>

<script>
import sdk from '@/sdk/bundle.js';

export default {
    props: {
        teste: {
        type: Function
      }
    },
    data() {
        return {
            usersTest: [],
            users: [],
            search: {
                date: '',
                target: '',
                type: '',
                user: '',
            },
            chat: {
                target: null,
                chats: [],
                data: {},
                message: null,
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
        });

 
        this.loadUsers();
    },
    methods: {
        selectedTree(item,node) { 
            this.$emit('change',{ target : [item._id,node.parent.data._id] , selected : item._id })
        },
        selectUser(user,user2) {
            // console.log('teste',user2)
            // this.$emit('change',{ target : [user,user2] , selected : user })
        },
        openChat(item) {
            // this.chat.target = item._id;
            // this.chat.data = item;
            // this.loadChats(item._id)
        },
        
        loadUsers() {
            sdk.general.chat.users().then(data => {
                console.log('raa2', data)
                this.usersTest = data[0]
            })

            sdk.users.getAll(0).then(data => {
                this.users = data;
                this.loading.users = false;
            })
        }
    },
};


</script>