import React from "react";
import {ComponentStory, ComponentMeta} from '@storybook/react';

import WeeklyForecast, { IWeeklyForecastProps } from "./WeeklyForecast";
import WeatherParameters from "../../core/WeatherParameter";
import { WeatherCodeTable, WeatherCodeKeys } from "../../core/WeatherCode";
import * as WeatherCardStories from "../WeatherCard/WeatherCard.stories";
import type { DailyForecast } from "../../core";

export default {
	title: 'App/WeeklyForecast',
	component: WeeklyForecast,

	decorators: [
		(Story) => (
			<div style={{fontSize: '10px'}}>
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
		},
	}

} as ComponentMeta<typeof WeeklyForecast>;


type DailyForecastScheme = {
	date: Date,
	temperatureMax: number,
	temperatureMin: number,
	apparentTemperature: number,
	weatherCode: WeatherCodeKeys,
}


type ComponentType = (props: IWeeklyForecastProps & DailyForecastScheme ) => JSX.Element;

const Template: ComponentStory<ComponentType> = ({
	city,
	...args
}) => {
	const createDailyForecast = ( forecast: DailyForecastScheme ) => {
		const card: DailyForecast = {
			time: new Date( forecast.date ),
			apparentTemperature: WeatherParameters.temperature( forecast.apparentTemperature ),
			maxTemperature: WeatherParameters.temperature( forecast.temperatureMax ),
			minTemperature: WeatherParameters.temperature( forecast.temperatureMin ),
			weatherCode: WeatherParameters.weatherCode( forecast.weatherCode ),
		};
		return [card, card, card, card];
	};
	
	return (
		<WeeklyForecast
			forecast={createDailyForecast( args )}
			city={city}
			/>);
};




export const Default = Template.bind({});
Default.args = {
	city: 'Санкт-Петербург',
	...WeatherCardStories.Default.args,
}

export const LongMonthName = Template.bind({});
LongMonthName.args = {
	city: 'Ростов-на-Дону',
	...WeatherCardStories.LongMonthName.args,
}

export const Narrow = Template.bind({});
Narrow.args = {
	city: 'Керчь',
	...WeatherCardStories.Narrow.args,
}