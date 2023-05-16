import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ coin }) {
  return (
    <div className="home-crypto">
      <Link to={`/${coin.id}`}>
        <span className="home-crypto-image"><img src={coin.image} alt="coin"/></span>
        <span className="home-crypto-name">{coin.name}</span>
        {coin.price && 
            <span className="home-crypto-prices">
                <span className="home-crypto-cad">{coin.priceCad} CAD</span>
                <span className="home-crypto-btc">{coin.price} BTC</span>
            </span>
        }
        
      </Link>
    </div>
  );
}
