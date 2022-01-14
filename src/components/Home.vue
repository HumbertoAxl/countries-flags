<template>
  <div class="container">
    <div class="title">
      <span style="float: left">{{ chances }}</span>
      Guess this flag!
      <span style="float: right">Score: {{ score }}</span>
    </div>
    <flagsMenu @correctAnswer="score++" @wrongAnswer="wrongAnswer()" score="score">
    </flagsMenu>
    <!-- <highScore></highScore> -->
    <!-- <div class="highScore"> -->
      <!-- <button @click.prevent="checkHighScores">High scores</button> -->
    <!-- </div> -->
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import flagsMenu from './flagsMenu.vue'
export default {
  name: 'Home',
  components: {
    flagsMenu
  },
  data() {
    return {
      score: 0,
      chances: '🧡🧡🧡'
    }
  },
  methods: {
    wrongAnswer() {
      this.chances = this.chances.substring(2)
      if (this.chances.length === 0) {
        this.$emit('gameEnded')
      }
    }
  }
}
</script>
<style scoped>
.title {
  color: white;
  text-align: center;
  font-weight: bold;
  width: 400px;
  margin-right: auto;
  margin-left: auto;
  height: 30px;
  background-color: #00AEEF;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  line-height: 15px;
}
span {
  color: white
}
</style>
