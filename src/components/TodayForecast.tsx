import React, {FC} from 'react';
import img from '../img/partly_cloudy.svg';

interface IProps {
	className?: string,
}

const TodayForecast: FC<IProps> = ({
	
}) => {
	return (
		<section className="today-forecast">
			<div className="today-forecast_main">
				<div className="today-forecast_img">
					<object data={img} type="image/svg+xml" role="img" title="Облачно с прояснениями"></object>
				</div>
				<div className="today-forecast_temperature">
					<span className="today-forecast_temperature-value">14°</span>
					<span className="today-forecast_perceived-temperature">Ощущается +17°</span>
				</div>
			</div>
			<ul className="today-forecast_params">
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Вероятность осадков</span>
					<span className="today-forecast-parameter-value">14%</span>
				</li>
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Влажность</span>
					<span className="today-forecast-parameter-value">38%</span>
				</li>
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Давление</span>
					<span className="today-forecast-parameter-value">767мм</span>
				</li>
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Осадки</span>
					<span className="today-forecast-parameter-value">0 мм</span>
				</li>
				<li className="today-forecast_parameter">
					<span className="today-forecast-parameter-name">Ветер</span>
					<span className="today-forecast-parameter-value">2 м/с, ЮЗ</span>
				</li>
			</ul>
		</section>
	);
};

export default TodayForecast;