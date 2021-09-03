import { useState, useEffect } from 'react';

import weatherAPI from '../services/weather-api';

const useCurrentLocation = () => {
  const [location, setLocation] = useState();
  const [searchLocation, setSearchLocation] = useState(null);
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
    weatherAPI.fetchWeather('London').then(data => setSearchLocation({ data }));
  }, []);

  console.log(searchLocation);
  return { location, searchLocation, error };
};

export default useCurrentLocation;
