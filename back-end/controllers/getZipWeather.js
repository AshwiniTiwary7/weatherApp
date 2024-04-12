require('dotenv').config()
const weatherApiKey = process.env.API_KEY;

async function getWeatherZip(req, res) {
    try {
        const { zip } = req.params;
        if (!zip || zip.length !== 5) {
            res.status(404).json({
                message: "City Not Found"
            })
        }
        else {
            const apiDataZip = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${weatherApiKey}`);
            const usefullDataZip = await apiDataZip.json();
            res.status(usefullDataZip.cod).json({
                message: "Weather data for City Fetched!",
                dataWeather: usefullDataZip
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Sorry! There was an server-side error"
        })
    }
}

module.exports = getWeatherZip;