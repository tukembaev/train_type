import { Meta, StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import AboutPage from "./AboutPage";

export default {
  title: "pages/AboutPage",
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof AboutPage>;

const Template: StoryFn<typeof AboutPage> = (args) => <AboutPage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
