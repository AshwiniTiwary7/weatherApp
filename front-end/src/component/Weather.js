import React, { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

export default function Weather({ optionSelected }) {
    const [cityData, setCityData] = useState({
        cityName: '',
        cityOrigin: '',
        mainWeather: '',
        cityTemp: '',
        cityTempMin: '',
        cityTempMax: '',
        cityPressure: '',
        cityHumidity: ''
    })

    const [cityName, setCityName] = useState('');
    const [zipCode,setZipCode] = useState(0);
    const [loading, setLoading] = useState(false);

    async function getDataForCity(event, city) {
        event.preventDefault();
        setLoading(true);
        try {
            const respCityData = await axios.get(`http://localhost:4000/api/v1/weather/${city}`);
            console.log(respCityData);
            if (respCityData.status === 200 && respCityData.data.dataWeather.cod === 200) {
                setCityData({
                    cityName: respCityData.data.dataWeather.name,
                    cityOrigin: respCityData.data.dataWeather.sys.country,
                    mainWeather: respCityData.data.dataWeather.weather[0].main,
                    cityTemp: respCityData.data.dataWeather.main.temp,
                    cityTempMin: respCityData.data.dataWeather.main.temp_min,
                    cityTempMax: respCityData.data.dataWeather.main.temp_max,
                    cityPressure: respCityData.data.dataWeather.main.pressure,
                    cityHumidity: respCityData.data.dataWeather.main.humidity
                })
            }
            toast.success(respCityData.data.message);
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.dataWeather.message)
            }
            else {
                console.log(err);
            }
        }
        setLoading(false);
    }

    async function getDataForZip(event, zip) {
        event.preventDefault();
        setLoading(true);
        try {
            const respCityData = await axios.get(`http://localhost:4000/api/v1/weather/${zip}`);
            console.log(respCityData);
            if (respCityData.status === 200 && respCityData.data.dataWeather.cod === 200) {
                setCityData({
                    cityName: respCityData.data.dataWeather.name,
                    cityOrigin: respCityData.data.dataWeather.sys.country,
                    mainWeather: respCityData.data.dataWeather.weather[0].main,
                    cityTemp: respCityData.data.dataWeather.main.temp,
                    cityTempMin: respCityData.data.dataWeather.main.temp_min,
                    cityTempMax: respCityData.data.dataWeather.main.temp_max,
                    cityPressure: respCityData.data.dataWeather.main.pressure,
                    cityHumidity: respCityData.data.dataWeather.main.humidity
                })
            }
            toast.success(respCityData.data.message);
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.dataWeather.message)
            }
            else {
                console.log(err);
            }
        }
        setLoading(false);
    }

    if (optionSelected === 'city') {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="input-group input-group-lg w-50">
                    <form onSubmit={(event) => getDataForCity(event, cityName)} className="w-100 d-flex">
                        <span className="input-group-text bg-secondary text-white" id="inputGroup-sizing-lg">Enter City</span>
                        <input type="text" className="form-control border-dark" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={cityName} onChange={(e) => { setCityName(e.target.value) }} required />
                        <input type="submit" value='Search' className="bg-primary rounded-2 border-0 fw-bold text-light" />
                    </form>
                </div>
                <div className="mt-5">
                    {
                        loading ? (<div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>) : (<div>
                            <p className="d-flex justify-content-between px-2 fw-bold"><span>City - {cityData.cityName}</span><span>Country - {cityData.cityOrigin}</span></p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Weather - {cityData.mainWeather}</li>
                                <li className="list-group-item">Current Temperature - {cityData.cityTemp}</li>
                                <li className="list-group-item">Min Temperature - {cityData.cityTempMin}</li>
                                <li className="list-group-item">Max Temperature - {cityData.cityTempMax}</li>
                                <li className="list-group-item">Humidity - {cityData.cityHumidity}</li>
                            </ul>
                        </div>)
                    }
                </div>
            </div>
        )
    }
    else if (optionSelected === 'zip') {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="input-group input-group-lg w-50">
                    <form onSubmit={(event) => getDataForZip(event, zipCode)} className="w-100 d-flex">
                        <span className="input-group-text bg-secondary text-white" id="inputGroup-sizing-lg">Enter Zip Code</span>
                        <input type="number" className="form-control border-dark" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" value={zipCode} onChange={(e) => { setZipCode(e.target.value) }} required />
                        <input type="submit" value='Search' className="bg-primary rounded-2 border-0 fw-bold text-light" />
                    </form>
                </div>
                <div className="mt-5">
                    {
                        loading ? (<div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>) : (<div>
                            <p className="d-flex justify-content-between px-2 fw-bold"><span>City - {cityData.cityName}</span><span>Country - {cityData.cityOrigin}</span></p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Weather - {cityData.mainWeather}</li>
                                <li className="list-group-item">Current Temperature - {cityData.cityTemp}</li>
                                <li className="list-group-item">Min Temperature - {cityData.cityTempMin}</li>
                                <li className="list-group-item">Max Temperature - {cityData.cityTempMax}</li>
                                <li className="list-group-item">Humidity - {cityData.cityHumidity}</li>
                            </ul>
                        </div>)
                    }
                </div>
            </div>
        )
    }
    else {
        return (<h1>Invalid Request Type!</h1>)
    }
}