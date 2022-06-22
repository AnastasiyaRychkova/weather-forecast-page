import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TodayForecast, { ITodayForecastProps } from "./TodayForecast";
import WeatherParameters from "../../core/WeatherParameter";
import { WeatherCodeTable, WeatherCodeKeys } from "../../core/WeatherCode";
import type { CurrentWeather } from "../../core";


export default {
	title: 'App/TodayForecast',
	component: TodayForecast,

	argTypes: {
		date: {
			control: { type: 'date' }
		},
		weatherCode: {
			options: Object.keys( WeatherCodeTable ),
			control: { type: 'select' },
		},
		temperature: {
			control: { type: 'range', min: -50, max: 50, step: 1 }
		},
		apparentTemperature: {
			control: { type: 'range', min: -50, max: 50, step: 1 }
		},
		precipitation: {
			control: { type: 'number', min: 0 }
		},
		humidity: {
			control: { type: 'range', min: 0, max: 100, step: 1 }
		},
		pressure: { 
			control: { type: 'range', min: 990, max: 1040, step: 1 }
		},
		windSpeed: {
			control: { type: 'range', min: 0, max: 24, step: 1 }
		},
		windDirection: {
			control: { type: 'range', min: 0, max: 359, step: 1 }
		},
		windGusts: {
			control: { type: 'range', min: 0, max: 24, step: 1 }
		},
	}

} as ComponentMeta<typeof TodayForecast>;


type CurrentWeatherScheme = {
	weatherCode: WeatherCodeKeys,
	temperature: number,
	apparentTemperature: number,
	precipitation: number,
	humidity: number,
	pressure: number,
	windSpeed: number,
	windDirection: number,
	windGusts: number,
}

type ComponentType = (props: ITodayForecastProps & CurrentWeatherScheme ) => JSX.Element;

const Template: ComponentStory<ComponentType> = ({
	...args
}) => {
	const createWeather = ( forecast: CurrentWeatherScheme ) => ({
		time: new Date(),
		weatherCode: WeatherParameters.weatherCode( forecast.weatherCode ),
		temperature: WeatherParameters.temperature( forecast.temperature ),
		apparentTemperature: WeatherParameters.temperature( forecast.apparentTemperature ),
		precipitation: WeatherParameters.precipitation( forecast.precipitation ),
		humidity: WeatherParameters.custom( forecast.humidity, '%' ),
		pressure: WeatherParameters.pressure( forecast.pressure ),
		wind: WeatherParameters.wind( forecast.windSpeed, forecast.windDirection ),
		windGusts: WeatherParameters.wind( forecast.windGusts ),
	}) as CurrentWeather;
	
	return (<TodayForecast weather={createWeather( args )} />);
}


export const Default = Template.bind({});
Default.args = {
	temperature: -24,
	apparentTemperature: -36,
	weatherCode: 71,
	precipitation: 12,
	humidity: 60,
	pressure: 1013,
	windSpeed: 4,
	windDirection: 24,
	windGusts: 14,
}