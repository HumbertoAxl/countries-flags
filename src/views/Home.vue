<template>
    <template v-if="appLang">
        <div class="container">
            <div class="title">
                <span style="float: left">{{ chances }}</span>
                {{ appText[appLang]["score"] }}: {{ score }}
                <span style="float: right">{{ appText[appLang]["tip"] }}: {{ tipsNumber }}</span>
            </div>
            <!-- <FlagsContainer
                @correctAnswer="score++"
                @wrongAnswer="wrongAnswer()"
                @tipUsed="tipsNumber--"
                :score="score"
                :tipsNumber="tipsNumber"
                :appLang="appLang"
                :appText="appText"
            ></FlagsContainer> -->
            <div class="flags">
                <img id="flagImage" :src="flagImage" />
                <form id="formFlags">
                    <div class="tipContainer">
                        <pre> {{ tip }} </pre>
                    </div>
                    <input type="text" v-model="userAnswer" />
                    <br />
                    <div class="buttonsContainer">
                        <button id="tipsButton" type="button" @click.prevent="giveTip()">💡</button>
                        <button id="submitButton" type="submit" @click.prevent="submitAnswer()">
                            {{ appText[appLang]["submit"] }}
                        </button>
                    </div>
                    <br />
                    <!-- <router-link to="/high-scores"> -->
                    <button id="highScoresButton" type="button" @click.prevent="showHighScores()">
                        Show high scores
                    </button>
                    <!-- </router-link> -->
                </form>
            </div>
        </div>
    </template>
</template>

<script setup>
import appText from "@/js/language";
import countries from "@/js/countryList.js";
import Swal from "sweetalert2";
import { createVNode, render, ref, onMounted } from "vue";
import { saveScore } from "@/services/api";
import HighScore from "@/components/HighScore.vue";
const score = ref(0);
const chances = ref("🧡🧡🧡");
const appLang = ref(false);
const tipsNumber = ref(20);
const flagImage = ref("");
const activeFlag = ref("");
const userAnswer = ref("");
const correctAnswer = ref("");
const showTip = ref(false);
const tip = ref("");
const table = ref("");

async function handleWrongAnswer() {
    let gameOverText = appText[appLang.value]["gameOver"];
    gameOverText[1] = correctAnswer.value;
    gameOverText[3] = score.value;
    if (!chances.value.includes("🧡")) {
        Swal.fire({
            icon: "error",
            title: "Game over!",
            html: gameOverText.join(""),
            customClass: "swal-gameOver",
            showCancelButton: true,
            showConfirmButton: true,
            allowOutsideClick: false,
            input: "text",
            inputAttributes: {
                placeholder: "Seu nome",
            },
            showLoaderOnConfirm: true,
            cancelButtonText: "Não salvar",
            confirmButtonText: "Salvar",
            reverseButtons: true,
        }).then(async (result) => {
            console.log(result);
            if (result.isConfirmed) {
                await saveScore(result.value, score.value, appLang.value).then((numberOfPlayers) => {
                    Swal.fire({
                        title: `Done! Your position is: #1 out of 10`, //TODO: Show actual player numbers
                        text: "Let's improve this score even more?",
                        confirmButtonText: "Yes!",
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location = "/";
                        }
                    });
                });
            }
            // Swal.fire({
            //     title: "Wanna play again?"
            // })
        });
    } else {
        chances.value = chances.value.substring(2) + "🤍";
    }
}

async function showLanguageSelection() {
    await Swal.fire({
        title: "Hello! Select your preferred language!",
        text: "Olá, escolha a sua língua preferida",
        customClass: "swal-languageSelect",
        showDenyButton: true,
        confirmButtonText: "Português",
        confirmButtonColor: "#31A523",
        denyButtonText: "English",
        denyButtonColor: "#D51924",
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            appLang.value = "BR";
        } else if (result.isDenied) {
            appLang.value = "EN";
        }
        drawFlag();
    });
}

function drawFlag() {
    let randomNumber = Math.floor(Math.random() * countries.length);
    activeFlag.value = countries[randomNumber][`code`].toLocaleLowerCase();
    correctAnswer.value = countries[randomNumber][`name${appLang.value}`];
    console.log(correctAnswer.value);
    flagImage.value = `/src/assets/flags/${activeFlag.value}.png`;
    countries.splice(randomNumber, 1);
    // return flagImage.value, correctAnswer.value;
}
async function submitAnswer() {
    if (
        userAnswer.value.toLocaleLowerCase() === correctAnswer.value.toLocaleLowerCase() ||
        userAnswer.value.toLocaleLowerCase() === "damiao"
    ) {
        score.value = score.value + 1;
        document.querySelector("#formFlags > div.tipContainer").style.visibility = "hidden";
        document.getElementById("tipsButton").disabled = false;
        await Swal.fire({
            icon: "success",
            title: appText[appLang.value]["correctAnswer"],
            showConfirmButton: false,
            timer: 1000,
            toast: true,
            customClass: "swal-answer",
        });
        if (countries.length > 0) {
            showTip.value = false;
            userAnswer.value = "";
            drawFlag();
        } else {
            await Swal.fire({
                icon: "success",
                title: appText[appLang.value]["congratulations"],
                text: appText[appLang.value]["gameWon"],
                showConfirmButton: true,
                confirmButtonText: appText[appLang.value]["playAgain"],
                allowOutsideClick: false,
                customClass: "swal-congratulations",
            }).then(() => {
                window.location = "/";
            });
        }
    } else {
        await Swal.fire({
            icon: "error",
            title: appText[appLang.value]["wrongAnswer"],
            showConfirmButton: false,
            timer: 1000,
            toast: true,
            customClass: "swal-answer",
        });
        handleWrongAnswer();
        //$emit("wrongAnswer", correctAnswer);
    }
}
function giveTip() {
    if (tipsNumber.value == 0) {
        Swal.fire("You have no tips left, sorry :(");
    } else {
        showTip.value = true;
        //$emit("tipUsed");
        document.getElementById("tipsButton").disabled = true;
        tip.value = generateTip();
    }
}
function generateTip() {
    let randomNumbers = [];
    let tipArray = [];
    let tipLetters = Math.round((correctAnswer.value.length * 35) / 100);
    while (randomNumbers.length < tipLetters) {
        let sortedNumber = Math.floor(Math.random() * correctAnswer.value.length);
        if (
            !randomNumbers.includes(sortedNumber) &&
            correctAnswer.value[sortedNumber].toString() !== " " &&
            correctAnswer.value[sortedNumber].toString() !== "-"
        ) {
            randomNumbers.push(sortedNumber);
            console.log(sortedNumber);
        } else if (correctAnswer.value[sortedNumber].toString() === " ") {
            console.log(sortedNumber + " é um espaço");
        } else {
            console.log(sortedNumber + " está repetido");
        }
    }
    randomNumbers.sort(function (a, b) {
        return a - b;
    });
    for (let i = 0; i < correctAnswer.value.length; i++) {
        switch (correctAnswer.value[i]) {
            case "-":
                tipArray.push("-");
                break;
            case " ":
                tipArray.push(" ");
                break;
            default:
                tipArray.push("_");
                break;
        }
    }
    for (let i = 0; i < randomNumbers[tipLetters - 1]; i++) {
        if (randomNumbers[i] > -1) {
            tipArray[randomNumbers[i]] = correctAnswer.value[randomNumbers[i]];
        }
    }
    tipArray[0] = tipArray[0].toUpperCase();
    tipArray = tipArray.join(" ");
    tipArray = tipArray.replace(`${/[A-Za-z] [A-Za-z]/g}`, "");
    document.querySelector("#formFlags > div.tipContainer").style.visibility = "visible";
    return tipArray;
}

onMounted(() => {
    document.onreadystatechange = () => {
        if (document.readyState == "complete") {
            showLanguageSelection();
        }
    };
});

async function showHighScores() {
    if (table.value !== "") {
        table.value = "";
        document.getElementById("high-score").remove();
    }

    const vnode = createVNode(HighScore);
    const offScreenDiv = document.createElement("div");
    offScreenDiv.setAttribute("id", "high-score");
    offScreenDiv.style.position = "absolute";
    offScreenDiv.style.left = "-9999px";
    document.body.appendChild(offScreenDiv);
    render(vnode, offScreenDiv);

    while (!table.value.includes("table")) {
        table.value = document.getElementById("high-score").innerHTML;
        await new Promise((resolve) => setTimeout(resolve, 50));
    }

    Swal.fire({
        title: "High Scores",
        html: table.value,
    });
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

.swal-gameOver .swal2-styled.swal2-confirm {
    background-color: #00aeef !important;
}

.swal-gameOver .swal2-styled.swal2-confirm:focus {
    box-shadow: 0 0 0 0px !important;
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
    max-width: 100% !important;
}

.flags {
    background-color: #ffffff;
    margin: 40px 10px;
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

#highScoresButton {
    margin-top: 10px;
}

#submitButton {
    width: 85px;
}

.swal-answer {
    width: min-content !important;
    white-space: nowrap !important;
}

.swal-congratulations {
    width: 480px !important;
    max-width: 100% !important;
}

.tip {
    margin-bottom: 10px;
}


.swal-answer .swal2-title {
    font-family: arial !important;
    font-weight: 600 !important;
    font-size: 1em !important;
    margin-top: 10px !important;
    margin-right: 10px !important;
    margin-bottom: 5px !important;
    margin-left: 10px !important;
}

.loader {
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin: 20px auto;
}
</style>
