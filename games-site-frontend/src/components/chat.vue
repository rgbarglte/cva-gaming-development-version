<template>
<div class="webchat-container">
  <div class="header"  v-if="temp.chat.content" >
    
    <!-- <div class="grp-img">
      <img class="i1" src="https://images.unsplash.com/photo-1660476705851-21e527337f9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="">
      <img class="i2" src="https://images.unsplash.com/photo-1657299143482-4f4ea1ebd71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="">
      <img class="i3" src="https://images.unsplash.com/photo-1660481451479-7ad6d6ad0223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="">
    </div> -->

    <div class="grp-info"  v-if="temp.chat.content" >
      <!-- <h3 class="grp-name">
        Elnora, Lelia, Lucinda
      </h3> -->
      <p class="grp-status" style="font-size:11px">
       In commodo do qui veniam nostrud reprehenderit. Cupidatat occaecat adipisicing labore incididunt enim mollit nostrud velit amet qui velit nulla esse non. Duis Lorem amet irure id. Commodo consectetur eiusmod consequat exercitation do consequat magna. Duis tempor sunt adipisicing commodo eiusmod commodo ea anim sit aliqua consectetur. Occaecat ut exercitation ullamco nulla deserunt non.
      </p>
    </div>
    <a href="#" @click.prevent="temp.chat.content = false">
                <span class="material-symbols-outlined" style="
    font-weight: 600;
    font-size: medium;
    margin: 5px;
    color:white !important;
"> close </span></a>
  </div>

  <div class="chatbox"  v-if="temp.chat.content" ref="containerChat">

    <div style="width:100%" v-for="item in temp.chat.chats">

        <div class="chat" v-if="item.remote == true"  >
      <!-- <img src="https://images.unsplash.com/photo-1657299143482-4f4ea1ebd71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt=""> -->
      <p class="msg" style="    background: linear-gradient(213deg, #f7d52e, #3e2e09);
    color: black;
    font-weight: 600;">
        <ion-icon name="caret-back-outline"></ion-icon>
        {{ item.msg }}
      </p>
    </div>



    <div class="chat" v-if="item.remote == false" style="display: flex;
    flex-direction: row-reverse;">
      <!-- <img src="https://images.unsplash.com/photo-1657299143482-4f4ea1ebd71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt=""> -->
      <p class="msg">
        <ion-icon name="caret-back-outline"></ion-icon>
        {{ item.msg }}
      </p>
    </div>
 

      </div>

<!-- 

    <div class="chat">
      <img src="https://images.unsplash.com/photo-1657299143482-4f4ea1ebd71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="">
      <p class="msg">
        <ion-icon name="caret-back-outline"></ion-icon>
        Hi there! <br>
        Looking to get started? I can help answer to your questions!
      </p>
    </div>
    <div class="chat">
      <img src="https://images.unsplash.com/photo-1660481451479-7ad6d6ad0223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="">
      <p class="msg">
        <ion-icon name="caret-back-outline"></ion-icon>
        I need a laptop 😊
      </p>
    </div>
    <div class="chat">
      <img src="https://images.unsplash.com/photo-1657299143482-4f4ea1ebd71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" alt="">
      <p class="msg">
        <ion-icon name="caret-back-outline"></ion-icon>
        What kind of laptop your looking for? Mam
      </p>
    </div>
    <div class="chat">
      <img src="https://images.unsplash.com/photo-1660481451479-7ad6d6ad0223?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="">
      <p class="msg">
        <ion-icon name="caret-back-outline"></ion-icon>
        A gaming one 😅
      </p>
    </div> -->
  </div>

  <div class="policy" style="padding:0;"  v-if="temp.chat.content" >
    <!-- <p>
      By using the chat, I confirm that I have read the <a href="#">privacy policy</a> and do not object to the use of my personal data.
    </p>
    <a href="#" class="agree">
      I agree
    </a> -->
    <form @submit.prevent="sendMessage()" class="col-12" style="    display: flex;
    margin: -31px 0px 0px;
    padding:0">
            <!-- <el-input v-model="chat.message" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea"
                placeholder="Escriba un mensaje..." /> -->

                <input v-model="chat.message"    type="textarea"
                placeholder="Escriba un mensaje..."  class="form-control"  style="height: 50px;border:none" />
            <button type="submit" class="form-control"
                style="margin-top:10px;height: 40px;width: 49px;padding: 0px;background: transparent;border: transparent;border-radius: 100px;display: flex;flex-direction: row;place-content: center;align-items: center;color: #3f431e;margin-left: 10px;"
                @click.prevent="sendMessage()"><span class="material-symbols-outlined" style="color:white"> send </span></button>
        </form>
  </div>

  
</div>
<button class="btn btn-primary" style="    position: fixed;
    bottom: 0;
    right: 0;
    margin: 15px;
    border-radius: 30px; z-index: 1000;" @click.prevent="temp.chat.content = true"  v-if="!temp.chat.content" >Chat</button>
 
</template>

 
<style scoped>
.webchat-container {
      /* width: 100%; */
      max-width: 450px;
    background: #0a192a;
    /* margin: 0 auto; */
    /* margin-top: 50px; */
    border-radius: 10px;
    position: relative;
    box-shadow: #000000 0 10px 20px;
    position: fixed;
    bottom: 0;
    z-index: 2000;
    right: 0;
    margin: 10px;
}

.header {
    background: #16263a;
    display: flex;
    padding: 15px;
    border-radius: 10px 10px 0 0;
}
.grp-img {
  position: relative;
  width: 125px;
  height: 45px;
}
.grp-img img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: solid 2px white;
  position: absolute;
  top: 0;
  left: 0;
}
.grp-img .i1 {
  z-index: 1;
}
.grp-img .i2 {
  left: 40px;
}
.grp-img .i3 {
  left: 80px;
}
.grp-info {
  padding: 0 15px;
}
.grp-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 3px;
}
.grp-status {
  letter-spacing: 1px;
}

.chatbox {
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
    overflow-y: auto;
    height: 50vh;
}
.chatbox .chat {
  display: flex;
  gap: 15px;
}
.chatbox img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  border: solid 2px white;
}
.chatbox .msg {
  background: #2c3d4e;
  max-width: 80%;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  font-size: 13px;
}
.msg ion-icon {
  font-size: 20px;
  color: #3a384c;
  position: absolute;
  top: 10px;
}
.chatbox .chat:nth-child(even) {
  flex-direction: row-reverse;
}
.chatbox .chat:nth-child(odd) ion-icon {
  left: -14px;
}
.chatbox .chat:nth-child(even) ion-icon {
  right: -14px;
  transform: rotate(180deg);
}

.policy {
  background: #000;
  padding: 25px;
  border-radius: 0 0 10px 10px;
}
.policy p {
  font-size: 13px;
}
.policy p a {
  font-size: 13px;
  color: #ff6969;
  text-decoration: underline;
}
.agree {
  display: inline-block;
  color: #ff6969;
  border: solid 2px #ff6969;
  border-radius: 50px;
  padding: 10px 30px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
}
.agree:hover {
  color: white;
  background: #ff6969;
}

.close {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ff6969;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -80px;
  right: 0;
}
.close:hover {
  box-shadow: #292739 0 0 10px 10px;
}
.close:hover ion-icon {
  transform: rotate(360deg);
}
.close ion-icon {
  font-size: 40px;
}
</style>



<script> 

import { usersAuthStore } from '@/stores/users.js';
import sdk from '@/assets/sdk/bundle.js';

import { ElNotification } from 'element-plus'
import socketClient from "@/assets/sdk/socket.js";

export default {
    
    data() {
        return {
            pagination: {
                games: 1,
                brands: 1,
            },
            loading: {
                games: false,
            },
            chat: {
                message: null,
                target: null
            },
            games: [],
            brands: [],
            login: false,
            authStore: usersAuthStore(),
            
            temp: {
                chat: {
                    msg: null,
                    content: false,
                    chats: [
                        {
                            remote: true,
                            msg: 'Reprehenderit mollit elit exercitation consequat do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum adipisicing aliqua.'
                        },
                        {
                            remote: false,
                            msg: 'Reprehenderit mollit elit exercitation consequat do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum adipisicing aliqua.'
                        },
                        {
                            remote: false,
                            msg: 'Reprehenderit mollit elit exercitation consequat do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum adipisicing aliqua.'
                        },
                        {
                            remote: true,
                            msg: 'Reprehenderit mollit elit exercitation consequat do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum adipisicing aliqua.'
                        }, {
                            remote: false,
                            msg: 'Reprehenderit mollit elit exercitation consequat do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum adipisicing aliqua.'
                        }, {
                            remote: true,
                            msg: 'Reprehenderit mollit elit exercitation consequat do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum adipisicing aliqua.'
                        }, {
                            remote: false,
                            msg: 'Reprehenderit mollit elit exercitation consequat do veniam consectetur sint do ullamco quis ut mollit. Fugiat elit non sint dolor deserunt fugiat quis officia magna. Nulla ipsum id nostrud veniam nulla enim non est sit cillum adipisicing aliqua.'
                        }
                    ]
                },
                login: {
                    msg: {
                        error: false,
                        success: false
                    },
                    disabled: false,
                    email: '',
                    password: '',
                },
                register: {
                    email: '',
                    password: '',
                    msg: {
                        error: false,
                        success: false
                    },
                    disabled: false,
                    username: '',
                    lastname: '',
                    firstname: ''
                }
            },
            loginData: {}
        };
    },




    async created() {
        await this.authStore.authCheck().then(data => {
            this.login = data.status;
            this.loginData = data.data;
            console.log(data, 'auth login')
            if (this.login) {
                var test= socketClient.getIo(); 
                // socketClient.getIo(this.loginData.authToken).then(socket => {
                  
                    test.on('chat-message', (response) => { 
                        response.test = 'chat-message'; 
                        response.remote = true;
                        this.chat.target = response.userid;
                        this.temp.chat.chats.push(response)
                        const container = this.$refs.containerChat;
            container.scrollTop = container.scrollHeight + 500;
                    })

                    test.on('chat-message-callback', (response) => { 
                        response.test = 'chat-message-callback'; 
                        response.remote = false;
                        this.chat.target = response.userid;
                        this.temp.chat.chats.push(response)
                        const container = this.$refs.containerChat;
            container.scrollTop = container.scrollHeight + 500;
           
                    })
                // });
            } 
        });
    },





    methods: {
        sendMessage() {
            const socket = socketClient.getIo()
            socket.emit('client-chat-send-chat', {
                auth: localStorage.getItem('auth'),
                msg: this.chat.message,
                to: this.chat.target
            })
            this.chat.message = null; 
            
        },
        
    },
};


</script>