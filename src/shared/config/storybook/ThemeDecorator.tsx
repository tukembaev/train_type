import { StoryFn } from "@storybook/react";
import { Theme, useImportThemes } from "app/providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "widgets/Layout/Layout/Layout.module.scss";

export const ThemeDecorator = (theme: Theme) => (Story: StoryFn) => {
  const importedTheme = useImportThemes();
  return (
    <div className={classNames(cls.wrapper_content, {}, [theme])}>
      <Story />
    </div>
  );
};
