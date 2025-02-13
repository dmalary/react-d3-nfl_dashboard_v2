import './App.css'

import { useState, useEffect } from 'react'

import { createClient } from "@supabase/supabase-js";
import { supaKey } from '../config';

// import CurvedRankAxis from "../components/CurvedRankAxis";
import Dropdown from '../components/Dropdown'

const supabase = createClient("https://vvlkqpqsfrexqrqcoiha.supabase.co", supaKey);

function App() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const [selectTeam, setSelectTeam] = useState(null);

  useEffect(() => {
    getPlayers();
    getTeams();
  }, []);

  // db call
  async function getPlayers() {
    try {
      setLoading(true); // Start loading
      const { data, error } = await supabase.from("nfl_draft").select();

      if (error) throw error; 
      setPlayers(data);

    } catch (err) {
      setError(err.message); 

    } finally {
      setLoading(false); // Stop loading
    }
  }

  async function getTeams() {
    try {
      setLoading(true); // Start loading
      const { data, error } = await supabase.from("draft_teams").select();

      if (error) throw error; 
      setTeams(data);

    } catch (err) {
      setError(err.message); 

    } finally {
      setLoading(false); // Stop loading
    }
  }
  
  console.log('players', players);
  console.log('teams', teams);
  console.log('selectTeam', selectTeam)
  
  return (
    <>
      <div>
        {loading && <p>Loading players...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          players.length
          // <ul>
          //   {players.map((player) => (
          //     <li key={player.key}>{player.playerName}</li>
          //   ))}
          // </ul>
        )}
      </div>

      {/* <CurvedRankAxis data={rankedData} />; */}

      <Dropdown data={teams} onSelect={setSelectTeam} />
    </>
  )
}

export default App
