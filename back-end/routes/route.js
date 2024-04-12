const express = require('express');
const route = express.Router();

//controllers
const getWeather = require('../controllers/getWeather');
const getWeatherZip = require('../controllers/getZipWeather');

//mapping controllers
route.get('/weather/:city', getWeather);
route.get('/zipWeather/:zip', getWeatherZip);

//exporting route
module.exports = route;