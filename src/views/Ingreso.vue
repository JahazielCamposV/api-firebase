<template>
    <h3 class="my-5">Ingreso</h3>
    <form @submit.prevent="procesarForm">
        <input 
            class="form-control my-2" 
            type="text" 
            placeholder="email"
            v-model.trim="user.email"
        >
        <input 
            class="form-control my-2" 
            type="password" 
            placeholder="password"
            v-model.trim="user.pass1"
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
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            user: {
                email: 'jahazielcampos@gmail.com',
                pass1: '123123',
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
        }
    },
    methods:{
        ...mapActions(['ingresoUsuario']),
        procesarForm(){
            this.ingresoUsuario(this.user)

            this.user = {
                email: '',
                pass1: '',
                pass2: ''
            }
        }
    }
}
</script>