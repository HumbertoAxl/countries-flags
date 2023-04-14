import database from "./firebaseConfig";
// import database from "@/services/firebaseConfig";
import { get, ref, set, child } from "firebase/database";

const playersRef = ref(database, "players");

export async function saveScore(username, score) {
    const data = {
        username: username,
        score: score,
        date: new Date().toLocaleDateString("en-GB"),
    };

    const numPlayers = await getNumberOfPlayers();
    const newScoreRef = child(playersRef, `${numPlayers}`);
    await set(newScoreRef, data)
}

export async function getNumberOfPlayers() {
    const snapshot = await get(playersRef);
    const numPlayers = snapshot.size;
    return numPlayers;
}
