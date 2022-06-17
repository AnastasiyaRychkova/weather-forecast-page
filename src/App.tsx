import React from 'react';
import './App.scss';
import CitySearch from './components/CitySearch';
import CityOverview from './components/CityOverview';
import TodayForecast from './components/TodayForecast';
import WeeklyForecast from './components/WeeklyForecast';
import WeatherMap from './components/WeatherMap';

function App() {
  return (
    <>
    <div className="today-weather">
      <header className="today-weather_header">
        <CitySearch />
        <CityOverview city='Санкт-Петербург' />
      </header>
      <TodayForecast />
    </div>
    <div className="weekly-forecast">
      <WeeklyForecast city='Санкт-Петербург' />
      <WeatherMap />
    </div>
  </>
  );
}

export default App;
