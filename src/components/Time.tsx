import React, { useState, useEffect } from 'react';
import { timeSting } from '../core';

const TIME_UPDATE_DELAY = 1000;

const Time = () => {
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
		<time
			className="time"
			dateTime={time}>
			{time}
		</time>
	);
};

export default Time;