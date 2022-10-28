<template>


    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" v-if="login" style="background:#060d15 !important">
        <a class="navbar-brand" href="#">Hola <b>{{loginData.profile.firstname}} {{loginData.profile.lastname}}</b>!</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Mi cuenta</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-warning" href="#">Balance: {{loginData.balance}} - <b>Recargar
                            cuenta</b></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Atencion al cliente</a>
                </li>
            </ul>
            <span class="navbar-text">

                <div
                    style="width: 100%;display: flex;align-items: center;justify-content: center;align-content: center;color:white">
                    <img :src="'https://ui-avatars.com/api/?background=ffc107&bold=true&name=' + loginData.profile.firstname + ' '+ loginData.profile.lastname"
                        style="height: 30px;width:30px;border-radius:100%;background:rgb(255,255,255,0.1);margin-right: 10px;display:inline-block" />
                    <span>{{loginData.email}}</span>
                </div>
            </span>
        </div>
    </nav>





    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"
        style="background: linear-gradient(183deg, #050c14, transparent) !important">
        <a class="navbar-brand" href="#">
            <img src="https://cva.poker/public/cdn/img/1.svg" class="img-fluid" style="    height: 70px;" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/" style="
                    font-weight: 700;
    font-size: 13px;
font-family: 'Inter', sans-serif;
text-transform:uppercase;
                    ">Inicio</a>
                </li>
                <li class="nav-item active" v-for="item in 5">
                    <a class="nav-link" href="#" style="
                    font-weight: 700;
    font-size: 13px;
font-family: 'Inter', sans-serif;
text-transform:uppercase;
                    ">Link navbar</a>
                </li>
            </ul>
            <span class="navbar-text">
                <ul class="navbar-nav mr-auto" v-if="login">
                    <li class="nav-item active">
                        <a class="nav-link" href="/" style="
                    font-weight: 700;
    font-size: 13px;
font-family: 'Inter', sans-serif;
text-transform:uppercase;
                    " @click.prevent="logout()">Cerrar sesion</a>
                    </li>
                </ul>
                <a href="#" class="btn btn-outline-primary" style="margin-right:10px" @click.prevent="openModal()"
                    v-if="login == false">Ingresar</a>
                <a href="#" class="btn btn-primary" @click.prevent="registerOpen()" v-if="login == false">Crear
                    cuenta</a>

                <!-- <a href="#" class="btn btn-outline-primary" @click.prevent="logout()" v-if="login">Cerrar sesion</a>  -->
            </span>
        </div>
    </nav>


    <!-- <div class="navbar">
        <div class="container-fluid">
            <div class="row" style="width:100%;">
                <div class="col-md-1">

                </div>
                <div class="col-md-8">
                    <ul class="navbar-menu">
                        <li>
                            <a href="/">Inicio</a>
                        </li>
                        <li>
                            <a href="#">Link header</a>
                        </li>
                        <li>
                            <a href="#">Link header</a>
                        </li>
                        <li>
                            <a href="#">Link header</a>
                        </li>
                        <li>
                            <a href="#">Link header</a>
                        </li>
                        <li>
                            <a href="#">Link header</a>
                        </li>
                        <li>
                            <a href="#">Link header</a>
                        </li>
                        <li>
                            <a href="#">Link header</a>
                        </li>
                        <li>
                            <a href="#">Link header</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3" v-if="!login">



                    <a href="#" class="btn btn-outline-primary" style="margin-right:10px"
                        @click.prevent="openModal()">Ingresar</a>
                    <a href="#" class="btn btn-primary" @click.prevent="registerOpen()">Crear cuenta</a>

                </div>

            </div>
        </div>
    </div>
 -->








    <!-- Modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form @submit.prevent="loginSubmit()" class="modal-body" style="padding:4rem">
                    <div>
                        <h2>Iniciar sesion</h2>
                        <p>Cillum nulla esse deserunt pariatur fugiat Lorem non labore sit proident ipsum do ipsum.</p>
                    </div>
                    <div class="alert alert-danger" v-if="temp.login.msg.error">
                        El correo electrónico o la contraseña son incorrectos.
                    </div>

                    <div class="alert alert-success" v-if="temp.login.msg.success">
                        Gracias por iniciar sesion.
                    </div>
                    <div class="form-group">
                        <label>E-Mail</label>
                        <input type="text" class="form-control" v-model="temp.login.email"
                            placeholder="Direccion de e-mail" :disabled="temp.login.disabled" />
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" class="form-control" v-model="temp.login.password"
                            placeholder="***********" :disabled="temp.login.disabled" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" type="submit" style="width:100%;    height: 50px;"
                            :disabled="temp.login.disabled">Ingresar</button>
                        <p>Cillum nulla esse deserunt pariatur fugiat Lorem non labore sit proident ipsum do ipsum.</p>
                    </div>
                </form>
            </div>
        </div>
    </div>










    <!-- Modal -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form @submit.prevent="registerSubmit()" class="modal-body" style="padding:4rem">
                    <div>
                        <h2>Crear cuenta</h2>
                        <p>Cillum nulla esse deserunt pariatur fugiat Lorem non labore sit proident ipsum do ipsum.</p>
                    </div>
                    <div class="alert alert-danger" v-if="temp.register.msg.error">
                        Direccion de correo electronico o nombre de usuario no disponible.
                    </div>

                    <div class="alert alert-success" v-if="temp.register.msg.success">
                        Gracias por registrarte , ya puedes iniciar sesion con tu cuenta.
                    </div>
                    <div class="form-group">
                        <label>E-Mail</label>
                        <input type="text" class="form-control" v-model="temp.register.email"
                            placeholder="Direccion de e-mail" :disabled="temp.register.disabled" />
                    </div>
                    <div class="form-group">
                        <label>Nombre de usurio</label>
                        <input type="text" class="form-control" v-model="temp.register.username"
                            placeholder="Nombre de usuario" :disabled="temp.register.disabled" />
                    </div>
                    <div class="form-group">
                        <label>Contraseña</label>
                        <input type="password" class="form-control" v-model="temp.register.password"
                            placeholder="***********" :disabled="temp.register.disabled" />
                    </div>
                    <div class="form-group">
                        <label>Repetir contraseña</label>
                        <input type="password" class="form-control" v-model="temp.register.repassword"
                            placeholder="***********" :disabled="temp.register.disabled" />
                    </div>


                    <div class="form-group">
                        <label>Nombre</label>
                        <input type="text" class="form-control" v-model="temp.register.firstname" placeholder="Nombre"
                            :disabled="temp.register.disabled" />
                    </div>
                    <div class="form-group">
                        <label>Apellido</label>
                        <input type="text" class="form-control" v-model="temp.register.lastname" placeholder="Apellido"
                            :disabled="temp.register.disabled" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" type="submit" style="width:100%;    height: 50px;"
                            :disabled="temp.register.disabled">Crear cuenta</button>
                        <p>Cillum nulla esse deserunt pariatur fugiat Lorem non labore sit proident ipsum do ipsum.</p>
                    </div>
                </form>
            </div>
        </div>
    </div>




    <button class="btn btn-primary" style="    position: fixed;
    bottom: 0;
    right: 0;
    margin: 15px;
    border-radius: 30px; z-index: 1000;" @click.prevent="temp.chat.content = true">Chat</button>

    <div v-if="temp.chat.content" style=" 
    position: fixed;
    bottom: 53px;
    right: 0px;
    margin: 15px;
    border-radius: 5px; 
    width: 236px;
    background: white;
    padding: 0;
    z-index: 1000;
">
        <div class="col-12 text-rigth" style="
    text-align: right;
    padding: 0;
    padding-left: 10px;
    font-size: 1px !important;
"><a href="#" @click.prevent="temp.chat.content = false">
                <span class="material-symbols-outlined" style="
    font-weight: 600;
    font-size: medium;
    margin: 5px;
    color:black !important;
"> close </span></a> </div>
        <el-scrollbar height="376px" ref="scrollbarRef">
            <div style="width:100%" v-for="item in temp.chat.chats">
                <div style="padding:10px;display:flex; flex-direction:column;padding-right:20%"
                    v-if="item.remote == true">
                    <span style="font-size:9px;font-weight: bold;">CVA</span>

                    <div style="width: 100%;">
                        <div
                            style="border-radius:8px;padding:10px;font-size:12px !important;color:white;background:#6201ff">
                            {{item.msg}}
                        </div>
                    </div>
                </div>


                <div style="padding:10px;display:flex;flex-direction:column;padding-left:20%"
                    v-if="item.remote == false">
                    <!-- <span style="font-size:9px;font-weight: bold;">CVA</span> -->
                    <div style="width: 100%;">
                        <div style="    border-radius: 8px;
    padding: 10px;
    font-size: 12px !important;
    color: #132723;
    background: rgb(255 193 7)">
                            {{item.msg}}
                        </div>
                    </div>
                </div>

            </div>



        </el-scrollbar>
        <div class="col-12" style="    display: flex;
    margin-bottom: 20px;padding-top:15px">
            <el-input v-model="temp.chat.msg" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea"
                placeholder="Escriba un mensaje..." />
            <button type="submit" class="form-control"
                style="height: 40px;width: 49px;padding: 0px;background: rgb(255 193 7);border: #42461d;border-radius: 100px;display: flex;flex-direction: row;place-content: center;align-items: center;color: #3f431e;margin-left: 10px;"
                @click.prevent="sendMessage()"><span class="material-symbols-outlined"> send </span></button>
        </div>
    </div>

</template>


<style>
.menu-account {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    color: white;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
}

.menu-account li {
    display: inline-block;
    padding-right: 10px;
    padding-left: 10px;
    height: 45px;
    line-height: 45px;
    margin: 0;
    top: 0;
    margin-top: -15px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    font-weight: 700;
    font-size: 12px;

    color: #FFFFFF;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;
}

.menu-account li>* {
    display: inline-block;
}

.btn-outline-primary {
    height: 33px;
    text-align: center;
    background: #12171E !important;
    border: 1px solid #6100FF;
    border-radius: 5px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-transform: uppercase;
    display: inline-flex;
    color: white;
    font-family: 'Inter', sans-serif;

}

.btn-primary {
    height: 33px;
    text-align: center;
    background: #6100FF;
    border: 1px solid #6100FF;
    border-radius: 5px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-transform: uppercase;
    color: white;
    display: inline-flex;
    font-family: 'Inter', sans-serif;

}

.navbar .container {
    max-width: 1250px;
    font-family: 'Inter', sans-serif;

}

.navbar {
    height: 66px;


    font-family: 'Inter', sans-serif;


}

.navbar .navbar-menu {
    padding: 0;
    margin: 0;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    font-family: 'Inter', sans-serif;

}

.navbar .navbar-menu li a {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    /* identical to box height */
    color: #FFFFFF;
    text-transform: uppercase;
    font-family: 'Inter', sans-serif;

}

.navbar .navbar-menu li {
    width: auto;
    font-family: 'Inter', sans-serif;


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
                socketClient.connect(this.loginData.authToken).then(socket => {
                    socket.on('balance', (response) => {
                        this.loginData.balance = response.balance;
                    })
                    socket.on('chat-message', (response) => {
                        response.remote = true;
                        this.temp.chat.chats.push(response)
                    })
                });
            }

        });
    },
    methods: {
        sendMessage() {
          const socket = socketClient.getIo() 
          socket.emit() 
          response.remote = true;
          this.temp.chat.chats.push(response) 
        },
        logout() {
            localStorage.removeItem('auth')
            window.location.reload();
        },
        openModal() {
            $('#loginModal').modal('show');
        },
        loginSubmit() {
            this.temp.login.msg.error = false;
            this.temp.login.disabled = true;
            this.authStore.loginSubmit(this.temp.login.email, this.temp.login.password).then(data => {
                this.login = true;
                this.loginData = data;
                this.temp.login.msg.error = false;
                this.temp.login.msg.success = true;
                this.temp.login.disabled = true;
                // $('#loginModal').modal('hide');
                ElNotification({
                    title: 'Iniciar sesion',
                    message: "Gracias por iniciar sesion.",
                    position: 'bottom-right',
                    duration: 0,
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1500)
            }).catch(err => {
                this.temp.login.msg.error = true;
                this.login = false;
                this.temp.login.disabled = false;
            });
        },
        registerOpen() {
            $('#registerModal').modal('show');
        },
        registerSubmit() {
            this.temp.register.msg.error = false;
            this.temp.register.disabled = true;
            sdk.users.register(this.temp.register.email, this.temp.register.password, this.temp.register.username, this.temp.register.firstname, this.temp.register.lastname).then(data => {
                this.register = true;
                this.loginData = data;
                this.temp.register.msg.error = false;
                this.temp.register.msg.success = true;
                this.temp.register.disabled = true;
                // $('#loginModal').modal('hide');
                ElNotification({
                    title: 'Registrar cuenta',
                    message: "Gracias por registrarte , ya puedes iniciar sesion con tu cuenta.",
                    position: 'bottom-right',
                    duration: 0,
                })

            }).catch(err => {
                this.temp.register.msg.error = true;
                this.register = false;
                this.temp.register.disabled = false;
            });
        },
    },
};


</script>