import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import CitySearch from './components/CitySearch';
import CityOverview from './components/CityOverview';
import TodayForecast from './components/TodayForecast/TodayForecast';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import WeatherMap from './components/WeatherMap';

import { WeatherForecastService } from './core';
import { useVerticalOpening } from './components/utils';
import type { IWeatherForecast } from './core';


const WINDOW_THRESHOLD = 22;

function App() {
	const firstRenderRef = useRef( true );
	const [forecast, setForecast] = useState<IWeatherForecast|null>( null );
	const windowRef = useVerticalOpening<HTMLDivElement>( WINDOW_THRESHOLD );

	useEffect(() => {
		if( firstRenderRef.current )
		{
			WeatherForecastService.load({
				latitude: 59.94,
				longitude: 30.31,
			})
			.then(
				( weatherForecast: IWeatherForecast ) => {
					setForecast( weatherForecast );
				},
				( reason ) => {
					alert( 'Failed to load forecast. Reason: ' + reason );
				}
			);
			firstRenderRef.current = false;
			return;
		}
	}, [] );

	return (
		<>
		<div className="today-weather">
			<header className="today-weather_header">
				<CitySearch className='city-search' />
				<CityOverview city='Санкт-Петербург' />
			</header>
			<TodayForecast weather={forecast && forecast.currentWeather}/>
		</div>
		<div className="weekly-forecast" ref={windowRef} data-open="false">
			<WeeklyForecast
				city='Санкт-Петербург'
				forecast={forecast && forecast.weeklyForecast}
				/>
			<WeatherMap />
		</div>
	</>
	);
}

export default App;
