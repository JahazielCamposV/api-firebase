<template>
    <h3 class="my-5">Ingreso</h3>
    <!-- <div class="alert alert-danger" v-if="error.tipo !== null">
        {{error.mensaje}}
    </div> -->
    <form @submit.prevent="procesarForm">
        <input 
            class="form-control my-2" 
            type="text" 
            placeholder="email"
            v-model.trim="user.email"
            :class="[error.tipo === 'email' ? 'is-invalid' : '']"
        >
        <input 
            class="form-control my-2" 
            type="password" 
            placeholder="password"
            v-model.trim="user.pass1"
            :class="[error.tipo === 'pass' ? 'is-invalid' : '']"
        >
        <button 
            class="btn btn-primary btn-block"
            type="submit"
            :disabled="bloquear"
            >
            Ingresar
        </button>
    </form>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            user: {
                email: '',
                pass1: '',
            }
        }
    },
    methods:{

    },
    computed:{
        bloquear(){
            if (!this.user.email.includes('@')) {
                return true
            }
            if (this.user.pass1.length > 5) {
                return false
            }
            return true
        },
        ...mapState(['error'])
    },
    methods:{
        ...mapActions(['ingresoUsuario']),
        async procesarForm(){
            await this.ingresoUsuario(this.user)
            if(this.error.tipo !== null){
                return
            }
            this.user = {
                email: '',
                pass1: '',
                pass2: ''
            }
        }
    }
}
</script>