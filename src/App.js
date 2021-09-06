import React, { useEffect, useState } from 'react';

import './App.css';

import CurrentLocation from './hooks/CurrentLocation';
// import Location from './components/Location';
import Searchbar from './components/SearchBar/';

function App() {
  // const {
  //   location: currentLocation,
  //   weatherCurrentLocation,
  //   error: currentError,
  // } = useCurrentLocation();

  return (
    <div className="appContainer">
      <header>
        <h1>Weather App</h1>
      </header>

      <CurrentLocation />
      <Searchbar />
    </div>
  );
}

export default App;
