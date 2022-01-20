<template>
  <template v-if="appLang">
    <div class="container">
      <div class="title">
        <span style="float: left">{{ chances }}</span>
        {{appText[appLang]['score']}}: {{ score }}
        <span style="float: right">{{appText[appLang]['tip']}}: 20</span>
      </div>
      <flagsMenu
        ref="flagsMenu"
        @correctAnswer="score++"
        @wrongAnswer="wrongAnswer()"
        :chances="chances"
        :score="score"
        :appLang="appLang"
        :appText="appText"
      ></flagsMenu>
    </div>
  </template>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import flagsMenu from './flagsMenu.vue'
export default {
  name: 'Home',
  components: {
    flagsMenu
  },
  props: { appText: String },
  data() {
    return {
      score: 0,
      chances: '🧡🧡🧡',
      appLang: false
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
          confirmButtonText: 'Play again!',
          allowOutsideClick: false
        }).then(function () {
          window.location = "/";
        }), 1200)
      } else {
        this.chances = this.chances.substring(2) + '🤍'
      }
    },
    async getPlayerInfo() {
      await this.$swal.fire({
        title: 'Hello! Select your prefered language!',
        showDenyButton: true,
        confirmButtonText: 'Português',
        denyButtonText: `English`,
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          this.appLang = 'BR'
        } else if (result.isDenied) {
          this.appLang = 'EN'
        }
      })
      this.$refs.flagsMenu.sortFlag()
    }
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.getPlayerInfo()
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
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  background-color: white;
  box-shadow: 10px 10px 10px 10px #0000008a;
  border-radius: 7px;
  user-select: none;
}
</style>
