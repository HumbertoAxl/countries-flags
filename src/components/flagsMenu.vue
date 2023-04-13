<template>
    <div class="flags">
        <img id="flagImage" v-bind:src="flagImage" />
        <form id="formFlags">
            <div class="tipContainer">
                <pre> {{ tip }} </pre>
            </div>
            <input type="text" v-model="userAnswer"/>
            <br />
            <div class="buttonsContainer">
                <button id="tipsButton" type="button" @click.prevent="giveTip()">💡</button>
                <button
                    id="submitButton"
                    type="submit"
                    @click.prevent="submitAnswer()"
                >{{ this.appText[this.appLang]['submit'] }}</button>
            </div>
            <HighScore v-bind:appLang="appLang" v-bind:appText="appText"></HighScore>
        </form>
    </div>
</template>

<script>
import HighScore from './HighScore.vue'
const { countries } = require('../js/countryList.js')
export default {
    name: 'Flags Menu',
    components: {
        HighScore
    },
    props: { score: Number, chances: String, tipsNumber: Number, appLang: String, appText: Object, gameOverAnswer: Function },
    data() {
        return {
            flagImage: '',
            activeFlag: '',
            userAnswer: '',
            correctAnswer: '',
            showTip: false,
            tip: '',
        }
    },
    methods: {
        drawFlag() {
            let randomNumber = Math.floor(Math.random() * countries.length)
            this.activeFlag = countries[randomNumber][`code`].toLocaleLowerCase()
            this.correctAnswer = countries[randomNumber][`name${this.appLang}`]
            this.flagImage = require(`/src/assets/flags/${this.activeFlag}.png`)
            countries.splice(randomNumber, 1)
            return this.flagImage, this.correctAnswer
        },
        async submitAnswer() {
            if (this.userAnswer.toLocaleLowerCase() === this.correctAnswer.toLocaleLowerCase() || this.userAnswer.toLocaleLowerCase() === 'damiao') {
                this.$emit('correctAnswer')
                document.querySelector("#formFlags > div.tipContainer").style.visibility = 'hidden'
                document.getElementById('tipsButton').disabled = false
                await this.$swal.fire({
                    icon: 'success',
                    title: this.appText[this.appLang]['correctAnswer'],
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true,
                    allowOutsideClick: false,
                    customClass: `swal-answer${this.appLang}`
                })
                if (countries.length > 0) {
                    this.showTip = false
                    this.userAnswer = ''
                    this.drawFlag()
                } else {
                    await this.$swal.fire({
                        icon: 'success',
                        title: this.appText[this.appLang]['congratulations'],
                        text: this.appText[this.appLang]['gameWon'],
                        showConfirmButton: true,
                        confirmButtonText: this.appText[this.appLang]['playAgain'],
                        allowOutsideClick: false,
                        customClass: 'swal-congratulations'
                    }).then(() => {
                        window.location = '/'
                    })
                }
            }
            else {
                await this.$swal.fire({
                    icon: 'error',
                    title: this.appText[this.appLang]['wrongAnswer'],
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true,
                    allowOutsideClick: false,
                    customClass: `swal-answer${this.appLang}`
                })
                this.$emit('wrongAnswer')
            }
        },
        giveTip() {
            if (this.tipsNumber == 0) {
                this.$swal.fire('You have no tips left, sorry :(')
            } else {
                this.showTip = true
                this.$emit('tipUsed')
                document.getElementById('tipsButton').disabled = true
                this.tip = this.generateTip()
            }
        },
        generateTip() {
            let randomNumbers = []
            let tipArray = []
            let tipLetters = Math.round((this.correctAnswer.length * 35) / 100)
            while (randomNumbers.length < tipLetters) {
                let sortedNumber = Math.floor(Math.random() * this.correctAnswer.length)
                if (!randomNumbers.includes(sortedNumber) && this.correctAnswer[sortedNumber].toString() !== ' ' && this.correctAnswer[sortedNumber].toString() !== '-') {
                    randomNumbers.push(sortedNumber)
                    console.log(sortedNumber)
                } else if (this.correctAnswer[sortedNumber].toString() === ' '){
                    console.log(sortedNumber + ' é um espaço')
                } else {
                    console.log(sortedNumber + ' está repetido')
                }
            }
            randomNumbers.sort(function (a, b) {
                return a - b;
            })
            for (let i = 0; i < this.correctAnswer.length; i++) {
                switch (this.correctAnswer[i]) {
                    case '-': tipArray.push('-')
                        break;
                    case ' ': tipArray.push(' ')
                        break;
                    default:
                        tipArray.push('_')
                        break;
                }
            }
            for (let i = 0; i < randomNumbers[tipLetters-1]; i++) {
                if (randomNumbers[i] > -1) {
                    tipArray[randomNumbers[i]] = this.correctAnswer[randomNumbers[i]]
                }
            }
            tipArray[0] = tipArray[0].toUpperCase()
            tipArray = tipArray.join(' ')
            tipArray = tipArray.replace(`${/[A-Za-z] [A-Za-z]/g}`,'')
            document.querySelector("#formFlags > div.tipContainer").style.visibility = 'visible'
            return tipArray
        },
        gameOver(){
            return this.correctAnswer;
        }
    },
}
</script>
<style>

.container {
  max-width: 100% !important;
}

.flags {
    background-color: #ffffff;
    margin: 40px 10px 55px 10px;
}
#flagImage {
    width: 400px;
    height: 266.91px;
    box-shadow: 0px 0px 18px 2px #0000008a;
}

#formFlags input {
    width: 210px;
    height: 20px;
    text-align: center;
    border-style: solid;
    border-radius: 5px;
    border-color: rgb(179, 179, 179);
    outline: none;
    font-size: 16px;
}
#formFlags input:focus {
    border-color: #00b6f8;
}
span {
    color: black;
}
.buttonsContainer {
    margin-top: 10px;
    display: inline-flex;
    justify-content: space-between;
    width: 180px;
}
#formFlags button {
    height: 28px;
    border: 1px solid grey;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    background-color: #00aeef;
    font-size: 14px;
}

#formFlags button:hover {
    cursor: pointer;
    background-color: #0085b6;
    transition: background-color 0.2s;
}
#formFlags button:focus-visible {
    outline: none;
}
#formFlags button:disabled {
    border: 1px solid #929292;
    background-color: #929292;
    cursor: default;
}

#tipsButton {
    width: 75px;
}

#submitButton {
    width: 85px;
}
.swal-answerEN {
    width: 240px !important;
}

.swal-answerBR {
    width: 255px !important;
}

.swal-congratulations {
    width: 480px !important;
    max-width: 100% !important;
}

.tip {
    margin-bottom: 10px;
}

.swal-answerEN .swal2-title {
    font-family: arial !important;
    font-weight: 600 !important;
    font-size: 1em !important;
    margin-top: 10px !important;
    margin-right: 10px !important;
    margin-bottom: 5px !important;
    margin-left: 10px !important;
}

.swal-answerBR .swal2-title {
    font-family: arial !important;
    font-weight: 600 !important;
    font-size: 1em !important;
    margin-top: 10px !important;
    margin-right: 10px !important;
    margin-bottom: 5px !important;
    margin-left: 10px !important;
}

</style>