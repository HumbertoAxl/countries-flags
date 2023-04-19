<template>
    <div v-if="!dataIsLoaded" class="loader"></div>
    <table v-if="dataIsLoaded" id="scores-table">
        <thead>
            <tr>
                <th>#</th>
                <th>{{ appText[appLang]["table"]["userName"] }}</th>
                <th class="centered">{{ appText[appLang]["table"]["score"] }}</th>
                <th class="centered">{{ appText[appLang]["table"]["language"] }}</th>
                <th class="centered">{{ appText[appLang]["table"]["date"] }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(score, index) in scores" :key="score[index]">
                <td>{{ index + 1 }}</td>
                <td>{{ score.username }}</td>
                <td class="centered">{{ score.score }}</td>
                <td class="centered">{{ score.language }}</td>
                <td class="centered">{{ score.date }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1rem;
    font-size: 14px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: left;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #ddd;
}

.centered {
    text-align: center;
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>

<script setup>
import { ref } from "vue";
import { getPlayersScoresSortedByScoreAndData } from "@/services/api.js";
import appText from "@/js/language";

const dataIsLoaded = ref(false);
const scores = ref("");
const appLang = ref("EN");
getPlayersScoresSortedByScoreAndData().then((playerScores) => {
    scores.value = playerScores;
    dataIsLoaded.value = true;
});
</script>
