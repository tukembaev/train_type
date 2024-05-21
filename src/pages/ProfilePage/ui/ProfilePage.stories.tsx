import { Meta, StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";

import { ThemeDecorator } from "shared/config/storybook/ThemeDecorator";
import ProfilePage from "./ProfilePage";

export default {
  title: "forms/ProfilePage",
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta<typeof ProfilePage>;

const Template: StoryFn<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
