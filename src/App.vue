<template>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=0.9, user-scalable=0" />
    </head>
    <div>
        <router-view></router-view>
    </div>
</template>
<style>
body {
    font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
    background-image: url("@/assets/geobackground.jpg");
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

pre {
    display: inherit;
    font-family: inherit;
    white-space: pre;
    margin: 0px;
}

#app {
    margin-top: 60px;
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none !important;
    text-align: center;
}
</style>
