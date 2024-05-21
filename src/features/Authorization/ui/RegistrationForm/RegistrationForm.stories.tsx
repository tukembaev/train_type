import { Meta, StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import RegistrationForm from "./RegistrationForm";

export default {
  title: "forms/RegistrationForm",
  component: RegistrationForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof RegistrationForm>;

const Template: StoryFn<typeof RegistrationForm> = (args) => (
  <RegistrationForm {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
