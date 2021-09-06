import { useState, useEffect } from 'react';
// import Rainbow from 'rainbowvis.js';
import { citySearchApi, weatherSearchApi } from '../../services/weather-api';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

// Rainbow.setNumberRange(minNumber, maxNumber);
// const myRainbow = new Rainbow();
// // myRainbow.setNumberRange(1, 100);
// myRainbow.setSpectrum('#00ffff', '#fff700', '#ff8c00');
// console.log(myRainbow.colourAt);

const CityInfo = ({ query }) => {
  // const [querySearchLocation, setQuerySearchLocation] = useState(null);
  const [woeid, setWoeid] = useState(null);
  const [weatherSearchLocation, setWeatherSearchLocation] = useState(null);
  const [error, setError] = useState();

  function updateCountryMarkup(data) {
    if (data.length === 1) {
      setWoeid(data[0].woeid);
    } else if (data.length > 1) {
      toastr['error'](
        'Too many matches found. Please enter a more specific query!',
      );
    } else if (data.length === 0) {
      toastr['error'](`there are no results according your request`);
    }
  }

  useEffect(() => {
    if (query) {
      const getCity = async () => {
        try {
          const data = await citySearchApi(query);

          updateCountryMarkup(data);
        } catch (error) {
          setError(error.message);
        }
      };
      getCity();
    }
  }, [query]);

  useEffect(() => {
    if (woeid) {
      const getWeather = async () => {
        try {
          const { consolidated_weather } = await weatherSearchApi(woeid);

          setWeatherSearchLocation(consolidated_weather[0]);
        } catch (error) {
          setError(error.message);
        }
      };
      getWeather();
    }
  }, [woeid]);

  return (
    <>
      {woeid && <p>{woeid}</p>}
      {weatherSearchLocation && <p>{weatherSearchLocation.the_temp} &#8451;</p>}
      {weatherSearchLocation && (
        <p>
          {weatherSearchLocation.weather_state_abbr}
          {weatherSearchLocation.weather_state_name}
        </p>
      )}
    </>
  );
};
// const CityInfo = ({ query }) => {
//   // const [querySearchLocation, setQuerySearchLocation] = useState(null);
//   const [woeid, setWoeid] = useState(null);
//   const [weatherSearchLocation, setWeatherSearchLocation] = useState(null);
//   const [error, setError] = useState();

//   function updateCountryMarkup(data) {
//     if (data.length === 1) {
//       setWoeid(data[0].woeid);
//     } else if (data.length > 1) {
//       toastr['error'](
//         'Too many matches found. Please enter a more specific query!',
//       );
//     } else if (data.length === 0) {
//       toastr['error'](`there are no results according your request`);
//     }
//   }

//   useEffect(() => {
//     if (query) {
//       const getCity = async () => {
//         try {
//           const data = await citySearchApi(query);

//           updateCountryMarkup(data);
//         } catch (error) {
//           setError(error.message);
//         }
//       };
//       getCity();
//     }
//   }, [query]);

//   useEffect(() => {
//     if (woeid) {
//       const getWeather = async () => {
//         try {
//           const { consolidated_weather } = await weatherSearchApi(woeid);

//           setWeatherSearchLocation(consolidated_weather[0]);
//         } catch (error) {
//           setError(error.message);
//         }
//       };
//       getWeather();
//     }
//   }, [woeid]);

//   return (
//     <>
//       {woeid && <p>{woeid}</p>}
//       {weatherSearchLocation && <p>{weatherSearchLocation.the_temp} &#8451;</p>}
//       {weatherSearchLocation && (
//         <p>
//           {weatherSearchLocation.weather_state_abbr}
//           {weatherSearchLocation.weather_state_name}
//         </p>
//       )}
//     </>
//   );
// };

export default CityInfo;
