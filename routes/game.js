const { Router } = require('express');
const router = Router();
const gameDeals = require('../services/gameDeals.js');
const excanceRate = require('../services/exchanceRate.js');
const steamApi = require('../services/steamApi')


router.get('/game', async (request, response) => {


    let shops;
    const requests = []
    let requrestsResults;
    let stores;
    let exchanceValue;
    let topSellers;


    if (!request.query.title) return response.status(400).send('Title cannot be empty')
    if (!request.query.shops) return response.status(400).send('Minimum one shop should be choose')

    try {
        shops = request.query.shops.split(',').map(s => {
            const number = parseInt(s);
            if(isNaN(number)) throw new Error('Parrse Error');
            return number;
        });
    } catch (error) {
        return response.status(400).send("Shops numbers parrse error");
    }

    if (shops.length == 0) return response.status(400).send('Minimum one shop should be choose')

    try {

        requests.push(gameDeals.getStores());
        requests.push(excanceRate.getExchanceValue('USD', 'PLN'))
        requests.push(steamApi.getTopSelers())

        for (let i = 0; i < shops.length; i++) {
            requests.push(gameDeals.getOfferFrom(request.query.title, shops[i]))
        }
        [stores, exchanceValue, topSellers, ...requrestsResults] = await Promise.all(requests);
    } catch (e) {
        return response.status(500).send("data fatch error")
    }

    const bestPrices = {}
    requrestsResults.forEach(req =>
        req.forEach(row => {
            if (bestPrices[row.title] == undefined)
                bestPrices[row.title] = row
            else if (parseFloat(bestPrices[row.title].salePrice) > parseFloat(row.salePrice))
                bestPrices[row.title] = row
        })
    )

    return response.send({
            topSellers,
            searchResult: Object.values(bestPrices).map(d => {
                return {

                    title: d.title,
                    store: stores.find(s => s.storeID == d.storeID).storeName,
                    salePrice: Math.round(parseFloat(d.salePrice) * exchanceValue * 100) / 100,
                    normalPrice: Math.round(parseFloat(d.normalPrice) * exchanceValue * 100) / 100
                }
            })
        }
    );
})

module.exports = router;