import React, { useEffect, useState } from 'react';

import './App.css';

import useCurrentLocation from './hooks/useCurrentLocation';
import Location from './components/Location';
import Searchbar from './components/SearchBar/';

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
      <Searchbar />
    </div>
  );
}

export default App;
