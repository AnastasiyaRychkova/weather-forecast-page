import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WeatherCard, { ICardProps } from "./WeatherCard";
import WeatherParameters from "../../core/WeatherParameter";
import { WeatherCodeTable, WeatherCodeKeys } from "../../core/WeatherCode";
import type { DailyForecast } from "../../core";


export default {
	title: 'App/Weather Card',
	component: WeatherCard,
	decorators: [
		(Story) => (
			<div>
				<Story />
			</div>
		)
	],
	argTypes: {
		date: {
			control: { type: 'date' }
		},
		temperatureMax: {
			control: { type: 'range', min: -50, max: 50, step: 1 }
		},
		temperatureMin: {
			control: { type: 'range', min: -50, max: 50, step: 1 }
		},
		apparentTemperature: {
			control: { type: 'range', min: -50, max: 50, step: 1 }
		},
		weatherCode: {
			options: Object.keys( WeatherCodeTable ),
			control: { type: 'select' },
		}
	}

} as ComponentMeta<typeof WeatherCard>;



type DailyForecastScheme = {
	date: Date,
	temperatureMax: number,
	temperatureMin: number,
	apparentTemperature: number,
	weatherCode: WeatherCodeKeys,
}

type ComponentType = (props: ICardProps & DailyForecastScheme ) => JSX.Element;

const Template: ComponentStory<ComponentType> = ({
	...args
}) => {
	const createDailyForecast = ( forecast: DailyForecastScheme ) => ({
		time: new Date( forecast.date ),
		apparentTemperature: WeatherParameters.temperature( forecast.apparentTemperature ),
		maxTemperature: WeatherParameters.temperature( forecast.temperatureMax ),
		minTemperature: WeatherParameters.temperature( forecast.temperatureMin ),
		weatherCode: WeatherParameters.weatherCode( forecast.weatherCode ),
	}) as DailyForecast;
	
	return (<WeatherCard weather={createDailyForecast( args )} />);
};


export const Default = Template.bind({});
Default.args = {
	date: new Date(),
	temperatureMax: 26,
	apparentTemperature: 22,
	temperatureMin: 15,
	weatherCode: 1,
}

export const LongMonthName = Template.bind({});
LongMonthName.args = {
	date: new Date( '2001-09-11' ),
	temperatureMax: -1,
	apparentTemperature: 0,
	temperatureMin: -10,
	weatherCode: 53,
}

export const Narrow = Template.bind({});
Narrow.args = {
	date: new Date( '2001-05-01' ),
	temperatureMax: 0,
	apparentTemperature: 0,
	temperatureMin: 0,
	weatherCode: 0,
}