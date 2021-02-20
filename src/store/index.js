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
    user: null,
    error: { 
      tipo: null,
      mensaje: null
    }
  },
  mutations: {
    setError(state, payload){
      if(payload === null){
        return state.error = { tipo: null, mensaje: null}
      }
      if(payload === "EMAIL_NOT_FOUND"){
        return state.error = { tipo: 'email', mensaje: 'Email no registrado'}
      }
      if(payload === "INVALID_PASSWORD"){
        return state.error = {tipo: 'pass',mensaje: 'Contraseña incorrecta'}
      }
      if(payload === "EMAIL_EXISTS"){
        return state.error = {tipo: 'email',mensaje: 'Email ya registrado'}
      }
      if(payload === "INVALID_EMAIL"){
        return state.error = {tipo: 'email',mensaje: 'Email Invalido'}
      }
    },
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
    cerrarSesion({ commit }){
      commit('setUser', null)
      router.push('/ingreso')
      localStorage.removeItem('user')
    },
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
          // console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }
        commit('setUser', userDB)
        router.push('/')
        commit('setError', null)
        localStorage.setItem('user', JSON.stringify(userDB))
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
        if (userDB.error) {
          console.log(userDB.error)
          return commit('setError', userDB.error.message)
        }
        commit('setUser', userDB)
        router.push('/ingreso')
        commit('setError', null)
        localStorage.setItem('user', JSON.stringify(userDB))
      } catch (error) {
        console.log(error)
      }
    },
    async cargarLocalStorage({ commit, state }) {
      if (localStorage.getItem('user')) {
        commit('setUser', JSON.parse(localStorage.getItem('user')))
      }else{
        return commit('setUser', null)
      }
      try {
        const response = await fetch(`https://vue-udemy-course-81e54-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`)
        const dataDB = await response.json()
        const tareas = []
        for (let key in dataDB) {
          tareas.push(dataDB[key])
        }
        commit('cargar', tareas)
      } catch (error) {
        console.log(error)
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
        // console.log(dataDB)
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
  getters:{
    usuarioAutenticado(state){
      return !!state.user
    }
  },
  modules: {
  }
})
