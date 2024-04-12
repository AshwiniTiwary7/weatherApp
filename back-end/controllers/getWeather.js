require('dotenv').config()
const weatherApiKey = process.env.API_KEY;

async function getWeatherForecast(req, res) {
    try {
        const { city } = req.params;
        if (!city) {
            res.status(404).json({
                message: "City Not Found"
            })
        }
        else {
            const apiData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`);
            const usefullData = await apiData.json();
            res.status(usefullData.cod).json({
                message: "Weather data for City Fetched!",
                dataWeather: usefullData
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Sorry! There was an server-side error"
        })
    }
}

module.exports = getWeatherForecast;