export function citySearchApi(searchQuery) {
  return fetch(
    `https://www.metaweather.com/api/location/search/?query=${searchQuery}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет города с именем ${searchQuery}`));
  });
}

export function lattLongSearchApi(searchQuery) {
  const { latitude, longitude } = searchQuery;
  return fetch(
    `https://www.metaweather.com/api/location/search/?lattlong=${latitude},${longitude}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(
        `Нет данных погоды по Вашим координатам ${latitude}, ${longitude}`,
      ),
    );
  });
}

export function weatherSearchApi(searchQuery = '') {
  return fetch(`https://www.metaweather.com/api/location/${searchQuery}/`).then(
    response => {
      if (response.ok) {
        return response.json().then(data => data);
      }

      return Promise.reject(new Error(`Нет города с именем ${searchQuery}`));
    },
  );
}
