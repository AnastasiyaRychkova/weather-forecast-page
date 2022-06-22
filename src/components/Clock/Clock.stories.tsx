import React from "react";
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Clock from "./Clock";

export default {
	title: 'App/Clock',
	component: Clock,

} as ComponentMeta<typeof Clock>;

const Template: ComponentStory<typeof Clock> = () => <Clock />;

export const Default = Template.bind({});