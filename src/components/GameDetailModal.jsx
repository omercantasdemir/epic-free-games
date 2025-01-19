import React from "react";

const GameDetailModal = ({ game, modalVisibility, onClose }) => {
  console.log(game);
  if (!modalVisibility) return null;
  const priceFormatter = (rawPrice) => {
    return (
      rawPrice / Math.pow(10, game.price.totalPrice.currencyInfo.decimals)
    ).toFixed(game.price.totalPrice.currencyInfo.decimals);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>{game?.title}</h1>
        {game.keyImages.map((image) => {
          if (image.type === "OfferImageWide")
            return <img src={image.url} alt="" />;
        })}

        <p className="game-description">{game.description}</p>
        <div className="offer">
          <p> {priceFormatter(game.price.totalPrice.discountPrice)} ₺</p>
          <button
            onClick={() => {
              alert("You're being redirected to Epic Games Store!");
              window.location.href = `https://store.epicgames.com/en-US/p/${game.catalogNs.mappings[0].pageSlug}`;
            }}
          >
            Store Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetailModal;
