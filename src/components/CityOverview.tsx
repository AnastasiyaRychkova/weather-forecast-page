import React, {FC} from 'react';

interface IProps {
	city: string,
	className?: string,
}

const CityOverview: FC<IProps> = ({
	city,
}) => {
	return (
		<div className="city-overview">
			<h1 className="city">{city}</h1>
			<time
				className="date"
				dateTime="2022-05-24">
				Сегодня, понедельник, 24 мая
			</time>
			<time
				className="time"
				dateTime="12:32">
				12:32
			</time>
		</div>
	);
};

export default CityOverview;