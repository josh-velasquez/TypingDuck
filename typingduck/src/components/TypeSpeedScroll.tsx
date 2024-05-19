import { Box, Typography } from "@mui/material";
import { StatsInfo } from "./Statistics";
import { useEffect, useRef, useState } from "react";
import { getNumWords } from "../util/TextUtil";

interface TypeSpeedScrollInterface {
  text: string;
  reset: boolean;
  enableKeyboardListener: boolean;
  onFinishedTyping: (stats: StatsInfo) => void;
  onResetComplete: () => void;
  onGetNewText: () => void;
}

const TypeSpeedScroll: React.FC<TypeSpeedScrollInterface> = ({
  text,
  reset,
  enableKeyboardListener,
  onFinishedTyping,
  onResetComplete,
  onGetNewText,
}) => {
  const TIME_LIMIT = 30;
  //   const TIME_LIMIT = 1;
  const SCROLL_RANGE = 25;
  const VIEWED_WORD_SCROLL_LIMIT = 15;
  const [startTime, setStartTime] = useState<number>(0);
  const [timer, setTimer] = useState<number>(TIME_LIMIT);
  const [textTyped, setTextTyped] = useState<string>("");
  const [keystrokes, setKeyStrokes] = useState<string>("");
  const [cursorIndex, setCursorIndex] = useState<number>(0);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [correctedErrorsCounter, setCorrectedErrorsCounter] =
    useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [renderedText, setRenderedText] = useState<string>(text);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [wordCounter, setWordCounter] = useState<string>("");

  const resetType = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTextTyped("");
    setCursorIndex(0);
    setErrorsCount(0);
    setTimer(TIME_LIMIT);
    setStartTime(0);

    // we only try to get a new text if the user refreshes the page manually
    // and the parent component didn't select for a custom text
    if (!reset) {
      onGetNewText();
    }
  };

  const renderTextWithCursor = () => {
    const textBeforeCursor = text.substring(0, cursorIndex);
    const textAfterCursor = renderedText.substring(cursorIndex);
    // TODO: insert characters that user input even when its wrong.. make sure to delete it when they press backspace
    return (
      <Typography
        sx={{
          fontFamily: "Courier New, monospace",
          fontSize: "1.3rem",
          color: "white",
          textAlignLast: "center",
          letterSpacing: "0.2em",
        }}
      >
        {textBeforeCursor.split("").map((char, index) => (
          <span
            key={index}
            style={{ color: textTyped[index] === char ? "#e1b2b2" : "red" }}
          >
            {char}
          </span>
        ))}
        <span style={{ color: "#e1b2b2" }}>|</span>
        {textAfterCursor}
      </Typography>
    );
  };

  useEffect(() => {
    // if we get a new text we update the rendered text
    setRenderedText(text);
  }, [text]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer > 0 && startTime > 0) {
      interval = setInterval(() => {
        setTimer(
          Math.max(TIME_LIMIT - Math.floor((Date.now() - startTime) / 1000), 0)
        );
      }, 1000);
    } else if (timer === 0) {
      onFinishedTyping({
        wordStats: {
          wpm: Math.round(textTyped.length / 5 / 0.5),
          cpm: Math.round((textTyped.length / 0.5) * 60),
          keystrokes: keystrokes.length,
        },
        accuracyStats: {
          accuracy:
            textTyped.length >= 1
              ? Math.round(
                  ((textTyped.length - errorsCount) / textTyped.length) * 100
                )
              : 0,
        },
        errorStats: {
          errors: errorsCount,
          correctedErrors: correctedErrorsCounter,
          errorRate: Math.round((errorsCount / textTyped.length) * 100),
        },
      } as StatsInfo);
      resetType();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, startTime]);

  useEffect(() => {
    // if the parent component resets this component
    if (reset) {
      resetType();
      onResetComplete();
    }
  }, [reset]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "r") {
        e.preventDefault();
        resetType();
        return;
      }

      if (startTime === 0) {
        setStartTime(Date.now());
      }

      if (e.key === "Tab" || (e.key.length !== 1 && e.key !== "Backspace")) {
        e.preventDefault();
        return;
      }

      // scroll the view when we reach the viewed words limit
      if (
        e.key === " " &&
        getNumWords(wordCounter) >= VIEWED_WORD_SCROLL_LIMIT &&
        textContainerRef.current
      ) {
        textContainerRef.current.scrollTop += SCROLL_RANGE;
        setWordCounter("");
      }

      // increment the keys pressed
      setKeyStrokes((prevKeyStrokes) => prevKeyStrokes + e.key);

      // if the user is pressing backspace we remove the last text typed and set the cursor back
      if (e.key === "Backspace" && cursorIndex >= 0) {
        if (cursorIndex === 0) {
          return;
        }

        const lastChar = textTyped.charAt(textTyped.length - 1);
        if (lastChar !== " ") {
          const expectedChar = renderedText[cursorIndex - 1].toLowerCase();
          if (lastChar.toLowerCase() !== expectedChar) {
            setErrorsCount((prevErrors) => prevErrors - 1);
            setCorrectedErrorsCounter((prevErrors) => prevErrors + 1);
          }
        }

        setCursorIndex((prevIndex) => prevIndex - 1);
        setTextTyped((prevText) => prevText.slice(0, -1));
      } else {
        const typedChar = e.key.toLowerCase();
        if (typedChar !== " ") {
          const expectedChar = renderedText[cursorIndex].toLowerCase();
          if (typedChar !== expectedChar) {
            setErrorsCount((prevErrors) => prevErrors + 1);
          }
        }

        setCursorIndex((prevIndex) =>
          prevIndex < renderedText.length ? prevIndex + 1 : prevIndex
        );
        setTextTyped((prevText) => prevText + e.key);
        setWordCounter((prevText) => prevText + e.key);
      }
    };
    if (enableKeyboardListener) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [textTyped, enableKeyboardListener]);

  return (
    <>
      <Box>
        <Typography variant="h5" color={"#e1b2b2"}>
          {timer} s
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "40px",
          textAlign: "center",
          height: "85px",
          transition: "transform 0.5s ease-in-out",
          overflow: "auto",
        }}
        ref={textContainerRef}
      >
        {renderTextWithCursor()}
      </Box>
    </>
  );
};

export default TypeSpeedScroll;
