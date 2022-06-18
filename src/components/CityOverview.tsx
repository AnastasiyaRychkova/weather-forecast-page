import React, { useEffect, useState } from 'react';
import {
	timeSting,
	dateString,
	dayString,
	weekDayString,
} from '../core//util';

interface IProps {
	city: string,
}

const TIME_UPDATE_DELAY = 1000;

const CityOverview = ({
	city,
}: IProps) => {
	const now = new Date();
	const [time, setTime] = useState( timeSting( now ) );
	useEffect(() => {
		const timer = setInterval( () => {
			setTime( timeSting( new Date() ) );
		},
		TIME_UPDATE_DELAY );
		return () => {
			clearTimeout( timer );
		}
	}, [] );

	return (
		<div className="city-overview">
			<h1 className="city">{city}</h1>
			<time
				className="date"
				dateTime={dateString( now )}>
				Сегодня, {weekDayString( now )}, {dayString( now )}
			</time>
			<time
				className="time"
				dateTime={time}>
				{time}
			</time>
		</div>
	);
};




export default CityOverview;