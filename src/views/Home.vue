<template>
  <form @submit.prevent="procesarForm">
    <Input :tarea="tarea" />
  </form>
  <!-- <p>
    {{ objString }}
  </p> -->
  <hr>
  <!-- <p>
    {{ tarea }}
  </p> -->
  <ListaTareas/>
</template>

<script>
import Input from '../components/Input.vue'
import ListaTareas from '../components/ListaTareas'
import {mapActions} from 'vuex'
const shortid = require('shortid');
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        descripcion: '',
        categorias:[],
        estado: '',
        numero: 0
      }
    }
  },
  components: {
    Input, ListaTareas
  },
  computed: {
    objString(){
      return JSON.stringify(this.tarea)
    },
    bloquear(){
      return (this.tarea.nombre.trim() && this.tarea.descripcion.trim()) === "" ? true : false
    }

  },
  methods: {
    ...mapActions(['setTareas']),
    procesarForm(){
      if (this.tarea.nombre.trim() === "") {
        console.log('Campo vacio')  
        return
      }
      //generarId
      this.tarea.id = shortid.generate()

      this.setTareas(this.tarea)

      this.tarea = {
        id: '',
        nombre: '',
        descripcion: '',
        categorias:[],
        estado: '',
        numero: 0
      }
    }
  }
}
</script>
