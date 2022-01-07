<template>
    <div class="Flags">
        <img v-bind:src="flagImage" />
        <br />
        <br />
        <form id="formFlags" @submit.prevent="submitAnswer()">
            <input type="text" v-model="userAnswer" />
            <button>Submit</button>
            <br />
            <br />
        </form>
        <span>SCORE: {{ score }}</span>
        <br />
        <span>CHANCES LEFT {{ chances }}</span>
    </div>
</template>

<script>
const { countries } = require('../js/countryList.js')
let listOfAvailableFlags = [], listOfCountries = []
for (const number in countries) {
    listOfAvailableFlags.push(`${countries[number]['code']}`)
    listOfCountries.push(`${countries[number]['name']}`)
}
export default {
    data() {
        return {
            score: 0,
            flagImage: '',
            activeFlag: '',
            userAnswer: '',
            correctAnswer: '',
            chances: '🧡🧡🧡'
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
                this.$swal.fire({
                    icon: 'success',
                    title: 'Right answer!',
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true
                })
                this.score++
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
                this.chances = this.chances.substring(2)
                if (this.chances.length == 0) {
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
        }
    },
        mounted() {
            this.sortFlag()
        }
    }
</script>
<style>
.Flags {
    background-color: #ffffff;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    padding: 40px 40px 80px 40px;
    height: 400px;
    box-shadow: 10px 10px 10px 10px #0000008a;
    border-radius: 10px;
    /* border: 2px outset #000000; */
}
.Flags img {
    max-width: 400px;
    max-height: 400px;
    box-shadow: 0px 0px 18px 2px #0000008a;;

    /* min-width: 200px; */
    /* min-height: 200px; */
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