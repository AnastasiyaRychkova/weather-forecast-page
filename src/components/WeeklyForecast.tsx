import React, {FC} from 'react';
import { DailyForecast } from '../core/types';
import WeatherCard from './WeatherCard';

interface IProps {
	city: string,
	forecast: DailyForecast[] | null,
}

const WeeklyForecast: FC<IProps> = ({
	city,
	forecast,
}) => {
	return forecast && (
		<section className="weekly-forecast-overview">
			<h2>{'Погода на неделю в городе '+city}</h2>
			<ul className="weekly-forecast_week-list">
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