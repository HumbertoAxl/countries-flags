<template>
  <Home></Home>
  <Flags></Flags>
</template>

<script>
import Home from './components/Home.vue'
import Flags from './components/Flags.vue'
export default {
  name: 'App',
  components: {
    Home,
    Flags
  }
}
</script>

<style>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-image: url("../src/assets/geobackground.jpg");
  background-size: 100%;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
