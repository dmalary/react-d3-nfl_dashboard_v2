import "./App.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { supaKey } from "../config";

import Dropdown from "../components/Dropdown";
import MapLayer from "../components/MapLayer";

const supabase = createClient("https://vvlkqpqsfrexqrqcoiha.supabase.co", supaKey);
const DEBUG = false; // Toggle this for debugging

function App() {
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    getTeams();
    getPositions();
  }, []);

  useEffect(() => {
    if (selectedTeam || selectedPosition) {
      getTeamData(selectedTeam, selectedPosition);
    }
  }, [selectedTeam, selectedPosition]);

  async function getTeams() {
    try {
      const { data, error } = await supabase.from("draft_teams").select();
      if (error) throw error;
      setTeams(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function getPositions() {
    try {
      const { data, error } = await supabase.from("team_positions").select();
      if (error) throw error;
      setPositions(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function getTeamData(team, position) {
    try {
      if (!team && !position) return; // Prevent unnecessary API calls

      let query = supabase.from("team_pos_count").select();

      if (team) query = query.eq("team", team);
      if (position) query = query.eq("position", position);

      const { data, error } = await query;
      if (error) throw error;

      setTeamData(data);
    } catch (err) {
      setError(err.message);
    }
  }

  const convertToGeoJson = (dataArray) => ({
    type: "FeatureCollection",
    features: dataArray
      .filter((item) => item.longitude !== undefined && item.latitude !== undefined) // Prevent errors
      .map((item) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [item.longitude, item.latitude],
        },
        properties: { ...item },
      })),
  });

  const geojsonData = convertToGeoJson(teamData);

  if (DEBUG) {
    console.log("Teams:", teams);
    console.log("Positions:", positions);
    console.log("Selected Team:", selectedTeam);
    console.log("Selected Position:", selectedPosition);
    console.log("Team Data:", teamData);
    console.log("GeoJSON Data:", geojsonData);
  }

  return (
    <>
      <div>
        <h1>NFL Positional Feeder Schools</h1>
        <p>With the NFL Draft approaching, explore where the league—and individual teams—tend to recruit players by position.</p>
        <p>data from nfl-reference.com from 2000-2023</p>
        <p><i>And don’t forget Hawaii!</i></p>
      </div>
      <div>
        <Dropdown data={teams} onSelect={setSelectedTeam} title={"Teams"} />
        <Dropdown data={positions} onSelect={setSelectedPosition} title={"Positions"} />
      </div>
      <div>
        {selectedTeam && <p>Team: {selectedTeam}</p>}
        {selectedPosition && <p>Position: {selectedPosition}</p>}
      </div>
      <div>
        <MapLayer mapData={geojsonData} />
      </div>
    </>
  );
}

export default App;
