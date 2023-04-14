<template>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=0.9, user-scalable=0" />
    </head>
    <Home :appText="appText"></Home>
</template>

<script>
import Home from "@/components/Home.vue";
export default {
    name: "App",
    components: {
        Home,
    },
    data() {
        return {
            appText: {
                EN: {
                    tip: "Tip",
                    score: "Score",
                    submit: "Submit",
                    correctAnswer: "Correct answer!",
                    wrongAnswer: "Wrong answer!",
                    showHighScores: "Show high scores",
                    workInProgress: "Work in progress",
                    gameOver: [
                        "The answer was: <b>",
                        "answer",
                        "</b><br>Final score: ",
                        "score",
                        "<br>Do you want to save your score?",
                    ],
                    playAgain: "Play again!",
                    congratulations: "Congratulations!",
                    gameWon: `Wow, you've got all the flags right! That's impressive! You can call yourself a flag master.`,
                },
                BR: {
                    tip: "Dica",
                    score: "Pontuação",
                    submit: "Enviar",
                    correctAnswer: "Resposta correta!",
                    wrongAnswer: "Resposta incorreta!",
                    showHighScores: "Melhores pontuações",
                    workInProgress: "Em desenvolvimento",
                    gameOver: [
                        "A resposta era: <b>",
                        "answer",
                        "</b><br>Pontuação final: ",
                        "score",
                        "<br>Deseja salvar sua pontuação?",
                    ],
                    playAgain: "Jogar novamente!",
                    congratulations: "Parabéns",
                    gameWon: `Você acertou todas as bandeiras! Que impressionante! Pode-se dizer que você é o mestre das bandeiras.`,
                },
            },
        };
    },
};
</script>

<style>
body {
    font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
    background-image: url("@/assets/geobackground.jpg");
    background-size: 100%;
    margin: 0;
    padding: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    height: 100%;
    width: 100%;
}

pre {
    display: inherit;
    font-family: inherit;
    white-space: pre;
    margin: 0px;
}

.tipContainer {
    margin-top: 5px;
    margin-bottom: 5px;
    visibility: hidden;
}

#app {
    margin-top: 60px;
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none !important;
    text-align: center;
}
.swal-languageSelect .swal2-title {
    font-size: 1.5em !important;
}
</style>
