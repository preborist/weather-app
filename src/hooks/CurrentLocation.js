import { useState, useEffect } from 'react';
import { lattLongSearchApi } from '../services/weather-api';
import { weatherSearchApi } from '../services/weather-api';

const CurrentLocation = () => {
  const [location, setLocation] = useState();
  const [woeid, setWoeid] = useState(null);
  const [city, setCity] = useState(null);
  const [weatherCurrentLocation, setWeatherCurrentLocation] = useState(null);
  const [error, setError] = useState();

  const handleSuccess = position => {
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = error => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  useEffect(() => {
    const getCurrentWeather = async () => {
      if (location) {
        try {
          const data = await lattLongSearchApi(location);

          setWoeid(data[0].woeid);
          setCity(data[0].title);
        } catch (error) {
          setError(error.message);
        }
      }
    };
    getCurrentWeather();
  }, [location]);

  useEffect(() => {
    if (woeid) {
      const getWeather = async () => {
        try {
          const { consolidated_weather } = await weatherSearchApi(woeid);

          setWeatherCurrentLocation(consolidated_weather[0]);
        } catch (error) {
          setError(error.message);
        }
      };
      getWeather();
    }
  }, [woeid]);

  return (
    <div>
      {location ? (
        <div>
          <h2>Your current location is {city}</h2>
          <p>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>

          {weatherCurrentLocation && (
            <p>{weatherCurrentLocation.the_temp} &#8451;</p>
          )}
          {weatherCurrentLocation && (
            <p>
              {weatherCurrentLocation.weather_state_abbr}
              {weatherCurrentLocation.weather_state_name}
            </p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {error && <p className="errorMessage">Location Error: {error}</p>}
    </div>
  );
};

export default CurrentLocation;
