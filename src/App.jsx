import React, { useEffect, useState } from "react";
import GameDetailModal from "./components/GameDetailModal";

const EpicGamesList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedGame, setSelectedGame] = useState();
  const [loading, setLoading] = useState(false);
  const fetchEpicGames = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/poller");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setGames(data.data.Catalog.searchStore.elements);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const toggleModal = () => setModalVisibility(!modalVisibility);
  const clickHandler = (game) => {
    setSelectedGame(game);
    setModalVisibility(!modalVisibility);
  };
  useEffect(() => {
    fetchEpicGames();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return loading ? (
    <div className="freeGames">
      <h1 style={{ width: "100%", textAlign: "center" }}>Loading Data</h1>
      <span class="loader"></span>
    </div>
  ) : (
    <div className="freeGames">
      <h1>Epic Free Games</h1>
      <div className="gamesList">
        <GameDetailModal
          onClose={toggleModal}
          game={selectedGame}
          modalVisibility={modalVisibility}
        />
        {games.map((game) => {
          if (game.price.totalPrice.discountPrice === 0) {
            return (
              <div onClick={() => clickHandler(game)}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="freeItem">
                    {game.keyImages.map((image) => {
                      if (image.type === "OfferImageWide")
                        return <img src={image.url} alt="" />;
                    })}
                    <div className="itemDetails">
                      <h3>{game.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}

        <h3 style={{ width: "100%", textAlign: "center", fontSize: 30 }}>
          Not free, but check it out i guess.
        </h3>
        {games.map((game) => {
          if (game.price.totalPrice.discountPrice !== 0) {
            return (
              <div onClick={() => clickHandler(game)}>
                <div className="freeItem">
                  {game.keyImages.map((image) => {
                    if (image.type === "OfferImageWide")
                      return <img src={image.url} alt="" />;
                  })}
                  <div className="itemDetails">
                    <h3>{game.title}</h3>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default EpicGamesList;
