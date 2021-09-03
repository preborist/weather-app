function fetchWeather(query) {
  return fetch(
    `https://www.metaweather.com/api/location/search/?query=${query}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет города с именем ${query}`));
  });
}

const api = {
  fetchWeather,
};

export default api;
