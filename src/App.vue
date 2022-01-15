<template>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<Home></Home>
</template>

<script>
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Home,
  }
}
</script>

<style>
body {
    font-family: Segoe UI,Tahoma,Geneva,Verdana,sans-serif;
    background-image: url('./assets/geobackground.jpg');
    background-size: 100%;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
    width: 100%;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.swal2-styled.swal2-confirm {
  background-color: #00aeef !important;
  height: 38px !important;
  width: 58px !important;
}

.swal2-styled.swal2-confirm:focus {
    box-shadow: 0 0 0 0px !important;
}

button {
  height: 28px;
  width: 75px;
  border: 1px solid grey;
  border-radius: 10px;
  color: white;
  font-weight: bold;
  background-color: #00aeef;
  font-size: 14px;
}

button:hover {
  cursor: pointer;
  background-color: #0085b6;
  transition: background-color 0.2s;
}
button:focus-visible {
  outline: none;
}
button:disabled {
  border: 1px solid #929292;
  background-color: #929292;
  cursor: default;
}
</style>
