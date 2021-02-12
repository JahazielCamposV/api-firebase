<template>
  <input 
      type="text"
      class="form-control my-2"
      placeholder="Ingrese nombre"
      v-model.trim="tarea.nombre"
    >
    <input 
      type="text"
      class="form-control my-2"
      placeholder="Ingrese descripcion"
      v-model.trim="tarea.descripcion"
    >
    <div class="form-check form-check-inline">
      <input 
        id="check1"
        type="checkbox"
        class="form-check-input"
        v-model="tarea.categorias"
        value="java"
      >
      <label for="check1" class="form-check-label">NodeJS</label>
    </div>
    <div class="form-check form-check-inline">
      <input 
        id="check2"
        type="checkbox"
        class="form-check-input"
        v-model="tarea.categorias"
        value="nodejs"
      >
      <label for="check2" class="form-check-label">Java</label>
    </div>
    <div class="mt-2">
      <div class="form-check form-check-inline">
        <input 
          id="radio1"
          type="radio"
          class="form-check-input"
          v-model="tarea.estado"
          value="urgente"
        >
        <label for="radio1" class="form-check-label">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input 
          id="radio2"
          type="radio"
          class="form-check-input"
          v-model="tarea.estado"
          value="relax"
        >
        <label for="radio2" class="form-check-label">Relax</label>
      </div>
    </div>
    <div class="mt-2">
      <input 
        type="number"
        class="form-control my-2"
        v-model.number="tarea.numero"
      >
    </div>
    <button 
      class="btn btn-dark mt-2 btn-block" 
      type="submit"
      :disabled="bloquear"
    >
    Procesar
    </button>
</template>

<script>
export default {
    props: {
        tarea: {}
    },
    computed: {
            bloquear(){
            return (this.tarea.nombre.trim() && this.tarea.descripcion.trim()) === "" ? true : false
        }
    }
}
</script>
