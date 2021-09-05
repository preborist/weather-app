import { useState, useEffect } from 'react';

import { citySearchApi, weatherSearchApi } from '../../services/weather-api';

const CityInfo = ({ query }) => {
  const [querySearchLocation, setQuerySearchLocation] = useState(null);
  const [woeid, setWoeid] = useState(null);
  const [weatherSearchLocation, setWeatherSearchLocation] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    if (query) {
      citySearchApi(query).then(data => setWoeid(data[0].woeid));
      setQuerySearchLocation(query);
    }
  }, [query]);

  useEffect(() => {
    if (woeid) {
      const getWeather = async () => {
        try {
          const { consolidated_weather } = await weatherSearchApi(woeid);
          console.log('consolidated_weather: ', consolidated_weather);
          setWeatherSearchLocation(consolidated_weather[0].the_temp);
        } catch (error) {
          setError(error.message);
        }
      };
      getWeather();
    }
  }, [woeid, querySearchLocation]);

  console.log('weatherSearchLocation:', weatherSearchLocation);

  return (
    <>
      {woeid && <p>{woeid}</p>}
      {weatherSearchLocation && (
        <p>{weatherSearchLocation.toFixed(2)} &#8451;</p>
      )}
    </>
  );
};

export default CityInfo;
