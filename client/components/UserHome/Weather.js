// import ReactWeather, { useOpenWeather } from "react-open-weather";
// import React from "react";

// const Weather = (props) => {
//   console.log(props.latitude, "props  in weather func. comp.");
//   const { data, isLoading, errorMessage } = useOpenWeather({
//     key: "4551bac685e686628b7a9997d7e6c1f6",
//     lat: props.latitude,
//     lon: props.longitude,
//     lang: "en",
//     unit: "imperial", // values are (metric, standard, imperial)
//   });
//   const customStyles = {
//     fontFamily: "Helvetica, sans-serif",
//     gradientStart: "#0181C2",
//     gradientMid: "#04A7F9",
//     gradientEnd: "#4BC4F7",
//     locationFontColor: "#FFF",
//     todayTempFontColor: "#FFF",
//     todayDateFontColor: "#B5DEF4",
//     todayRangeFontColor: "#B5DEF4",
//     todayDescFontColor: "#B5DEF4",
//     todayInfoFontColor: "#B5DEF4",
//     todayIconColor: "#FFF",
//     forecastBackgroundColor: "#FFF",
//     forecastSeparatorColor: "#DDD",
//     forecastDateColor: "#777",
//     forecastDescColor: "#777",
//     forecastRangeColor: "#777",
//     forecastIconColor: "#4BC4F7",
//   };
//   return (
//     <ReactWeather
//       isLoading={isLoading}
//       errorMessage={errorMessage}
//       data={data}
//       lang="en"
//       unitsLabels={{ temperature: "F", windSpeed: "m/h" }}
//       showForecast
//       theme={customStyles}
//     />
//   );
// };
// export default Weather;
