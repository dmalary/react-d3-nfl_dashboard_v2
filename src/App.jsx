import './App.css'

import { useState, useEffect } from 'react'

import { createClient } from "@supabase/supabase-js";
import { supaKey } from '../config';

  const supabase = createClient("https://vvlkqpqsfrexqrqcoiha.supabase.co", supaKey);


function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    getPlayers();
  }, []);

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

  console.log('players', players);
  
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
    </>
  )
}

export default App
