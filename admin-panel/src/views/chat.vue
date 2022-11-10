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
      <div class="col">
        <div class="card shadow">
          <div class="card-header border-0">

            <h3 class="mb-0">Jugadores</h3>

            <div class="row">

              <div class="col-md-3" style="padding-top:20px">

                <table class="table align-items-center table-flush">

                  <tbody>
                    <tr v-for="(item, index) in users">

                      


                      <th scope="row"  @click="openChat(item)" style="background: rgb(243 245 251);cursor:pointer">
                        <div class="media align-items-center">
                          <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder"
                              :src="'https://ui-avatars.com/api/?background=5e72e4&color=fff&name=' + item.email">
                          </a>
                          <div class="media-body">
                            <span class="mb-0 text-sm">{{ item.email }}</span><br />
                          </div>

                        </div>
                      </th>

                    </tr>
                  </tbody>
                </table>

              </div>
              <div class="col-md-9" style="padding-top:0;">

                <div class="col-12" style="height: calc(100vh - 200px);overflow:hidden;overflow-y:auto;"
                  ref="containerChat">


                  <div class="col-12" style="padding:0" v-for="item in chat.chats">
                    <div v-if="item.remote == true" class="col-12"
                      style="margin-top:20px;display:flex;margin-bottom: 50px;">
                      <!-- <div class="" style="    display: flex;
    width: 60px;
    justify-content: center;
    align-items: center;
    align-content: center;">
                      <img :src="'https://ui-avatars.com/api/?background=2dce89&color=fff&name=f4'"
                        style="height:50px;border-radius:100%;margin-right:10px" />
                    </div> -->

                      <div class="" style=" 
        display: flex;
    width: auto;
    text-align: left;
    flex-direction: column; 
     ">

                        <b style="font-size: 13px;">Argon Design System</b>
                        <div class="" style="   
    display: flex;
    width: auto;
    background: rgb(243 245 251);
    align-items: center;
    padding: 15px 15px 15px 20px;
    border-radius: 8px;
    text-align: left;
    margin-top: 10px;
    /* border: 1px solid rgb(255 255 255); */
    /* border: 1px solid rgb(140 66 66); */
    font-size: 15px;
    padding:15px
 ">
                          {{ item.message }}


                          <small style="font-size:11px;opacity:0.8;margin-left:20px;">20/06/2022</small>
                        </div>
                      </div>
                    </div>




                    <div v-if="item.remote == false" class="col-12"
                      style="margin-top:20px;display:flex;margin-bottom: 50px;flex-direction: row-reverse;">
                      <!-- <div class="" style="    display: flex;
    width: 60px;
    justify-content: center;
    align-items: center;
    align-content: center;">
                      <img :src="'https://ui-avatars.com/api/?background=8965e0&color=fff&name=ra'"
                        style="height:50px;border-radius:100%;margin-left:10px" />
                    </div> -->

                      <div class="" style=" 
        display: flex;
    width: auto;
    text-align: left;
    flex-direction: column; 
     ">

                        <b style="font-size: 13px;">Firstname lastname</b>
                        <div class="" style="   
    display: flex;
    width: auto;
    background: rgb(243 245 251);
    align-items: center;
    padding: 15px 15px 15px 20px;
    border-radius: 8px;
    text-align: left;
    margin-top: 10px;
    /* border: 1px solid rgb(255 255 255); */
    /* border: 1px solid rgb(140 66 66); */
    font-size: 15px;
    padding:15px
 ">
                          {{ item.message }}


                          <small style="font-size:11px;opacity:0.8;margin-left:20px;">20/06/2022</small>
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
                    <input type="text" class="form-control" placeholder="Escribe un mensaje.."
                      style="border-radius: 30px;border: 1px solid rgb(199, 199, 199) !important;background: rgb(251 251 251) !important;"
                      v-model="chat.message" />
                    <button type="submit" style="display:none"></button>
                  </form>
                </div>



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
      socket.on('balance', (response) => {
        this.loginData.balance = response.balance;
      })
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
    openChat(item) {
      this.chat.target = item._id;
      this.chat.data = item;
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