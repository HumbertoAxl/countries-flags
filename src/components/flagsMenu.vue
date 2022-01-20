<template>
    <div class="flags">
        <img id="flagImage" v-bind:src="flagImage" />
        <form id="formFlags">
            <div class="tipContainer">
                <pre> {{ tip }} </pre>
            </div>
            <input type="text" v-model="userAnswer" />
            <br />
            <div class="buttonsContainer">
                <button id="tipsButton" @click.prevent="giveTip()">💡</button>
                <button
                    id="submitButton"
                    type="button"
                    @click.prevent="submitAnswer()"
                >{{ this.appText[this.appLang]['submit'] }}</button>
            </div>
            <highScore v-bind:appLang="appLang" v-bind:appText="appText"></highScore>
        </form>
    </div>
</template>

<script>
import highScore from './highScore.vue'
const { countries } = require('../js/countryList.js')
export default {
    name: 'Flags Menu',
    components: {
        highScore
    },
    props: { score: Number, chances: String, appLang: String, appText: Object },
    data() {
        return {
            flagImage: '',
            activeFlag: '',
            userAnswer: '',
            correctAnswer: '',
            tipsNumber: 20,
            showTip: false,
            tip: '',
        }
    },
    methods: {
        sortFlag() {
            let randomNumber = Math.floor(Math.random() * countries.length)
            this.activeFlag = countries[randomNumber][`code`].toLocaleLowerCase()
            this.correctAnswer = countries[randomNumber][`name${this.appLang}`].toLocaleLowerCase()
            console.log(this.correctAnswer ?? 'error')
            this.flagImage = require(`/src/assets/flags/${this.activeFlag}.png`)
            countries.splice(randomNumber, 1)
            return this.flagImage, this.correctAnswer
        },
        async submitAnswer() {
            if (this.userAnswer.toLocaleLowerCase() === this.correctAnswer || this.userAnswer.toLocaleLowerCase() === 'damiao') {
                this.$emit('correctAnswer')
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
                    this.sortFlag()
                } else {
                    await this.$swal.fire({
                        icon: 'success',
                        title: 'Congratulations!',
                        text: `Wow, you've got all the flags right! That's impressive! You can call yourself a flag master`,
                        showConfirmButton: true,
                        confirmButtonText: 'Play again!',
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
                // document.getElementById('tipsButton').disabled = true
            } else {
                this.showTip = true
                this.tipsNumber--
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
            console.log(randomNumbers)
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
        }
    },
}
</script>
<style>
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
    width: 160px;
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
    width: 65px;
}

#submitButton {
    width: 85px;
}
.swal-answerEN {
    width: 230px !important;
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
</style>