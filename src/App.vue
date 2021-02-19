<template>
  <Navbar/>
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar
  },
  methods: {
    ...mapActions(['cargarLocalStorage', 'getswsat'])
  },
  created(){
    this.cargarLocalStorage(),
    this.getswsat()
  }
}
</script>