export function citySearchApi(searchQuery) {
  return fetch(
    `https://www.metaweather.com/api/location/search/?query=${searchQuery}`,
  ).then(response => {
    if (response.ok) {
      // console.log(response.json());
      return response.json();
    }

    return Promise.reject(new Error(`Нет города с именем ${searchQuery}`));
  });
}

export function lattLongSearchApi(searchQuery = {}) {
  const { latt, long } = searchQuery;
  return fetch(
    `https://www.metaweather.com/api/location/search/?lattlong=${latt},${long}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет города с именем ${searchQuery}`));
  });
}

export function weatherSearchApi(searchQuery = '') {
  return fetch(`https://www.metaweather.com/api/location/${searchQuery}/`).then(
    response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error(`Нет города с именем ${searchQuery}`));
    },
  );
}

