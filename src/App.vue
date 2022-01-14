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

.swal2-styled.swal2-confirm {
background-color: #00AEEF !important;
height: 38px;
width: 58px;
}

button {
  height: 28px;
  width: 75px;
  border: 2px solid #00AEEF;
  border-radius: 10px;
  color: #00AEEF;
  box-shadow: 0px 0px 2px 0px #000000ad;
  font-weight: bold;
  background-color: white;
  font-size: 14px;
}

button:hover {
  cursor: pointer;
  background-color: rgb(230, 230, 230);
}
button:focus-visible {
  outline: none;
}
button:disabled {
  border: 2px solid #929292;
  color: #929292;
  cursor: default;
}
</style>
