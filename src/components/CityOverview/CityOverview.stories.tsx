import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CityOverview from "./CityOverview";

export default {
	title: 'App/City Overview',
	component: CityOverview,

} as ComponentMeta<typeof CityOverview>;


const Template: ComponentStory<typeof CityOverview> = (args) => <CityOverview {...args} />

export const Default = Template.bind({});
Default.args = {
	city: 'Санкт-Петербург'
};