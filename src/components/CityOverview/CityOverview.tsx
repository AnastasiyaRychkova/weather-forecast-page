import React from 'react';
import {
	dateString,
	dayString,
	weekDayString,
} from '../../core';
import Clock from '../Clock';

interface ICityOverviewProps {
	city: string,
}

const CityOverview = ({
	city,
}: ICityOverviewProps) => {
	const now = new Date();
	
	return (
		<div className="city-overview">
			<h1 className="city">{city}</h1>
			<time
				className="date"
				dateTime={dateString( now )}>
				Сегодня, {weekDayString( now )}, {dayString( now )}
			</time>
			<Clock />
		</div>
	);
};




export default CityOverview;