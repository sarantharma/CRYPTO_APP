import { create } from "zustand";
import axios from "axios";

const showStore = create((set) => ({
  graphData: [],
  data:null,
  reset:()=>{
    set({graphData:[], data: null})
  },
  fetchData: async (id) => {
    const [graphRes, dataRes] = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=cad&days=365`
      ),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true
            `),
    ]);

    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("en-us");
      return {
        Date: date,
        Price: p,
      };
    });
    set({data:dataRes.data, graphData });
  },
  
}));

export default showStore;
