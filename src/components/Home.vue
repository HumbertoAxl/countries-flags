<template>
  <div class="container">
    <div class="title">
      <span style="float: left">{{ chances }}</span>
      Guess this flag!
      <span style="float: right">Score: {{ score }}</span>
    </div>
    <flagsMenu @correctAnswer="score++" @wrongAnswer="wrongAnswer()"></flagsMenu>
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
      if (!this.chances.includes('🧡')) {
        setTimeout(() => this.$swal.fire({
          icon: 'error',
          title: 'Game over!',
          text: `Final score = ${this.score}`,
          customClass: 'swal-gameOver',
          showConfirmButton: true,
          confirmButtonText: 'Ok!',
          allowOutsideClick: false
        }).then(function () {
          window.location = "/";
        }), 1200)
        this.$emit('gameEnded')
      } else {
        setTimeout(() => this.chances = this.chances.substring(2) + '🤍', 1100)
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
  font-size: 1.03em;
  height: 30px;
  background-color: #00aeef;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 10px;
  line-height: 15px;
  box-shadow: 0px 3px 5px 0px #0000008a;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
span {
  color: white;
}

.container {
  width: 480px;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  background-color: white;
  box-shadow: 10px 10px 10px 10px #0000008a;
  border-radius: 7px;
  user-select: none;
}

</style>
