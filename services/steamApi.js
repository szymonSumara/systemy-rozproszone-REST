const url = "https://store.steampowered.com/api/featuredcategories";
const fetch = require('node-fetch');

const getTopSelers = async() => {
    const res = await fetch(url);
    const data =  await res.json();
    return data['top_sellers'];
}


module.exports = {
    getTopSelers
}