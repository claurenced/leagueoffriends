import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchText, setSearchText] = useState("");
  const [gameList, setGameList] = useState([]);

  function getPlayerGames(event) {
    axios.get("http://localhost:4000/past5Games")
      .then(function (response) {
        setGameList(response.data) 
        }).catch(function (error) {
          console.log(error)
        })
  }

  console.log(gameList);

  return (
    <div className="App">
      <div className="container">
        <h5>League of Friends</h5>
        <input type="text" onChange={e=> setSearchText(e.target.value)}></input>
        <button onClick={getPlayerGames}>Search for last 5 games</button>
        {gameList.length !== 0 ?
        <>
          <p>Last 5 games:</p>
          {
            gameList.map((gameData, index) =>
            <>
              <h2>Game {index + 1}</h2>
              <div>
                {gameData.info.participants.map((data, participantIndex) => 
                <p>Player {participantIndex + 1}: {data.summonerName}, KDA: {data.kills} / {data.deaths} / {data.assists}</p>)}
              </div>
            </>
            )
           }
        </>
        : 
        <>
          <p>No data found</p>
        </>
         }
      </div>
    </div>
  );
}

export default App;
