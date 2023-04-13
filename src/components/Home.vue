<template>
    <template v-if="appLang">
        <div class="container">
            <div class="title">
                <span style="float: left">{{ chances }}</span>
                {{ appText[appLang]["score"] }}: {{ score }}
                <span style="float: right">{{ appText[appLang]["tip"] }}: {{ tipsNumber }}</span>
            </div>
            <FlagsMenu
                ref="FlagsMenu"
                @correctAnswer="score++"
                @wrongAnswer="wrongAnswer()"
                @tipUsed="tipsNumber--"
                :score="score"
                :tipsNumber="tipsNumber"
                :appLang="appLang"
                :appText="appText"
            ></FlagsMenu>
        </div>
    </template>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import FlagsMenu from "./FlagsMenu.vue";
export default {
    name: "Home",
    components: {
        FlagsMenu,
    },
    data() {
        return {
            score: 0,
            chances: "🧡🧡🧡",
            appLang: false,
            tipsNumber: 20,
            correctAnswer: "",
        };
    },
    props: {
        appText: Object,
    },
    methods: {
        async wrongAnswer() {
            let gameOverText = this.appText[this.appLang]["gameOver"];
            gameOverText[1] = this.$refs.FlagsMenu.gameOver();
            gameOverText[3] = this.score;
            if (!this.chances.includes("🧡")) {
                setTimeout(() =>
                    this.$swal
                        .fire({
                            icon: "error",
                            title: "Game over!",
                            html: gameOverText.join(""),
                            customClass: "swal-gameOver",
                            showConfirmButton: true,
                            confirmButtonText: this.appText[this.appLang]["playAgain"],
                            allowOutsideClick: false,
                        })
                        .then(function () {
                            window.location = "/";
                        }),
                );
            } else {
                this.chances = this.chances.substring(2) + "🤍";
            }
        },
        async getPlayerInfo() {
            await this.$swal
                .fire({
                    title: "Hello! Select your preferred language!",
                    text: "Olá, escolha a sua língua preferida",
                    customClass: "swal-languageSelect",
                    showDenyButton: true,
                    confirmButtonText: "Português",
                    confirmButtonColor: "#31A523",
                    denyButtonText: "English",
                    denyButtonColor: "#D51924",
                    allowOutsideClick: false,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.appLang = "BR";
                    } else if (result.isDenied) {
                        this.appLang = "EN";
                    }
                });
            this.$refs.FlagsMenu.drawFlag();
        },
    },
    mounted() {
        document.onreadystatechange = () => {
            if (document.readyState == "complete") {
                this.getPlayerInfo();
            }
        };
    },
};
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

.swal-gameOver .swal2-styled.swal2-confirm {
    background-color: #00aeef !important;
}

.swal-gameOver .swal2-styled.swal2-confirm:focus {
    box-shadow: 0 0 0 0px !important;
}
</style>
