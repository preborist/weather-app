import { useState } from 'react';
import CityInfo from '../CityInfo/CityInfo';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState(null);
  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchLocation(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter City"
          value={query}
          onChange={handleChange}
        />
      </form>
      {searchLocation && <CityInfo query={searchLocation} />}
    </header>
  );
};

export default Searchbar;
