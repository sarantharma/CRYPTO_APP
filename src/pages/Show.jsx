import React from "react";
import showStore from "../store/showStore";
import { useParams } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";

export default function Show() {
  const store = showStore();
  const params = useParams();
  React.useEffect(() => {
    store.fetchData(params.id);
    return () => {
      store.reset();
    }
  }, []);
  
  return (
    <div>
      <Header back />
      {store.data && <>
      
      
      
      
      <header className="show-header">
        <img src={store.data.image.large} alt="coin"/>
        <h2>
          {store.data.name} ({store.data.symbol})
        </h2>
      </header>
      <div className="width">
        <div className="show-graph">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={store.graphData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Price"
                stroke="#8884d8"
                fill="white"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="show-details">
        <div className="width">
          <h2>Details</h2>
          <div className="show-details-row">
            <h4>Market cap rank</h4>
            <span>{store.data.market_cap_rank}</span>
          </div>

          <div className="show-details-row">
            <h4>24h high</h4>
            <span>{store.data.market_data.high_24h.cad}</span>
          </div>

          <div className="show-details-row">
            <h4>24h low</h4>
            <span>{store.data.market_data.low_24h.cad}</span>
          </div>

          <div className="show-details-row">
            <h4>Circulating supply</h4>
            <span>${store.data.market_data.circulating_supply}</span>
          </div>
          <div className="show-details-row">
            <h4>Current Price</h4>
            <span>${store.data.market_data.current_price.cad}</span>
          </div>
        </div>
      </div>
      </>}
    </div>
  );
}
