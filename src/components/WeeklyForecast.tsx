import React, {FC} from 'react';
import WeatherCard from './WeatherCard';

interface IProps {
	city: string,
	className?: string,
}

const WeeklyForecast: FC<IProps> = ({
	city
}) => {
	return (
		<section className="weekly-forecast-overview">
			<h2>{'Погода на неделю в городе '+city}</h2>
			<ul className="weekly-forecast_week-list">
				<WeatherCard />
				<WeatherCard />
				<WeatherCard />
				<WeatherCard />
				<WeatherCard />
				<WeatherCard />
				<WeatherCard />
			</ul>
		</section>
	);
};

export default WeeklyForecast;