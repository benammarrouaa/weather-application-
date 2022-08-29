import { useState } from "react";
import "./App.css";
import CitySearchComponent from "./components/CitySearchComponent";
import CurrentWeather from "./components/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./ApiS";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const onSearchChangeHandler = (searchData) => {
    // Get location of city:
    const [latitude, longitude] = searchData.value.split(" ");
    // Fetch data for current weather from API:
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    // Execute fetching:
    Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const currentWeatherResponse = await response[0].json();

        // Update state:
        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App-header">
      <div className="App">
        <CitySearchComponent  onSearchChange={onSearchChangeHandler} />
        {currentWeather && <CurrentWeather WeatherData={currentWeather} />}
      </div>
    </div>
  );
}

export default App;
