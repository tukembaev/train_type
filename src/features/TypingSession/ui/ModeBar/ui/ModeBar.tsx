import { useAppSelector } from "app/providers/StoreProvider";
import { getText } from "features/TypingSession";
import { FC, memo, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useWindowSize } from "shared/lib/hooks/useWindowSize/useWindowSize";
import { Block, BlockFlex } from "shared/ui/Block/Block";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Modal } from "shared/ui/Modal/Modal";
import cls from "./ModeBar.module.scss";
import TextDuration from "./TextDuration/TextDuration";
import TextFilter from "./TextFilter/TextFilter";
import TextMode from "./TextMode/TextMode";

const ModeBar: FC = () => {
  const isStarted = useAppSelector(getText);
  const [openTextSetting, setOpenTextSetting] = useState(false);

  const { isPC, isTable, isMobile } = useWindowSize();

  return (
    <Block
      flex={BlockFlex.ROW}
      className={classNames(cls.wrapper, { [cls.visible]: isStarted }, [])}
    >
      {isTable || isMobile ? (
        <Button
          theme={ButtonTheme.CLEAR}
          className={cls.text_settings}
          onClick={() => setOpenTextSetting(true)}
        >
          <i className={classNames(cls.icon, {}, ["fa-solid fa-gear"])} />
          text settings
        </Button>
      ) : (
        <>
          <TextFilter />
          <TextMode />
          <TextDuration />{" "}
        </>
      )}
      <Modal
        isOpen={openTextSetting}
        onClose={() => setOpenTextSetting(false)}
        width="50%"
        height="90%"
      >
        <TextFilter />
        <TextMode />
        <TextDuration />
      </Modal>
    </Block>
  );
};

export default memo(ModeBar);
