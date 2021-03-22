const axios = require('axios');
const express = require('express');
const router = express.Router();
const env = require('dotenv').config();

router.get('/mapquest_key', (req, res) => {
    res.json({ key: process.env.MAPQUEST_KEY });
});

router.get('/random_city', async (req, res) => {
    try {
        const response = await axios.get('https://geo.api.gouv.fr/communes');
        const cities = response.data;
        const numberOfCities = cities.length;
        const cityIndex = Math.floor(Math.random() * numberOfCities);
        const city = cities[cityIndex];
        res.json(city);
    } catch (error) {
        console.error(error.response);
    }
});


router.get('/city_description', async (req, res) => {
    const cityName = req.query.city;
    encodedCity = encodeURI(cityName);
    try {
        const wikiRes = await axios.get('https://en.wikipedia.org/w/api.php?'
            + `action=query&prop=extracts&exintro&explaintext&format=json&redirects&titles=${encodedCity}`);
        const page = wikiRes.data.query.pages;
        const pageId = Object.entries(page)[0][1];
        res.json(pageId);
    } catch (error) {
        console.error(error.response);
    }
});

router.get('/gouvfr_geo_fwd/:id', async (req, res) => {
    console.log(req.url);
    const endpoint = req.params.id;
    const uri = req.url.split('?')[1];
    try {
        const response = await axios.get(`https://geo.api.gouv.fr/${endpoint}?${uri}`);
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error.response);
    }
});

module.exports = router