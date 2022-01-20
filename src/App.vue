<template>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=0.9" />
</head>
<Home v-bind:appText="appText"></Home>
</template>

<script>
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Home,
  },
  data() {
    return {
      appText: {
        EN: {
          tip: 'Tip',
          score: 'Score',
          submit: 'Submit',
          correctAnswer: 'Correct answer!',
          wrongAnswer: 'Wrong answer!',
          showHighScores: 'Show high scores',
          workInProgress: 'Work in progress'
        },
        BR: {
          tip: 'Dica',
          score: 'Pontuação',
          submit: 'Enviar',
          correctAnswer: 'Resposta correta!',
          wrongAnswer: 'Resposta incorreta!',
          showHighScores: 'Melhores pontuações',
          workInProgress: 'Em desenvolvimento'
        }
      }
    }
  },
}
</script>

<style>
body {
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  background-image: url("./assets/geobackground.jpg");
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

.tipContainer {
  margin-top: 5px;
  margin-bottom: 5px;
  visibility: hidden;
}

#app {
  margin-top: 60px;
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
