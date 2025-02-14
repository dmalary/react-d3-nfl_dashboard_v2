import './App.css'

import { useState, useEffect } from 'react'

import { createClient } from "@supabase/supabase-js";
import { supaKey } from '../config';

import Dropdown from '../components/Dropdown'
import MapLayer from '../components/MapLayer'

const supabase = createClient("https://vvlkqpqsfrexqrqcoiha.supabase.co", supaKey);

function App() {
  // const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [schools, setSchools] = useState([]);

  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    getPlayers();
    getTeams();
    getSchools();
  }, []);

  // db call
  async function getPlayers() {
    try {
      // setLoading(true); // Start loading
      const { data, error } = await supabase.from("nfl_draft").select();

      if (error) throw error; 
      setPlayers(data);

    } catch (err) {
      setError(err.message); 

    } finally {
      // setLoading(false); // Stop loading
    }
  }

  async function getTeams() {
    try {
      // setLoading(true); // Start loading
      const { data, error } = await supabase.from("draft_teams").select();

      if (error) throw error; 
      setTeams(data);

    } catch (err) {
      setError(err.message); 

    } finally {
      // setLoading(false); // Stop loading
    }
  }

  async function getSchools() {
    try {
      // setLoading(true); // Start loading
      const { data, error } = await supabase.from("draft_colleges").select();

      if (error) throw error; 
      setSchools(data);

    } catch (err) {
      setError(err.message); 

    } finally {
      // setLoading(false); // Stop loading
    }
  }
  
  // console.log('players', players);
  // console.log('teams', teams);
  console.log('schools', schools);
  // console.log('selectedTeam', selectedTeam)

  const convertToGeoJson = (dataArray) => {
    const geoJson = {
      type: "FeatureCollection",
      features: dataArray.map((item) => ({
        type: "Feature",
        geometry: {
          type: "Point", 
          coordinates: [item.longitude, item.latitude],
        },
        properties: { ...item },
      })),
    };
    return geoJson;
  };


  const geojsonData = convertToGeoJson(schools);
  console.log(geojsonData);
  
  return (
    <>
      {/* part 1: map of positional feeder schools */}
      <div>
        <MapLayer mapData={geojsonData} />
      </div>

      {/* part 2: dashbard of rounds and picks */}
      {/* <div>
            <Dropdown data={teams} onSelect={setSelectedTeam} />
      </div> */}
    </>
  )
}

export default App
