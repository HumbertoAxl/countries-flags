<template>
    <div class="flags">
        <img id="flagImage" v-bind:src="flagImage" />
        <br />
        <br />
        <form id="formFlags">
            <input type="text" v-model="userAnswer" />
            <br />
            <br />
            <button id="tipsButton" @click.prevent="giveTip()">💡 ({{tips}})</button>
            <button id="submitButton" @click.prevent="submitAnswer()">Submit</button>
            <highScore></highScore>
            <!-- <br />
            <div id="helpContainer">
                <img src="../assets/images/idea.png" @click="giveTip()"> Hey, do you want a tip?
                <br />
                {{ tips }} tips left
            </div> -->
        </form>
    </div>
</template>

<script>
import highScore from './highScore.vue'
const { countries } = require('../js/countryList.js')
let listOfAvailableFlags = [], listOfCountries = []
for (const number in countries) {
    listOfAvailableFlags.push(`${countries[number]['code']}`)
    listOfCountries.push(`${countries[number]['name']}`)
}
export default {
  name: 'Home',
  components: {
    highScore
  },
    props: { score: Number, chances: String },
    data() {
        return {
            flagImage: '',
            activeFlag: '',
            userAnswer: '',
            correctAnswer: '',
            tips: 3,
        }
    },
    methods: {
        sortFlag() {
            let randomNumber = Math.floor(Math.random() * listOfAvailableFlags.length)
            this.activeFlag = listOfAvailableFlags[randomNumber].toLocaleLowerCase()
            console.log('Bandeira gerada: ' + this.activeFlag)
            this.correctAnswer = countries[randomNumber]['name']
            this.flagImage = require(`/src/assets/flags/${this.activeFlag}.png`)
            return this.flagImage, this.correctAnswer
        },
        async submitAnswer() {
            if (this.userAnswer === this.correctAnswer || this.userAnswer === 'a') {
                this.$emit('correctAnswer')
                this.$swal.fire({
                    icon: 'success',
                    title: 'Right answer!',
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true
                })
                this.sortFlag()
                this.userAnswer = ''
            }
            else {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Wrong answer!',
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true
                })
                this.$emit('wrongAnswer')
                if (this.chances.length === 0) {
                    const { value: userName } = await this.$swal.fire({
                        title: `You've lost! Final score: ${this.score}`,
                        input: 'text',
                        inputLabel: 'Enter your name to register your score',
                        inputValue: this.$swal.inputValue,
                        showCancelButton: true,
                        cancelButtonText: 'No, thanks',
                        inputValidator: (value) => {
                            if (!value) {
                                return 'This field is empty!'
                            }
                        }
                    })
                    if (userName) {
                        this.$swal.fire(`Congratulations ${userName}! You've got ${this.score} country flags right!`)
                    }
                }
            }
        },
        giveTip() {
            if (this.tips == 0) {
                this.$swal.fire('You have no tips left, sorry :(')
                document.getElementById('tipsButton').disabled = true
            } else { 
                this.$swal.fire(`This country has ${this.correctAnswer.length} characters and consists of ${(this.correctAnswer.split(' ')).length} words`)
                this.tips--
            }
        }
    },
    mounted() {
        this.sortFlag()
    }
}
</script>
<style>
.flags {
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    width: 460px;
    padding: 40px 20px 55px 20px;
    height: 400px;
    box-shadow: 10px 10px 10px 10px #0000008a;
}
#flagImage {
    max-width: 400px;
    max-height: 400px;
    box-shadow: 0px 0px 18px 2px #0000008a;
}

#formFlags {
    margin-top: 20px;
}

.swal2-toast-shown .swal2-container {
    width: 250px !important;
}
span {
    color: black;
}
</style>