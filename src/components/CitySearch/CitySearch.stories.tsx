import React from "react";
import {ComponentStory, ComponentMeta} from '@storybook/react';

import CitySearch from "./CitySearch";

export default {
	title: 'App/CitySearch',
	component: CitySearch,

} as ComponentMeta<typeof CitySearch>;

const Template: ComponentStory<typeof CitySearch> = () => <CitySearch />;

export const Default = Template.bind({});