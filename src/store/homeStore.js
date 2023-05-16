import { create } from 'zustand';
import axios from 'axios';
import debounce from '../helpers/debounce';

const homeStore = create((set) => ({

    coins:[],
    trending:[],
    query:'',
    searched:false,

    setQuery:(e) => {
        set({query:e.target.value})
        homeStore.getState().searchCoins();
    },

    searchCoins: debounce( async () => {
        const {query, trending} = homeStore.getState();

        if(query.length > 2){
            const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
            const coins = res.data.coins.map(coin => {
                return{
                    name: coin.name,
                    image: coin.large,
                    id: coin.id
                }
            });      
            set({coins, searched:true})
        }else{
            set({coins: trending, searched:false})
        }
    }, 500),

    fetchCoins: async() => {
        const [res,btcRes] = await Promise.all([
            axios.get('https://api.coingecko.com/api/v3/search/trending'),
            axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad")
        ])

        const btcPrice = btcRes.data.bitcoin.cad;
        const coins = res.data.coins.map(coin => {
            return{
                name: coin.item.name,
                image: coin.item.large,
                id: coin.item.id,
                price: coin.item.price_btc.toFixed(12),
                priceCad: (coin.item.price_btc * btcPrice).toFixed(6)
            }

        })
        set({coins, trending:coins})
    }
}))

export default homeStore;