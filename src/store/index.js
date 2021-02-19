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
    },
    user: null
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    },
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
    async ingresoUsuario({commit}, usuario){
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA606SdT1mUDfEm6ewbJf7FieeFPyyzCO4`, {
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.pass1,
            returnSecureToken: true
          })
        })
        const userDB = await res.json()
        if (userDB.error) {
          return console.log('usuario con error')
        }
        console.log(userDB)
        commit('setUser', userDB)
        router.push('/')
      } catch (error) {
        
      }
    },
    async registraUsuario({commit}, usuario){
      const user = {
        email: usuario.email,
        password: usuario.pass1,
        returnSecureToken: true
      }
      try {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA606SdT1mUDfEm6ewbJf7FieeFPyyzCO4`,{
          method: 'POST',
          body: JSON.stringify(user)
        })
        const userDB = await res.json()
        console.log(userDB)
        if (userDB.error) {
          return
        }
        commit('setUser', userDB)
        router.push('/ingreso')
      } catch (error) {
        console.log(error)
      }
    },
    async cargarLocalStorage({ commit, state }) {
      try {
        const response = await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await response.json()
        const tareas = []
        for (let key in dataDB) {
          tareas.push(dataDB[key])
        }
      } catch (error) {
        console.log(error)
      }
    },

    async getswsat({commit}){
      try {
        const ressatws = await fetch(`https://api.sandbox.sat.ws/events`, {
          method: 'GET',
          mode: 'no-cors',
          headers: {
            'X-API-Key': '8176d00cb4dd543af1ea85780a2e80a8'
          }          
        })
        const responsesatws = await ressatws.json()
        console.log(responsesatws)
      } catch (error) {
        
      }
    },
    async setTareas({ commit, state }, tarea){
      try {
        const res = await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
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
    async deleteTarea({ commit, state }, id){
      try {
        await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
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
    async updateTarea({ commit, state }, tarea){
      try {
        const res = await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {
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
