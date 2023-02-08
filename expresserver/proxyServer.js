var express = require('express')
var cors = require('cors')
const axios = require('axios');
const { get } = require('http');

const app = express();

app.use(cors());

const API_KEY = "RGAPI-81fc6315-66ef-4a9d-a487-afa022c43861"

function getPlayerPUUID(playerName) {
    return axios.get("https://na1.api.riotgames.com" + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY)
   .then(response => {
    console.log(response.data);
    return response.data.puuid
}).catch(err => err)
}

app.listen(4000, function () {
    console.log("Server started on port 4000")
});

app.get('/past5Games', async (req, res) => {
    const playerName = "GoldRangerX"
    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY
    const gameIDs = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(err =>err)
    console.log(gameIDs)

    var matchDataArray = [];
    for(var i =0; i < gameIDs.length - 15; i++) {
        const matchID = gameIDs [i];
        const matchData = await axios.get("https://americas.api.riotgames.com" + "/lol/match/v5/matches/" + matchID + "?api_key=" + API_KEY)
        .then(response => response.data)
        .catch(err => err)
    matchDataArray.push(matchData)
    }

    res.json(matchDataArray)
});