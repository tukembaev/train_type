import React from "react";
import type { Preview } from "@storybook/react";
import { store } from "./../src/app/providers/StoreProvider";
import { Theme, useImportThemes } from "./../src/app/providers/ThemeProvider";
import "app/styles/index.scss";
import "app/styles/themes/light.scss";
import "app/styles/variables/global.scss";
import { classNames } from "./../src/shared/lib/classNames/classNames";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <BrowserRouter>
          <Provider store={store}>
            <Story />
          </Provider>
        </BrowserRouter>
      );
    },
  ],
};

export const decorators = preview.decorators;

export default preview;
