import React from 'react';
import { cityIn } from 'lvovich';
import { useHorizontalScroll } from '../utils';
import WeatherCard from '../WeatherCard';
import type { DailyForecast } from '../../core';

export interface IWeeklyForecastProps {
	city: string,
	forecast: DailyForecast[] | null,
}

const WeeklyForecast = ({
	city,
	forecast,
}: IWeeklyForecastProps ) => {
	const ref = useHorizontalScroll<HTMLUListElement>();
	return forecast && (
		<section className="weekly-forecast-overview">
			<h2>{'Погода на неделю в '+cityIn( city )}</h2>
			<ul className="weekly-forecast_week-list" ref={ref}>
			{
				forecast.map(
					(weather) => <WeatherCard
						weather={weather}
						key={weather.time.getDate()}
						/>
				)
			}
			</ul>
		</section>
	);
};

export default WeeklyForecast;