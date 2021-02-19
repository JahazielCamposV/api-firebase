import { createStore } from 'vuex'
import router from '../router/index'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      nombre: '',
      descripcion: '',
      categorias:[],
      estado: '',
      numero: 0
    }
  },
  mutations: {
    cargar(state, payload){
      state.tareas = payload
    },
    set(state, payload){
      state.tareas.push(payload)
    },
    eliminar(state, payload){
      state.tareas = state.tareas.filter(tarea => tarea.id !== payload)
    },
    tarea(state, payload){
      if (!state.tareas.find(tarea => tarea.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find(tarea => tarea.id === payload)
    },
    update(state, payload){
      state.tareas = state.tareas.map(tarea => tarea.id === payload.id ? payload : tarea)
      router.push('/')
    }
  },
  actions: {
    async cargarLocalStorage({ commit }) {
      try {
        const response = await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas.json`)
        const dataDB = await response.json()
        const tareas = []
        for (let key in dataDB) {
          tareas.push(dataDB[key])
        }
        commit('cargar', tareas)
      } catch (error) {
        
      }
    },
    async setTareas({commit}, tarea){
      try {
        const res = await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(tarea)
        })
        const dataDB = await res.json()
        console.log(dataDB)
      } catch (error) {
        console.log(error)
      }
      commit('set', tarea)
    },
    async deleteTarea({commit}, id){
      try {
        await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas/${id}.json`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.log(error)
      }
      commit('eliminar', id)
    },
    setTarea({commit}, id){
      commit('tarea', id)
    },
    async updateTarea({commit}, tarea){
      try {
        const res = await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea)
        })
        const data = await res.json()
        commit('update', tarea)
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
