<template>
    <div class="navbar" v-if="!login">
        <div class="container-fluid">
            <div class="row" style="width:100%;">
                <div class="col-md-1">

                </div>
                <div class="col-md-9">
                    <ul class="navbar-menu">
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
                        <li>
                            <a href="#">Link header</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-2"  >

                    

                    <a href="#" class="btn btn-outline-primary" style="margin-right:10px"
                        @click.prevent="openModal()">Ingresar</a>
                    <a href="#" class="btn btn-primary">Crear cuenta</a>

                </div> 

            </div>
        </div>
    </div>




    <div class="navbar" v-if="login">
        <div class="container-fluid">
            <div class="row" style="width:100%;">
                <div class="col-md-3">

                </div>
                <div class="col-md-6">
                    <ul class="navbar-menu">
                        <li>
                            <a href="/">Inicio</a>
                        </li>
                        <li>
                            <a href="/brands">Marcas</a>
                        </li>
                        <li>
                            <a href="/categorie">Categorias</a>
                        </li>
                        <li>
                            <a href="/contact">Contactanos</a>
                        </li> 
                    </ul>
                </div> 
                <div class="col-md-3" >  
                    <a href="#" class="btn btn-outline-primary" style="margin-right:10px"
                        @click.prevent="">Balance : {{loginData.balance}}</a>
                    <a href="#" class="btn btn-outline-primary" style="margin-right:10px"
                        @click.prevent="openModal()">Mi cuenta</a>
                    <a href="#" class="btn btn-primary">Recargar</a>

                </div>


            </div>
        </div>
    </div>




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
                            placeholder="***********"  :disabled="temp.login.disabled"/>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary" type="submit" style="width:100%;    height: 50px;" :disabled="temp.login.disabled">Ingresar</button>
                        <p>Cillum nulla esse deserunt pariatur fugiat Lorem non labore sit proident ipsum do ipsum.</p>
                    </div>
                </form>
            </div>
        </div>
    </div>



</template>


<style>
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
    background: #12171E;

    position: sticky;
    top: 0;
    font-family: 'Inter', sans-serif;

    z-index: 1000;
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
                login: {
                    msg : {
                        error : false,
                        success : false
                    },
                    disabled: false,
                    email: '',
                    password: '',
                },
                register: {
                    email: '',
                    password: '',
                }
            },
            loginData: {}
        };
    },
    async created() {
        await this.authStore.authCheck().then(data => {
            this.login = data;
            console.log(data,'auth login')
        });
    },
    methods: {
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
                window.location.reload();
            }).catch(err => {
                this.temp.login.msg.error = true;
                this.login = false;
                this.temp.login.disabled = false;
            });
        },
    },
};


</script>