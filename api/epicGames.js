import React, { useEffect, useState } from "react";

const EpicGamesList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEpicGames = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/poller"); // Serverless function endpoint
      if (!response.ok) throw new Error("Failed to fetch");
      console.log(response);
      const data = await response.json();
      setGames(data); // Adjust based on API response structure
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpicGames();
  }, []); // Run only on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Epic Free Games</h1>
      <ul>
        {games.map((game, index) => (
          <li key={game.id || index}>{game.title}</li> // Adjust fields as needed
        ))}
      </ul>
    </div>
  );
};

export default EpicGamesList;
