import { Meta, StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import TypingSimulator from "./TypingSimulator";

export default {
  title: "features/TypingSimulator",
  component: TypingSimulator,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof TypingSimulator>;

const Template: StoryFn<typeof TypingSimulator> = (args) => (
  <TypingSimulator {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
