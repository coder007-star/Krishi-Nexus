import { useState, useEffect } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const apiKey = import.meta.env.VITE_WEATHER_API;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        fetchWeatherByLocation,
        showError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeatherByLocation = (position) => {
    const { latitude, longitude } = position.coords;
    fetchWeather(`lat=${latitude}&lon=${longitude}`);
    fetchForecast(`lat=${latitude}&lon=${longitude}`);
  };

  const fetchWeather = (query) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error("Error fetching weather data:", err));
  };

  const fetchForecast = (query) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastMap = new Map();
        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!forecastMap.has(date)) {
            forecastMap.set(date, item);
          }
        });
        setForecast([...forecastMap.values()]);
      })
      .catch((err) => console.error("Error fetching forecast data:", err));
  };

  const handleSearch = () => {
    if (!city) {
      alert("Please enter a city");
      return;
    }
    fetchWeather(`q=${city}`);
    fetchForecast(`q=${city}`);
  };

  const showError = () => console.error("Error in getting location");

  return (
    <section className="weather p-6 bg-gray-100  flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 text-center">
          Current Weather
        </h2>
        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Search
          </button>
        </div>
        <button
          onClick={() =>
            navigator.geolocation.getCurrentPosition(
              fetchWeatherByLocation,
              showError
            )
          }
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Use Current Location
        </button>
        {weather && (
          <div className="mt-6 flex flex-col items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt={weather.weather[0].description}
              className="w-20 h-20"
            />
            <div className="text-3xl font-bold">{weather.main.temp}°C</div>
            <div className="text-xl">{weather.name}</div>
            <div className="text-gray-600">
              {weather.weather[0].description}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full mt-6 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-green-700 text-center">
          5-Day Forecast
        </h2>
        <div className="mt-4 flex flex-col md:flex-row overflow-x-auto md:space-x-4 md:space-y-0 space-y-4 p-2">
          {forecast.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow min-w-[130px]"
            >
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
                className="h-12"
              />
              <p className="text-lg font-medium">
                {item.dt_txt.split(" ")[0].split("-").reverse().join("-")}
              </p>
              <p className="text-sm text-gray-600">{item.main.temp}°C</p>
              <p className="text-xs text-gray-500">
                {item.weather[0].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Weather;
