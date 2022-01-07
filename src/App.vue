<template>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
  <Home></Home>
  <flagsMenu></flagsMenu>
</template>

<script>
import Home from './components/Home.vue'
import flagsMenu from './components/flagsMenu.vue'
export default {
  name: 'App',
  components: {
    Home,
    flagsMenu
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
