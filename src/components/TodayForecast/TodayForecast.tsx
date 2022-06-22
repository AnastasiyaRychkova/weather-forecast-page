import React from 'react';
import WeatherImg from '../WeatherImg';
import type { CurrentWeather, WeatherCodeKeys } from '../../core';


export interface ITodayForecastProps {
	weather: CurrentWeather | null,
}

const TodayForecast = ({
	weather,
}: ITodayForecastProps) => {
	return weather && (
		<section className="today-forecast">
			<div className="today-forecast_main">
				<div className="today-forecast_img"
					title={weather.weatherCode.asString()}>
					<object
						data={WeatherImg[ weather.weatherCode.value.toString() as unknown as WeatherCodeKeys ]}
						type="image/svg+xml"
						role="img"
						aria-label={weather.weatherCode.asString()} />
				</div>
				<div className="today-forecast_temperature">
					<span className="today-forecast_temperature-value">{weather.temperature.asString()}</span>
					<span className="today-forecast_perceived-temperature">Ощущается {weather.apparentTemperature.asString()}</span>
				</div>
			</div>
			<ul className="today-forecast_params">
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Ветер</span>
					<span className="today-forecast-parameter-value">{weather.wind.asString()}</span>
				</li>
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Порывы ветра</span>
					<span className="today-forecast-parameter-value">{weather.windGusts.asString()}</span>
				</li>
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Влажность</span>
					<span className="today-forecast-parameter-value">{weather.humidity.asString()}</span>
				</li>
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Осадки</span>
					<span className="today-forecast-parameter-value">{weather.precipitation.asString()}</span>
				</li>
				<li className="today-forecast_parameter ">
					<span className="today-forecast-parameter-name">Давление</span>
					<span className="today-forecast-parameter-value">{weather.pressure.asString()}</span>
				</li>
			</ul>
		</section>
	);
};

export default TodayForecast;