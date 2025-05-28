import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../images/search.png'
import clear_icon from '../images/clear.png'
import cloud_icon from '../images/cloud.png'
import drizzle_icon from '../images/drizzle.png'
import rain_icon from '../images/rain.png'
import snow_icon from '../images/snow.png'
import wind_icon from '../images/wind.png'
import humidity_icon from '../images/humidity.png'

import NoData from './NoData'

const Weather = () => {
    const inputRef = useRef()

    const [weatherData,setWeatherData] = useState(false);

    const allicons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon

    }

const search = async (city) =>{
    if(city === ""){
       setWeatherData(false)
        return;
    }
    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=859ad889c2124d2d4893e1b4b6c01df6`;
        const response = await fetch(url);
        if(!response.ok){
            setWeatherData(false);
        }
        const data = await response.json();
        console.log(data);
        const icon = allicons[data.weather[0].icon] || clear_icon;
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location:data.name,
            icon: icon
        })
    } catch (error) {
        setWeatherData(false);
        console.error("Error fetching data..." + error);
    }
}

    useEffect(() =>{
    search("London");
    },[])


  return (
    <div className='weather'>
        {/* search section */}
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search' />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        
        {/* weather section */}
        {weatherData?<>
        <img src={weatherData.icon} alt=""  className='weather-icon'/>
        <p className='temp'>{weatherData.temperature} C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<>
        {/* no result */}
         <NoData/>
        </>}

    </div>
  )
}

export default Weather