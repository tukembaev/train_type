import { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useAppSelector } from "app/providers/StoreProvider";
import { clearGraphData } from "entities/Session";

import { useDispatch } from "react-redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { classNames } from "shared/lib/classNames/classNames";
import { useTimer } from "shared/lib/hooks/useTimer/useTimer";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import {
  getDuration,
  getFilter,
  getLanguage,
  getMode,
  getReload,
  getText,
  setErrorsCount,
  setTextSession,
  useGetQuoteTextQuery,
  useGetWordsTextQuery,
} from "features/TypingSession";

import {
  FilterTextType,
  sessionData,
} from "features/TypingSession/model/types/modsSchema";
import { generateRandomNumber } from "shared/lib/functions/typingFunctions/generateRandomNumber";
import cls from "./TypingSimulator.module.scss";
import InputSession from "./ui/InputSession/InputSession";

const TypingSimulator: FC = () => {
  const currentMode = useAppSelector(getMode);
  const currentDuration = useAppSelector(getDuration);
  const currentFilter = useAppSelector(getFilter);
  const letterInsert = useAppSelector(getText);
  const isReloaded = useAppSelector(getReload);
  const currentLanguage = useAppSelector(getLanguage);

  const dispatch = useDispatch();

  const noActionFromUser = 5;

  const { isFinish, resetTimer } = useTimer(noActionFromUser);

  const queryHook =
    currentMode === "words" || currentMode === "time"
      ? useGetWordsTextQuery
      : useGetQuoteTextQuery;

  const queryDuration =
    (currentMode === "words" || currentMode === "quote") &&
    currentDuration?.toString();

  const { data: sessionText, refetch } = queryHook([
    currentLanguage,
    queryDuration || "100",
  ]);

  const handleReload = useCallback(() => {
    if (letterInsert) {
      refetch();
      dispatch(setTextSession(""));
      dispatch(clearGraphData());
      dispatch(setErrorsCount(0));
    }
    resetTimer();
  }, [refetch, resetTimer, dispatch, letterInsert]);

  let filtredSessionText = sessionText;

  if (
    currentFilter?.includes(FilterTextType.PUNCTUATION) === false &&
    currentMode !== "quote"
  ) {
    filtredSessionText = filtredSessionText
      ?.toLocaleLowerCase()
      .split("")
      .filter((char) => {
        return !".,/#!?$%^&*;:{}=_`~()-".includes(char);
      })
      .join("");
  }

  if (
    !currentFilter?.includes(FilterTextType.NUMBERS) === false &&
    currentMode !== "quote"
  ) {
    const wordsArray = filtredSessionText?.split(" ") || [];
    const wordsCount = wordsArray.length;
    const wordsToReplaceCount = Math.ceil(wordsCount / 3);
    const randomIndexes: number[] = [];
    while (randomIndexes.length < wordsToReplaceCount) {
      const randomIndex = Math.floor(Math.random() * wordsCount);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    randomIndexes.forEach((index) => {
      const randomNumberLength = Math.floor(Math.random() * 900) + 100;
      wordsArray[index] = generateRandomNumber(randomNumberLength)?.toFixed(0);
    });

    filtredSessionText = wordsArray.join(" ");
    console.log(filtredSessionText);
  }

  const text = useMemo<string[]>(
    () => Array.from(filtredSessionText || " "),
    [sessionText, currentFilter]
  );
  debugger;
  const sessionData: sessionData = {
    mode: currentMode,
    duration: currentDuration,
    filters: currentFilter,
    textOfSession: text,
  };

  useEffect(() => {
    resetTimer();
  }, [letterInsert, currentMode]);
  useEffect(() => {
    handleReload();
  }, [isReloaded]);

  return (
    <div className={classNames(cls.wrapper, {}, [])}>
      <div className={isFinish ? cls.noActionFromUser : undefined}>
        <div>
          <SwitchTransition>
            <CSSTransition
              key={currentMode}
              timeout={200}
              classNames={{
                enter: cls.inputSessionEnter,
                enterActive: cls.inputSessionEnterActive,
                exit: cls.inputSessionExit,
                exitActive: cls.inputSessionExitActive,
              }}
            >
              <InputSession
                key={currentMode}
                data={sessionData}
                isNoAction={isFinish}
              />
            </CSSTransition>
          </SwitchTransition>
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.btn_reload}
            onClick={() => {
              handleReload();
              refetch();
            }}
          >
            <i
              className={classNames(cls.retry_icon, {}, [
                "fa-solid fa-rotate-right",
              ])}
            />
          </Button>
        </div>
      </div>
      {isFinish ? (
        <div>
          <p className={cls.return} onClick={resetTimer}>
            Click to return or{" "}
            {text[letterInsert.length] === " " ? "press " : "type letter "}
            <span className={cls.return_letter}>
              {text[letterInsert.length] === " "
                ? "space"
                : text[letterInsert.length]}
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default memo(TypingSimulator);
