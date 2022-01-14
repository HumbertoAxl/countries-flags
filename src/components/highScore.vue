<template>
    <div class="highScoreContainer">
        <button id="highScoreButton" @click.prevent="showHighScores()">Show high scores</button>
    </div>
</template>
<script>
export default {
  name: 'High Score',
    data() {
        return {
            topScores: []
        }
    },
    methods: {
        async showHighScores() {
            this.topScores = await this.getHighScores()
            this.topScores.sort(function (a, b) {
                return b.score - a.score;
            });
            console.log(this.topScores);
            let topScoreList = []
            for (const index in this.topScores) {
                topScoreList.push(`${parseInt(index) + 1} - ${this.topScores[index].name}`)
            }
            console.log(topScoreList.join('<br>'))
        },
        async getHighScores() {
            return [
                { name: 'Humberto', score: 23, date: '13-01-2022' },
                { name: 'Joelson', score: 25, date: '14-01-2022' },
                { name: 'Tatiana', score: 25, date: '15-01-2022' }
            ]
        }
    }
}
</script>
<style>
#highScoreButton {
    margin-top: 15px;
    width: 150px;
}
</style>