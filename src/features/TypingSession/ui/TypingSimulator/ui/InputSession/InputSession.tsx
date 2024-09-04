import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import { useAppSelector } from "app/providers/StoreProvider";
import {
  deleteUncorrectLetter,
  getDuration,
  getErrors,
  getMode,
  getText,
  setErrorsCount,
  setTextSession,
} from "features/TypingSession";
import { sessionData } from "features/TypingSession/model/types/modsSchema";

import { setGraphData, setSessionInfo } from "entities/Session";
import { useNavigate } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import {
  calculateRAW,
  calculateWPM,
} from "shared/lib/functions/statisticFunctions";
import { useStopWatch } from "shared/lib/hooks/useStopWatch/useStopWatch";
import cls from "./InputSession.module.scss";
import { countWordsPerLine } from "./functions/countWordsPerLine";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";

interface InputSessionProps {
  data: sessionData;
  isNoAction: boolean;
}

const InputSession: FC<InputSessionProps> = ({ data, isNoAction }) => {
  const { textOfSession } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentMode = useAppSelector(getMode);
  const currentDuration = useAppSelector(getDuration);

  const [lettersCount, setLettersCount] = useState(0);

  const [bottomOffset, setBottomOffset] = useState(0);
  const [rowsCount, setRowsCount] = useState(0);
  const [wordsCounter, setWordsCounter] = useState(0);

  const [isError, setIsError] = useState(false);
  const errorsCount = useAppSelector(getErrors);

  const text: string = useAppSelector(getText);
  const [textArray, setTextArray] = useState<string[]>([]);
  const textArrayLength = textArray.length;
  const [isStarted, setIsStarted] = useState(false);

  function countWords(text: string): number {
    const words = text.trim().split(/\s+/);
    return words.length;
  }

  function endSession(timeS: number, wordsCount: number, lettersCount: number) {
    setIsStarted(false);
    dispatch(
      setSessionInfo({
        time_s: timeS,
        words_count: wordsCount,
        letters_count: lettersCount,
      })
    );
    navigate("/session_stat");
  }

  const { elapsedSeconds, resetStopwatch } = useStopWatch(isStarted);

  const charWidth = 14.41;
  const wordsPerLine = countWordsPerLine(
    textOfSession?.join("") === " " ? undefined : textOfSession?.join(""),
    charWidth
  );

  const handleInputChange = useCallback(
    (e: { currentTarget: { value: any }; preventDefault: () => void }) => {
      const inputText = e.currentTarget.value;
      if (isError) {
        e.preventDefault();
        return;
      }
      dispatch(setTextSession(inputText));
      // clickSounds.play()
      setLettersCount(inputText.length);
      setIsStarted(true);
      const wordCount = countWords(inputText);
      setWordsCounter(wordCount);
    },
    [isError]
  );
  const handleInputKeyDown = useCallback(
    (e: { key: string; shiftKey: boolean; preventDefault: () => void }) => {
      if (e.shiftKey && e.key === "Enter") {
        endSession(+elapsedSeconds, wordsCounter, lettersCount - errorsCount);
        e.preventDefault();
      } else if (
        currentMode !== "zen" &&
        isError &&
        (e.key === "Backspace" || e.key === "Delete")
      ) {
        dispatch(setErrorsCount(errorsCount + 1));
        dispatch(deleteUncorrectLetter());
      } else if (
        currentMode !== "zen" &&
        !isError &&
        (e.key === "Backspace" || e.key === "Delete")
      ) {
        e.preventDefault();
      }
    },
    [
      dispatch,
      isError,
      errorsCount,
      currentMode,
      elapsedSeconds,
      wordsCounter,
      lettersCount,
    ]
  );

  useEffect(() => {
    setTextArray(Array.from(text));

    if (
      textArrayLength &&
      textArray[textArrayLength - 1] !== textOfSession?.[textArrayLength - 1] &&
      currentMode !== "zen"
    ) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [text, textArrayLength]);

  const overlayLetters = useMemo(
    () =>
      textOfSession?.map((char, index) => {
        const isWrongSpace = char === " ";

        const charColor =
          textArray[index] === undefined
            ? "var(--secondary-color)"
            : textArray[index] === textOfSession[index]
              ? "var(--third-color)"
              : "var(--error-color)";

        const spanStyle = {
          color: charColor,
          backgroundColor:
            isWrongSpace && charColor === "var(--error-color)"
              ? "var(--error-color)"
              : !isWrongSpace && charColor === "var(--error-color)"
                ? "transparent"
                : "transparent",
          fontSize: "1.5rem",
        };

        return (
          <span
            style={spanStyle}
            className={classNames(cls.overlay_letter, {}, [
              index === textArray.length - 1
                ? cls.custom_caret
                : index === 0 && textArray.length === 0
                  ? cls.custom_caret_left
                  : "",
            ])}
          >
            {textArray[index] || char}
          </span>
        );
      }),
    [textOfSession, textArray]
  );

  useEffect(() => {
    if (
      (currentMode === "quote" || currentMode === "words") &&
      textArray.join(" ") === textOfSession?.join(" ")
    ) {
      endSession(+elapsedSeconds, wordsCounter, lettersCount - errorsCount);
      setBottomOffset(0);
      setRowsCount(0);
    }
    if (currentMode === "time" && currentDuration === elapsedSeconds) {
      endSession(+elapsedSeconds, wordsCounter, lettersCount - errorsCount);
      setBottomOffset(0);
      setRowsCount(0);
    }
    if (text.length === 0) {
      setIsStarted(false);
      setLettersCount(0);
      resetStopwatch();
      setRowsCount(0);
      setBottomOffset(0);
    }
    if (isNoAction) {
      setIsStarted(false);
      const inputElement = document.getElementById(
        "typing-input"
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [
    text,
    textArray,
    textOfSession,
    isNoAction,
    resetStopwatch,
    navigate,
    dispatch,
    elapsedSeconds,
    currentMode,
  ]);

  const previousSecondsRef = useRef(0);

  useEffect(() => {
    const calculatedWPM = calculateWPM(
      lettersCount - errorsCount,
      elapsedSeconds
    );
    const calculatedRAW = calculateRAW(
      lettersCount,
      elapsedSeconds,
      errorsCount
    );
    if (elapsedSeconds > previousSecondsRef.current) {
      dispatch(
        setGraphData({
          name: elapsedSeconds.toString(),
          wpm: +calculatedWPM.toFixed(0),
          raw: +calculatedRAW.toFixed(0),
        })
      );
      previousSecondsRef.current = elapsedSeconds;
    }
  }, [elapsedSeconds]);

  useEffect(() => {
    if (wordsCounter === wordsPerLine[rowsCount] + 2) {
      setBottomOffset((prevOffset) => prevOffset + 32);
      setRowsCount((prevOffset) => prevOffset + 1);
    }
  }, [wordsCounter]);

  // function getRandomNumber() {
  //     return Math.floor(Math.random() * 1000)
  // }

  // for (let i = 0; i < textOfSession?.length; i += 1) {
  //     if (textOfSession[i] === ' ') {
  //         textOfSession.splice(i, 0, getRandomNumber().toString(), ' ')
  //     }
  // }

  // // Ищем индекс пробела и вставляем два элемента: случайное число и пробел

  // console.log(textOfSession)

  return (
    <>
      <h3
        className={classNames(
          cls.words_counter,
          { [cls.visible]: !isStarted },
          []
        )}
      >
        {currentMode === "words"
          ? `${text ? text.split(" ").length : 0}/${textOfSession
              ?.toString()
              .split(" ").length}`
          : currentMode === "time"
            ? currentDuration
              ? +currentDuration - elapsedSeconds
              : wordsCounter
            : ""}
      </h3>
      <div className={cls.wrapper}>
        <div
          className={cls.caretWrapper}
          style={{
            position: "relative",
            bottom: currentMode !== "zen" ? `${bottomOffset}px` : "0",
          }}
        >
          <div className={cls.textOverlay}>
            {currentMode === "zen" ? (
              <textarea
                autoFocus
                autoComplete="off"
                value={text}
                id="typing-input"
                onKeyDown={handleInputKeyDown}
                onChange={handleInputChange}
                className={cls.zen_input}
              />
            ) : (
              <>
                <input
                  type="text"
                  value={text}
                  id="typing-input"
                  readOnly={
                    isError || textOfSession?.length === textArray.length
                  }
                  onKeyDown={handleInputKeyDown}
                  onChange={handleInputChange}
                  className={cls.typing_input}
                  autoFocus
                  autoComplete="off"
                />
                {overlayLetters}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(InputSession);
