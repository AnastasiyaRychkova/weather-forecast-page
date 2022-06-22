import React from "react";
import {ComponentStory, ComponentMeta} from '@storybook/react';

import WeatherMap from "./WeatherMap";

export default {
	title: 'App/Clock',
	component: WeatherMap,

} as ComponentMeta<typeof WeatherMap>;

const Template: ComponentStory<typeof WeatherMap> = () => <WeatherMap />;

export const Default = Template.bind({});