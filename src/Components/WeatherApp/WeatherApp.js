import React,{useState,useEffect} from "react";
import "./WeatherApp.css";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import haze_icon from "../Assets/haze_icon.png";


const WeatherApp=() => {

    const weatherIcons={
        Clear: clear_icon,
        Clouds:cloud_icon,
        Drizzle:drizzle_icon,
        Rain:rain_icon,
        Snow:snow_icon,
        Haze:snow_icon,
        Mist:snow_icon

    }

    const [city,setCity] = useState('Nagercoil');
    const [weatherData,setWeatherData]=useState(null);
    
    
    const api_key="dd94f859a0e52d6e4767fddf735f04a7";


    const search = async () =>{

        if (city === ""){
            return ;
        }

        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
        
        try{

            

            let response = await fetch(url);
            if(!response.ok){
                throw new Error ('Network response was not ok');
            }

            const data = await response.json();
            setWeatherData(data);
        }catch (error){
            console.error("Error fetching weather data:",error);
        }


        };

    useEffect(()=>{
        search();
    },[]);
    
    
    //     const element =document.getElementsByClassName("city-input")

    //     if(element[0].value===""){
    //         return 0;
    //     }
       


    //     let response= await fetch(url);

    //     const data=response.json();

    //     const humidity =document.getElementsByClassName("humdity-percentage");
    //     const wind =document.getElementsByClassName("wind-rate");

    //     const temperature =document.getElementsByClassName("weather-temp");
    //     const location =document.getElementsByClassName("weather-location");

    //     humidity[0].innerHTML=data.main.humidity;
    //     wind[0].innerHTML=data.wind.speed;
    //     temperature[0].innerHTML=data.main.temp;
    //     location[0].innerHTML=data.name



    // }

    return(
        <div className="container">
            <div className="top-bar">
                <input type="text" className="city-input" placeholder="search" value={city} onChange={(e) => setCity(e.target.value)}></input>
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="search_icon"></img>
                </div>
            </div>

            {weatherData ? (
                <div>

                
                <div className="weather-img">
                    <img src={weatherIcons[weatherData.weather[0].main]} alt="Weather Icon"></img>
                </div>

                <div className="weather-temp">{weatherData.main.temp}°C</div>
                <div className="weather-location">{weatherData.name}</div>

                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="humidity_icon" className="icon"></img>
                        <div className="data">
                            <div className="humdidity-percentage">{weatherData.main.humidity}%</div>
                            <div className="text">Humidity</div>
                                                        

                        </div>
                    </div>

                    <div className="element">
                        <img src={wind_icon} alt="wind_icon" className="icon"></img>
                        <div className="data">
                            <div className="wind-rate">{weatherData.wind.speed} km/h</div>
                            <div className="text">Wind Speed</div>
                                                        

                        </div>
                    </div>
                </div>

        </div>
        ):''
        }
           
        </div>
    );
};

export default WeatherApp;