import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StatisticsInfo } from "./Statistics";
import {
  getNextRow,
  getOneThirdPosition,
  getRenderedText,
  getTwoThirdsPosition,
} from "../util/TextUtil";

interface TypeSpeedBoxInterface {
  text: string;
  reset: boolean;
  onFinishedTyping: (stats: StatisticsInfo) => void;
  onResetComplete: () => void;
}

const TypeSpeedBox: React.FC<TypeSpeedBoxInterface> = ({
  text,
  reset,
  onFinishedTyping,
  onResetComplete,
}) => {
  const TIME_LIMIT = 30;
  const WORD_LIMIT = 27;

  const [startTime, setStartTime] = useState<number>(0);
  const [timer, setTimer] = useState<number>(TIME_LIMIT);

  const [totalTextTyped, setTotalTextTyped] = useState<string>("");
  const [renderedText, setRenderedText] = useState<string>(
    getRenderedText(text, WORD_LIMIT)
  );

  const [textTyped, setTextTyped] = useState<string>("");
  const [cursorIndex, setCursorIndex] = useState<number>(0);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );
  const [textContainerTransform, setTextContainerTransform] =
    useState("translateY(0)");

  const renderTextWithCursor = () => {
    const textBeforeCursor = renderedText.substring(0, cursorIndex);
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

  const resetType = () => {
    setTextTyped("");
    setTotalTextTyped("");
    setCursorIndex(0);
    setErrorsCount(0);
    setTextContainerTransform("translateY(0)");
    setTimer(TIME_LIMIT);
    setStartTime(0);
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  useEffect(() => {
    if (timer > 0 && startTime > 0) {
      const interval = setInterval(() => {
        setTimer(
          Math.max(TIME_LIMIT - Math.floor((Date.now() - startTime) / 1000), 0)
        );
      }, 1000);
      setTimerInterval(interval);
    } else if (timer === 0) {
      onFinishedTyping({
        wpm: Math.round(totalTextTyped.length / 5 / 0.5),
        errors: errorsCount,
        accuracy: Math.round(
          ((totalTextTyped.length - errorsCount) / totalTextTyped.length) * 100
        ),
      } as StatisticsInfo);
      resetType();
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
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
      if (startTime === 0) {
        setStartTime(Date.now());
      }

      if (e.key === "Tab" || (e.key.length !== 1 && e.key !== "Backspace")) {
        e.preventDefault();
        return;
      }

      if (e.key === "Backspace" && cursorIndex >= 0) {
        if (cursorIndex === 0) {
          return;
        }

        const lastChar = textTyped.charAt(textTyped.length - 1);
        if (lastChar !== " ") {
          const expectedChar = renderedText[cursorIndex - 1].toLowerCase();
          if (lastChar.toLowerCase() !== expectedChar) {
            setErrorsCount((prevErrors) => prevErrors - 1);
          }
        }

        setCursorIndex((prevIndex) => prevIndex - 1);
        setTextTyped((prevText) => prevText.slice(0, -1));
      } else {
        // if we are 2/3 of the way then we render the next row
        const twoThirdsPos = getTwoThirdsPosition(renderedText);
        if (cursorIndex >= twoThirdsPos) {
          // if we are then we render the next row
          const oneThirdPos = getOneThirdPosition(renderedText);
          const nextRow = getNextRow(text, renderedText, oneThirdPos);
          setRenderedText(nextRow);
          setTotalTextTyped((prevTotalText) =>
            prevTotalText.slice(oneThirdPos, prevTotalText.length)
          );
          setCursorIndex(oneThirdPos);
          setTextTyped((prevText) =>
            prevText.slice(oneThirdPos, prevText.length)
          );
          return;
        }

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
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [textTyped]);

  return (
    <>
      <Box>
        <Typography variant="h5" color={"#e1b2b2"}>
          {timer} s
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "40px",
          textAlign: "center",
          transition: "transform 0.5s ease-in-out",
          transform: textContainerTransform,
        }}
      >
        {renderTextWithCursor()}
      </Box>
    </>
  );
};

export default TypeSpeedBox;
