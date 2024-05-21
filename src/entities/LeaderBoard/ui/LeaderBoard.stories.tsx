import { StoryFn, Meta } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import LeaderBoard from "./LeaderBoard";
import { ModalDecorator } from "shared/config/storybook/ModalDecorator";

export default {
  title: "entities/LeaderBoard",
  component: LeaderBoard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof LeaderBoard>;

const Template: StoryFn<typeof LeaderBoard> = (args) => (
  <LeaderBoard {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT), ModalDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), ModalDecorator(Theme.DARK)];
