import React from 'react';
import {
	dateString,
	dayString,
	weekDayShortString,
} from '../../core';
import WeatherImg from '../WeatherImg';
import type { DailyForecast, WeatherCodeKeys } from '../../core';

export interface ICardProps {
	/**
	 * Прогноз погоды на день
	 */
	weather: DailyForecast
}

const WeatherCard = ({
	weather,
}: ICardProps ) => {
	return (
		<li className="weather-card">
			<time className="weather-card_header" dateTime={dateString( weather.time )}>
				<span className="shortWeek">{weekDayShortString( weather.time )}</span>, {dayString( weather.time )}
			</time>
			<div className="weather-card_temperature">
				<span className="weather-card_real_temperature">
					{weather.maxTemperature.asString()}
				</span>
				<div className="weather-card_img"
					title={weather.weatherCode.asString()}>
					<object
						data={WeatherImg[ weather.weatherCode.value.toString() as unknown as WeatherCodeKeys ]}
						type="image/svg+xml"
						role="img"
						aria-label={weather.weatherCode.asString()} />
				</div>
			</div>
			<div className="weather-card_params">
				<div className="weather-card_parameter">
					<span className="weather-card_parameter-name">мин</span>
					<span className="weather-card_parameter-value">
						{weather.minTemperature.asString()}
					</span>
				</div>
				<div className="weather-card_parameter">
					<span className="weather-card_parameter-name">ощущ</span>
					<span className="weather-card_parameter-value">
						{weather.apparentTemperature.asString()}
					</span>
				</div>
			</div>
		</li>
	);
};



export default WeatherCard;