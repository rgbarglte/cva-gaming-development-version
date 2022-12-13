<template>
     <el-col v-loading="loading">
        <div class="col-12" style="height: calc(100vh - 200px);overflow:hidden;overflow-y:auto;" ref="containerChat">


<div class="col-12" style="padding:0" v-for="item in messages">
    <div v-if="item.userid ==  $props['users'][0]" class="col-12" style="margin-top:20px;display:flex;margin-bottom: 50px;">

        <div class="" style=" 
display: flex;
width: auto;
text-align: left;
flex-direction: column; 
">

            <!-- <b style="font-size: 13px;">Argon Design System</b> -->
            <div class="" style="   
display: flex;
width: auto;
background: rgb(243 245 251);
align-items: center;
padding: 15px 15px 15px 20px;
border-radius: 8px;
text-align: left;
margin-top: 10px; 
font-size: 15px;
padding:15px
">
                {{ item.message }}


                <!-- <small style="font-size:11px;opacity:0.8;margin-left:20px;">20/06/2022</small> -->
            </div>
        </div>
    </div>




    <div v-if="item.userid ==  $props['users'][1]" class="col-12"
        style="margin-top:20px;display:flex;margin-bottom: 50px;flex-direction: row-reverse;">
        <div class="" style=" 
display: flex;
width: auto;
text-align: left;
flex-direction: column; 
">

            <!-- <b style="font-size: 13px;">Firstname lastname</b> -->
            <div class="" style="   
display: flex;
width: auto;
background: rgb(243 245 251);
align-items: center;
padding: 15px 15px 15px 20px;
border-radius: 8px;
text-align: left;
margin-top: 10px; 
font-size: 15px;
padding:15px
">
                {{ item.message }}


                <!-- <small style="font-size:11px;opacity:0.8;margin-left:20px;">20/06/2022</small> -->
            </div>
        </div>
    </div>

</div>

</div>

<div class="col-12" style="margin-top:20px;display:flex">
<div class="" style="display:flex;width:60px;">
    <img :src="'https://ui-avatars.com/api/?background=8965e0&color=fff&name=raa'"
        style="height:50px;border-radius:100%;margin-right:10px" />
</div>
<form @submit.prevent="sendChat()" style="display:flex;width:100%;">
    <input type="text" class="form-control" placeholder="Escribe un mensaje.." disabled
        style="border-radius: 30px;border: 1px solid rgb(199, 199, 199) !important;background: rgb(251 251 251) !important;"
        v-model="chat.message" />
    <button type="submit" style="display:none" disabled></button>
</form>
</div>
</el-col>

</template>




<script>
import sdk from '@/sdk/bundle.js';
 
export default {
  props : ['users'],
  data() {
    return {
      loading:true,
      messages: [],
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
    if(this.$props['users']) {
        sdk.general.chat.messages({
        users : this.$props['users']
         }).then(data => {
            this.messages = data[0]
            setTimeout(() => {
                this.loading = false
            },1000)
        })
    }
     


    sdk.socket.connect(localStorage.getItem('auth')).then(socket => {
       
      socket.on('chat-message-client', (response) => {
        console.log('chat', response)
        response.remote = true;
        response.message = response.msg;
        this.messages.push(response)
      })
    }); 
  },
  methods: {
    openChat(item) {
      this.chat.target = item._id;
      this.chat.data = item;
      this.loadChats(item._id)
    },
    sendChat() {
      this.messages.push({
        message: this.chat.message,
        remote: false,
      })
      console.log(this.messages)
      const container = this.$refs.containerChat;
      container.scrollTop = container.scrollHeight;

      sdk.socket.sendChat({
        auth: localStorage.getItem('auth'),
        userid: '12313123',
        type: "message",
        msg: this.chat.message,
        to: this.$props['users'][0],
        attach: null
      })

      this.chat.message = null;
    } 
  },
};


</script>