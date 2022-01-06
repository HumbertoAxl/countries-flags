<template>
    <div class="Flags">
        <img v-bind:src="flagImage" />
        <br />
        <br />
        <form id="formFlags" @submit.prevent="submitAnswer()">
            <input type="text" v-model="userAnswer" />
            <button type="button">Submit</button>
            <br />
            <br />
        </form>
        <span>Score: {{ score }}</span>
        <br>
        <span>Lives left: {{ lives }}</span>
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
            lives: '🧡🧡🧡'
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
        submitAnswer() {
            if (this.userAnswer === this.correctAnswer || this.userAnswer === 'a') {
                this.$swal.fire({
                    icon: 'success',
                    title: 'Right answer!',
                    showConfirmButton: false,
                    timer: 100000,
                    toast: true
                })
                this.score++
                this.sortFlag()
                this.userAnswer = ''
            }
            else {
                this.$swal.fire('Wrong answer!', `Final score: ${this.score}`, 'error')
                this.lives = this.lives.pop()
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
    background-color: #5289ff;
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    padding: 40px 40px 80px 40px;
    height: 400px;
}
.Flags img {
    max-width: 400px;
    max-height: 400px;
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
    color: white;
}
</style>