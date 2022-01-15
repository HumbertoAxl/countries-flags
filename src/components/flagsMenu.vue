<template>
    <div class="flags">
        <img id="flagImage" v-bind:src="flagImage" />
        <form id="formFlags">
            <div class="tip" v-if="showTip">{{ tip }}</div>
            <input type="text" v-model="userAnswer" />
            <br />
            <div class="buttonsContainer">
                <button id="tipsNumberButton" @click.prevent="giveTip()">💡 ({{ tipsNumber }})</button>
                <button id="submitButton" type="button" @click.prevent="submitAnswer()">Submit</button>
            </div>
            <highScore></highScore>
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
            tipsNumber: 5,
            showTip: false,
            tip: ''
        }
    },
    methods: {
        sortFlag() {
            let randomNumber = Math.floor(Math.random() * listOfAvailableFlags.length)
            this.activeFlag = listOfAvailableFlags[randomNumber].toLocaleLowerCase()
            console.log('Bandeira gerada: ' + this.activeFlag)
            this.correctAnswer = countries[randomNumber]['name'].toLocaleLowerCase()
            this.flagImage = require(`/src/assets/flags/${this.activeFlag}.png`)
            return this.flagImage, this.correctAnswer
        },
        async submitAnswer() {
            if (this.userAnswer.toLocaleLowerCase() === this.correctAnswer || this.userAnswer === 'a') {
                this.$emit('correctAnswer')
                await this.$swal.fire({
                    icon: 'success',
                    title: 'Right answer!',
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true,
                    allowOutsideClick: false,
                    customClass: 'swal-answer'
                })
                this.sortFlag()
                this.showTip = false
                this.userAnswer = ''
            }
            else {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Wrong answer!',
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true,
                    allowOutsideClick: false,
                    customClass: 'swal-answer'
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
            if (this.tipsNumber == 0) {
                this.$swal.fire('You have no tips left, sorry :(')
                document.getElementById('tipsButton').disabled = true
            } else {
                this.showTip = true
                this.tipsNumber--
                this.tip = this.generateTip()
            }
        },
        generateTip() {
            let randomNumbers = []
            let tipArray = []
            // if (this.correctAnswer.length <= 6) {
            while (randomNumbers.length < 2) {
                let sortedNumber = Math.floor(Math.random() * this.correctAnswer.length)
                if (!randomNumbers.includes(sortedNumber)) {
                    randomNumbers.push(sortedNumber)
                }
            }
            randomNumbers.sort(function (a, b) {
                return a - b;
            });
            console.log(randomNumbers)
            for (let i = 0; i < this.correctAnswer.length; i++) {
                tipArray.push('_')
            }
            for (let i = 0; i < randomNumbers[1]; i++) {
                if (randomNumbers[i]>-1) {
                    tipArray[randomNumbers[i]] = this.correctAnswer[randomNumbers[i]]
                }
            }
            tipArray[0] = tipArray[0].toUpperCase()
            tipArray = tipArray.join(' ')
            return tipArray
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
    margin: 40px 10px 55px 10px;
}
#flagImage {
    max-width: 400px;
    max-height: 400px;
    box-shadow: 0px 0px 18px 2px #0000008a;
}

#formFlags {
    margin-top: 20px;
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
.swal-answer {
    width: 225px !important;
}
.tip {
    margin-bottom: 10px;
}
</style>