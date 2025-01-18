import React, { useEffect, useState } from "react";

const EpicGamesList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const fetchEpicGames = async () => {
    try {
      const response = await fetch("/api/poller");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setGames(data.data.Catalog.searchStore.elements);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEpicGames();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="freeGames">
      <h1>Epic Free Games</h1>
      <div className="gamesList">
        {games.map((game) => (
          <div className="freeItem">
            {game.keyImages.map((image) => {
              if (image.type === "OfferImageWide")
                return <img src={image.url} alt="" />;
            })}
            <div className="itemDetails">
              <h3>{game.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpicGamesList;
