import { Box, Typography } from "@mui/material";
import { StatsInfo } from "./Statistics";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
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
  // const TIME_LIMIT = 1;

  const [startTime, setStartTime] = useState<number>(0);
  const [timer, setTimer] = useState<number>(TIME_LIMIT);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const [renderedText, setRenderedText] = useState<string>(text);
  const [textTyped, setTextTyped] = useState<string>("");

  const [cursorIndex, setCursorIndex] = useState<number>(0);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [correctedErrorsCounter, setCorrectedErrorsCounter] =
    useState<number>(0);
  
  // Real-time statistics
  const [currentWPM, setCurrentWPM] = useState<number>(0);
  const [currentAccuracy, setCurrentAccuracy] = useState<number>(0);
  

  const textContainerRef = useRef<HTMLDivElement>(null);
  const keystrokesRef = useRef<string>("");
  const cursorRef = useRef<HTMLSpanElement>(null);

  const calculateRealTimeStats = useCallback(() => {
    if (startTime === 0 || textTyped.length === 0) {
      setCurrentWPM(0);
      setCurrentAccuracy(0);
      return;
    }

    const timeElapsed = (Date.now() - startTime) / 1000; // in seconds
    const averageWordLength = 5;
    const wpm = Math.round((textTyped.length / averageWordLength) / (timeElapsed / 60));
    const accuracy = textTyped.length > 0 ? Math.round(((textTyped.length - errorsCount) / textTyped.length) * 100) : 0;
    
    setCurrentWPM(wpm);
    setCurrentAccuracy(accuracy);
  }, [startTime, textTyped.length, errorsCount]);

  const resetType = useCallback(() => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setTextTyped("");
    setCursorIndex(0);
    setErrorsCount(0);
    setTimer(TIME_LIMIT);
    setStartTime(0);
    setCurrentWPM(0);
    setCurrentAccuracy(0);
    keystrokesRef.current = "";

    // we only try to get a new text if the user refreshes the page manually
    // and the parent component didn't select for a custom text
    if (!reset) {
      onGetNewText();
    }
  }, [onGetNewText, reset]);


  const renderTextWithCursor = useMemo(() => {
    const textBeforeCursor = renderedText.substring(0, cursorIndex);
    const textAfterCursor = renderedText.substring(cursorIndex);
    
    return (
      <Typography
        sx={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.3rem",
          color: "var(--neutral-100)",
          textAlignLast: "center",
          letterSpacing: "0.2em",
        }}
      >
        {textBeforeCursor.split("").map((char, index) => {
          const typedChar = textTyped[index];
          const isCorrect = typedChar && typedChar.toLowerCase() === char.toLowerCase();
          return (
            <span
              key={index}
              style={{ 
                color: isCorrect ? "var(--accent-tertiary)" : "var(--accent-danger)",
                fontWeight: 500
              }}
            >
              {char}
            </span>
          );
        })}
        <span ref={cursorRef} style={{ color: "var(--accent-primary)" }}>
          |
        </span>
        {textAfterCursor}
      </Typography>
    );
  }, [renderedText, cursorIndex, textTyped]);

  const finishTyping = () => {
    const averageWordLength = 5;
    const oneMinuteToSeconds = 60;
    const timeElapsed = TIME_LIMIT - timer;
    const wpm = Math.round(
      textTyped.length / averageWordLength / (timeElapsed / oneMinuteToSeconds)
    );
    const cpm = Math.round(
      (textTyped.length / timeElapsed) * oneMinuteToSeconds
    );
    let accuracy = 0;
    let errorRate = 0;
    if (textTyped.length >= 1) {
      accuracy = Math.round(
        ((textTyped.length - errorsCount) / textTyped.length) * 100
      );
      errorRate = Math.round((errorsCount / textTyped.length) * 100);
    }
    onFinishedTyping({
      wordStats: {
        wpm,
        cpm,
        keystrokes: keystrokesRef.current.length,
        totalWordsTyped: getNumWords(textTyped),
      },
      accuracyStats: {
        accuracy,
        time: TIME_LIMIT - timer,
      },
      errorStats: {
        errors: errorsCount,
        correctedErrors: correctedErrorsCounter,
        errorRate,
      },
    } as StatsInfo);
  };

  useEffect(() => {
    // if we get a new text we update the rendered text
    setRenderedText(text);
  }, [text]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timer === 0) {
      finishTyping();
      resetType();
    } else if (startTime > 0 && textTyped.length > 0) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const newTimer = Math.max(TIME_LIMIT - elapsed, 0);
        setTimer(newTimer);
        calculateRealTimeStats();
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, startTime, textTyped.length, calculateRealTimeStats, finishTyping, resetType]);

  useEffect(() => {
    // if the parent component resets this component
    if (reset) {
      resetType();
      onResetComplete();
    }
  }, [reset, resetType, onResetComplete]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Keyboard shortcuts
      if (e.metaKey && e.key === "r") {
        e.preventDefault();
        resetType();
        return;
      }
      

      if (e.key === "Tab" || (e.key.length !== 1 && e.key !== "Backspace")) {
        e.preventDefault();
        return;
      }

      // Only start timer when user actually types a valid character
      if (startTime === 0 && e.key !== "Backspace") {
        setStartTime(Date.now());
      }

      // if we've reached the end of the generated text
      if (textTyped.length >= renderedText.length - 1) {
        finishTyping();
        return;
      }

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
        // increment the keys pressed
        keystrokesRef.current += e.key;
      }

      // TODO: refine this scrolling
      const SCROLL_RANGE = 31;
      const SCROLL_OFFSET = 12;
      // Check if the cursor is outside the visible area and scroll if necessary
      if (cursorRef.current && textContainerRef.current) {
        const cursorRect = cursorRef.current.getBoundingClientRect();
        const containerRect = textContainerRef.current.getBoundingClientRect();
        if (cursorRect.bottom > containerRect.bottom - SCROLL_OFFSET) {
          textContainerRef.current.scrollTop += SCROLL_RANGE;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      text,
      cursorIndex,
      startTime,
      finishTyping,
      textTyped.length,
      timer,
      resetType,
    ]
  );

  useEffect(() => {
    if (enableKeyboardListener) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [enableKeyboardListener, handleKeyDown]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography 
            variant="h5" 
            sx={{ 
              color: "var(--accent-primary)",
              fontWeight: 500,
              textAlign: "center"
            }}
          >
            {timer} s
          </Typography>
        </Box>
        
        {/* Real-time Statistics */}
        <Box sx={{ display: "flex", gap: 3 }} role="region" aria-label="Real-time typing statistics">
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.875rem" }}>
              WPM
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ color: "var(--accent-tertiary)", fontWeight: 600 }}
              aria-label={`Words per minute: ${currentWPM}`}
            >
              {currentWPM}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.875rem" }}>
              Accuracy
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ color: "var(--accent-secondary)", fontWeight: 600 }}
              aria-label={`Typing accuracy: ${currentAccuracy} percent`}
            >
              {currentAccuracy}%
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* Keyboard Shortcuts */}
      <Box sx={{ textAlign: "center", marginTop: 2, marginBottom: 2 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: "var(--neutral-600)", 
            fontSize: "0.7rem",
            display: "block"
          }}
        >
          Cmd+R: Reset
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          textAlign: "center",
          height: "95px",
          maxWidth: "1400px",
          transition: "transform 0.5s ease-in-out",
          overflow: "auto",
          scrollbarWidth: "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Opera
          },
        }}
        ref={textContainerRef}
        role="textbox"
        aria-label="Typing test text"
        aria-live="polite"
        aria-atomic="false"
        tabIndex={0}
      >
        {renderTextWithCursor}
      </Box>
    </>
  );
};

export default memo(TypeSpeedScroll);
