<script>
import { RouterLink, RouterView } from 'vue-router'
import LoginPage from './views/LoginPage.vue'
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
