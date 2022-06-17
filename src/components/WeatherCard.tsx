import React from 'react';
import img from '../img/slight_touch_happyday.svg';

const WeatherCard = () => {
	return (
		<li className="weather-card">
			<div className="weather-card_header">
				<div className="weather-card_img">
					<object data={img} type="image/svg+xml"></object>
				</div>
				<div className="weather-card_day">
					<span className="weather-card_weekday">ВТ</span>
					<span className="weather-card_date">22 мая</span>
				</div>
			</div>
			<div className="weather-card_temperature">
				<span className="weather-card_real_temperature">+14°</span>
				<span className="weather-card_perceived-temperature">
					<span className="weather-card_perceived-temperature-label">Ощущ.</span>
					<span className="weather-card_perceived-temperature-value">+12°</span>
				</span>
			</div>
			<div className="weather-card_params">
				<div className="weather-card_parameter">
					<span className="weather-card_parameter-name">мин.</span>
					<span className="weather-card_parameter-value">14°</span>
				</div>
				<div className="weather-card_parameter">
					<span className="weather-card_parameter-name">макс.</span>
					<span className="weather-card_parameter-value">14°</span>
				</div>
			</div>
		</li>
	);
};

export default WeatherCard;