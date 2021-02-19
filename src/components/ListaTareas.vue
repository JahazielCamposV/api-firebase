<template>
  <h3>Listado de Tareas</h3>
  <!-- {{tareas}} -->
  <table class="table">
      <thead>
          <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Categorías</th>
                <th scope="col">Número</th>
                <th scope="col">Estatus</th>
                <th scope="col">Acciones</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="tarea in tareas" :key="tarea.id">
              <td>{{ tarea.id }}</td>
              <td>{{ tarea.nombre }}</td>
              <td>{{ tarea.descripcion }}</td>
              <td>{{ tarea.categorias.join(', ') }}</td>
              <!-- <td>
                  <span v-for="(cat, index) in tarea.categorias" :key="index">
                      {{ 
                          (tarea.categorias.length === index + 1) ? cat : cat + ', '
                       }}
                  </span>
              </td> -->
              <td>{{ tarea.estado }}</td>
              <td>{{ tarea.numero }}</td>
              <td>
                    <button 
                        type="button" 
                        class="btn btn-outline-danger btn-sm"
                        @click="deleteTarea(tarea.id)"
                    >
                        Eliminar
                    </button>
                    <router-link 
                        class="btn btn-outline-success btn-sm"
                        :to="{
                            name: 'Editar',
                            params: {
                                id: tarea.id
                            }
                        }">Editar
                    </router-link>
              </td>
          </tr>
      </tbody>
  </table>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    computed: {
        ...mapState(['tareas'])
    },
    methods:{
        ...mapActions(['deleteTarea'], )
    }
}
</script>
