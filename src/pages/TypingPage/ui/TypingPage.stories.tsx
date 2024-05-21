import { Meta, StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import TypingPage from "./TypingPage";

export default {
  title: "pages/TypingPage",
  component: TypingPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof TypingPage>;

const Template: StoryFn<typeof TypingPage> = (args) => <TypingPage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
