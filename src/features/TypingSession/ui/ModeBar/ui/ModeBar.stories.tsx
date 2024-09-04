import { Meta, StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import ModeBar from "./ModeBar";

export default {
  title: "features/ModeBar",
  component: ModeBar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof ModeBar>;

const Template: StoryFn<typeof ModeBar> = (args) => <ModeBar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
