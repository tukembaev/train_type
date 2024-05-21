import { Meta, StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import LoginPage from "./LoginPage";

export default {
  title: "pages/LoginPage",
  component: LoginPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof LoginPage>;

const Template: StoryFn<typeof LoginPage> = (args) => <LoginPage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
