import React from 'react';
import {
	dateString,
	dayString,
	weekDayString,
} from '../core';
import Time from './Time';

interface IProps {
	city: string,
}

const CityOverview = ({
	city,
}: IProps) => {
	const now = new Date();
	
	return (
		<div className="city-overview">
			<h1 className="city">{city}</h1>
			<time
				className="date"
				dateTime={dateString( now )}>
				Сегодня, {weekDayString( now )}, {dayString( now )}
			</time>
			<Time />
		</div>
	);
};




export default CityOverview;