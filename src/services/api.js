import database from "./firebaseConfig";
import { get, ref, set, child } from "firebase/database";

const playersRef = ref(database, "players");

export async function saveScore(username, userScore, language) {
    const data = {
        username: username,
        score: userScore,
        language: language,
        date: new Date().toLocaleDateString("en-GB"),
    };
    // await getPlayerRank(data);

    const numPlayers = await getNumberOfPlayers();
    const newScoreRef = child(playersRef, `${numPlayers}`);
    await set(newScoreRef, data);
    return getNumberOfPlayers();
}

export async function getNumberOfPlayers() {
    const snapshot = await get(playersRef);
    const numPlayers = snapshot.size;
    return numPlayers;
}

// async function getPlayerRank(data) {
//     const scores = await getPlayersScores();

//     scores.sort((a, b) => {
//         if (b.score !== a.score) {
//           return b.score - a.score;
//         } else {
//           return new Date(b.date) - new Date(a.date);
//         }
//       });

//     const numberOfPlayers = await getNumberOfPlayers();
// }

//Gets all scores on firebase database
export async function getPlayersScores() {
    const snapshot = await get(playersRef);
    const data = snapshot.val();
    return data;
}

export async function getPlayersScoresSortedByScoreAndData() {
    const snapshot = await get(playersRef);
    const data = snapshot.val();
    const sortedData = data.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        } else {
            const dateA = new Date(a.date.split("/").reverse().join("-"));
            const dateB = new Date(b.date.split("/").reverse().join("-"));
            return dateA - dateB;
        }
    });
    return sortedData;
}
