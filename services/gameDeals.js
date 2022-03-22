const url = "https://www.cheapshark.com/api/1.0/";
const fetch = require('node-fetch');

const getStores = async () => {
    const res = await fetch(url + "stores");
    return await res.json();
}

const getOfferFrom = async (title, shopId) => {
    console.log(url +`deals?title=${title}&storeID=${shopId}`)
    const res = await fetch(url +`deals?title=${title}&storeID=${shopId}`);
    return await res.json();
}

const findGameByTitle = async (title) => {
    const res = await fetch(url +`deals?title="${title}"&onSale=1`);
    return await res.json();
}

module.exports = {
    getStores,
    findGameByTitle,
    getOfferFrom
}