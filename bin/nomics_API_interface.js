const axios = require("axios").default;
const chalk = require("chalk");
require('dotenv').config();


const checkPrice = async () => {
    const url = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&convert=USD&status=active&per-page=100&interval=1h`;
    const CryptocoinArr = [];
    try {
        const response = await axios.get(url);
        for(let i = 0; i < response.data.length; i++){
            const cryptocoin = {
                id: response.data[i].id,
                currency: response.data[i].currency,
                name: response.data[i].name,
                price: response.data[i].price,
                price_date: response.data[i].price_timestamp,
                market_cap: response.data[i].market_cap,
                rank: response.data[i].rank
            }
          CryptocoinArr.push(cryptocoin);
         
        }
        for(let i = 0; i < 10; i++){
            console.log(`Name: ${chalk.bold.yellow(CryptocoinArr[i].name)} / Price: ${chalk.bold.green('$'+CryptocoinArr[i].price)} / Price timestamp: ${chalk.bold.white(CryptocoinArr[i].price_date)} / Market cap: ${chalk.bold.magenta(CryptocoinArr[i].market_cap)} / Rank: ${chalk.bold.blue(CryptocoinArr[i].rank)}`);
           // console.log(CryptocoinArr.length);
      
        }

    } catch (e){
        console.log(e);
    }
}

// return a crpytocurrency based on name
const GetCryptoCurrency = async (id, interval) =>{
    const url = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.API_KEY}&convert=USD&status=active&ids=${id}&interval=${interval}`;
    const response = await axios.get(url);
    const cryptocoin = {
        id: response.data[0].id,
        currency: response.data[0].currency,
        name: response.data[0].name,
        price: response.data[0].price,
        price_date: response.data[0].price_timestamp,
        market_cap: response.data[0].market_cap,
        rank: response.data[0].rank,
        interval: {
            price_change: response.data[0][interval].price_change,
            price_change_pct: response.data[0][interval].price_change_pct
        }
    }    
    const {name, price, price_date, market_cap, rank} = cryptocoin;
    const {price_change, price_change_pct} = cryptocoin.interval;
    const data = `Name: ${chalk.yellow(name)} | Price: ${chalk.green("$"+price)} | Price date: ${price_date} | Market cap: ${chalk.magenta(market_cap)} | Rank: ${chalk.blue(rank)}\n
    ${interval} interval: Price change ${chalk.bold.redBright("$"+price_change)} / Precent change: ${chalk.bold.redBright(price_change_pct+"%")}`;
    console.log(data);
}

module.exports = {
    checkPrice: checkPrice,
    GetCryptoCurrency: GetCryptoCurrency
};


        
        

