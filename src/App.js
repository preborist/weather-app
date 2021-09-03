import React, { useEffect, useState } from 'react';

import './App.css';

import useCurrentLocation from './hooks/useCurrentLocation';
// import useWatchLocation from './hooks/useWatchLocation';
// import { geolocationOptions } from './constants/geolocationOptions';
import Location from './components/Location';

function App() {
  const {
    location: currentLocation,
    query: searchLocation,
    error: currentError,
  } = useCurrentLocation();

  return (
    <div className="appContainer">
      <header>
        <h1>HTML Geolocation API with React Hooks</h1>
      </header>
      <p>Current position:</p>
      <Location
        location={currentLocation}
        query={searchLocation}
        error={currentError}
      />
    </div>
  );
}

export default App;
