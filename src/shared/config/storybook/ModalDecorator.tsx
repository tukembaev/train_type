import { StoryFn } from "@storybook/react";
import { Theme } from "app/providers/ThemeProvider";
import { Modal } from "shared/ui/Modal/Modal";

export const ModalDecorator = (theme: Theme) => (Story: StoryFn) => {
  return (
    <Modal isOpen={true} width="90%" storyTheme={theme}>
      <Story />
    </Modal>
  );
};
