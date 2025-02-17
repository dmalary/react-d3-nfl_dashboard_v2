import "./App.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { supaKey } from "../config";

import Dropdown from "../components/Dropdown";
import MapLayer from "../components/MapLayer";

const supabase = createClient("https://vvlkqpqsfrexqrqcoiha.supabase.co", supaKey);
const DEBUG = true; // Toggle this for debugging

function App() {
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTeams();
    getPositions();
  }, []);

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

  async function getTeamData() {
    if (!selectedTeam && !selectedPosition) return; // Prevent API call if nothing is selected

    setLoading(true);
    try {
      let query = supabase.from("team_pos_count").select();

      if (selectedTeam) query = query.eq("team", selectedTeam);
      if (selectedPosition) query = query.eq("position", selectedPosition);

      const { data, error } = await query;
      if (error) throw error;

      setTeamData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Reset all selections and clear data
  function resetFilters() {
    setSelectedTeam(null);
    setSelectedPosition(null);
    setTeamData([]);
    setError(null);
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

  const legendItems = [
    {color: '#12a4fd', label: 'one'},
    {color: '#f1c232', label: 'two'},
    {color: '#ec6060', label: 'three+'}
  ]

  return (
    <div className="mx-auto text-left">
      <div className="ml-3 pb-3 md:w-lg">
        <h1 className="py-3">The NFL’s College Talent Pipeline</h1>
        <p className="py-2">
          With the NFL Draft approaching, explore which schools supply the most players at each position—both league-wide and for individual teams.
        </p>
        <p className="py-2"><i>And don’t forget Hawaii!</i></p>
        <p className="py-2">Data sourced from Pro Football Reference (2000–2023).</p>
      </div>
      <div className="ml-3 pb-3 md:w-lg">
        Number of draftees
        <div className="flex flex-wrap gap-4 mt-4">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <hr className="title-divider h-0.5 my-5 border-0 rounded-sm bg-white" />
      
      {/* Dropdown Selections */}
      <div className="text-center">
        
        <div className="flex justify-center gap-4 mt-4">
        <Dropdown data={teams} onSelect={setSelectedTeam} title={"Teams"} />
        <Dropdown data={positions} onSelect={setSelectedPosition} title={"Positions"} />
          <button
            className={`px-4 py-2 rounded-md text-white transition ${
              selectedTeam || selectedPosition
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={getTeamData}
            disabled={!selectedTeam && !selectedPosition}
          >
            {loading ? "Loading..." : "Search"}
          </button>

          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

        <div className="mx-auto py-5">
          {selectedTeam !== null ? <p>Selected team: <strong>{selectedTeam}</strong></p> : <p>&nbsp;</p>}
          {selectedPosition !== null ? <p>Selected position: <strong>{selectedPosition}</strong></p> : <p>&nbsp;</p>}
        </div>

        {/* Error Message Display */}
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>

      {/* Map Component */}
      <div>
        <MapLayer mapData={geojsonData} />
      </div>
    </div>
  );
}

export default App;
