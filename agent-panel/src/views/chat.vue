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

      









      
      <div class="col-12">
        <div class="card shadow">
          <div class="card-header border-0">

            <h3 class="mb-0">Bandeja de entrada</h3>

            <div class="row">

              <div class="col-md-4" style="padding-top:20px"> <treeUsers @change="changeUser" /></div>
              <div class="col-md-8" style="padding-top:0;">

               <listMessages  :users="usersSelected" v-if="listMessagesShow" />

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
import treeUsers from '@/components/general/chat/agents.vue'
import listMessages from '@/components/general/chat/chat.vue'
export default {
  components: {
    treeUsers,
    listMessages
  },
  data() {
    return {
      listMessagesShow : false,
      usersSelected : [],
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
      
      socket.on('chat-message-client', (response) => {
        console.log('chat', response)
        response.remote = true;
        response.message = response.msg;
        this.chat.chats.push(response)
      })
    });
    this.loadUsers();
  },
  methods: {
    changeUser(data) {
      this.listMessagesShow = false;
      setTimeout(() => {
        this.usersSelected = data.target 
      console.log('chat view',this.usersSelected) 
      this.listMessagesShow = true; 
      },500)
    },
    openChat(item) {
      this.chat.target = item._id;
      this.chat.data = item;
      this.loadChats(item._id)
    },
    sendChat() {
      this.chat.chats.push({
        message: this.chat.message,
        remote: false,
      })
      const container = this.$refs.containerChat;
      container.scrollTop = container.scrollHeight;

      sdk.socket.sendChat({
        auth: localStorage.getItem('auth'),
        userid: '12313123',
        type: "message",
        msg: this.chat.message,
        to: this.chat.target,
        attach: null
      })

      this.chat.message = null;
    },
    loadUsers() {
      sdk.users.getAll(0).then(data => {
        this.users = data;
        this.loading.users = false;
      })
    }
  },
};


</script>