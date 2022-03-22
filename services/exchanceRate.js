const url = "https://v6.exchangerate-api.com/v6/8a3e7fb5070d30d92e061232/latest/";
const fetch = require('node-fetch');

const getExchanceValue = async(from, to) => {
    const res = await fetch(url + from);
    const data =  await res.json();
    return data.conversion_rates[to];
}

module.exports = {
    getExchanceValue
}