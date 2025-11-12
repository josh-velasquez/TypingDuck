import { Box, Typography } from "@mui/material";
import { StatsInfo } from "./Statistics";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
import { getNumWords } from "../util/TextUtil";

interface TypingSpeedTestInterface {
  text: string;
  reset: boolean;
  enableKeyboardListener: boolean;
  onFinishedTyping: (stats: StatsInfo) => void;
  onResetComplete: () => void;
  onGetNewText: () => void;
}

const TIME_LIMIT = 30;
const CHARS_PER_LINE = 67;
const TOTAL_LINES = 3;
const TOTAL_CHARS = CHARS_PER_LINE * TOTAL_LINES;
const AVERAGE_WORD_LENGTH = 5;
const SECONDS_PER_MINUTE = 60;
const TIMER_UPDATE_INTERVAL = 100;
const SCROLL_MARGIN = 100;

const findWordStart = (text: string, position: number): number => {
  for (let i = position - 1; i >= 0; i--) {
    if (text[i] === " ") {
      return i + 1;
    }
  }
  return 0;
};

const findWordBoundary = (text: string, targetIndex: number, maxIndex: number): number => {
  if (targetIndex >= maxIndex || text[targetIndex] === " ") {
    return targetIndex;
  }
  
  const wordStart = findWordStart(text, targetIndex);
  
  if (wordStart < targetIndex && wordStart > 0) {
    return wordStart;
  }
  
  if (wordStart === targetIndex && targetIndex > 0) {
    const prevSpace = findWordStart(text, targetIndex);
    return prevSpace > 0 ? prevSpace : targetIndex;
  }
  
  for (let i = targetIndex; i < maxIndex; i++) {
    if (text[i] === " ") {
      return i + 1;
    }
  }
  
  return maxIndex;
};

const calculateLineBreak = (text: string, targetPosition: number): number => {
  const position = Math.min(text.length, targetPosition);
  
  if (position >= text.length || text[position] === " ") {
    return position;
  }
  
  const wordStart = findWordStart(text, position);
  
  if (wordStart < position) {
    return wordStart;
  }
  
  if (wordStart === position && position > 0) {
    const prevSpace = findWordStart(text, position);
    return prevSpace > 0 ? prevSpace : position;
  }
  
  return position;
};

const TypingSpeedTest: React.FC<TypingSpeedTestInterface> = ({
  text,
  reset,
  enableKeyboardListener,
  onFinishedTyping,
  onResetComplete,
  onGetNewText,
}) => {
  const [startTime, setStartTime] = useState<number>(0);
  const [timer, setTimer] = useState<number>(TIME_LIMIT);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [renderedText, setRenderedText] = useState<string>(text);
  const [textTyped, setTextTyped] = useState<string>("");
  const [cursorIndex, setCursorIndex] = useState<number>(0);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [correctedErrorsCounter, setCorrectedErrorsCounter] = useState<number>(0);
  const [currentWPM, setCurrentWPM] = useState<number>(0);
  const [currentAccuracy, setCurrentAccuracy] = useState<number>(0);
  const [visibleTextStart, setVisibleTextStart] = useState<number>(0);
  const [visibleTextEnd, setVisibleTextEnd] = useState<number>(0);
  const [cursorPosition, setCursorPosition] = useState<{ left: number; top: number } | null>(null);

  const textContainerRef = useRef<HTMLDivElement>(null);
  const keystrokesRef = useRef<string>("");
  const cursorRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<Map<number, HTMLSpanElement>>(new Map());

  const calculateRealTimeStats = useCallback(() => {
    if (startTime === 0 || textTyped.length === 0) {
      setCurrentWPM(0);
      setCurrentAccuracy(0);
      return;
    }

    const timeElapsed = (Date.now() - startTime) / 1000;
    const wpm = Math.round((textTyped.length / AVERAGE_WORD_LENGTH) / (timeElapsed / SECONDS_PER_MINUTE));
    const accuracy = Math.round(((textTyped.length - errorsCount) / textTyped.length) * 100);
    
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
    setVisibleTextStart(0);
    setVisibleTextEnd(0);
    setCursorPosition(null);
    keystrokesRef.current = "";

    if (!reset) {
      onGetNewText();
    }
  }, [onGetNewText, reset]);

  useEffect(() => {
    if (visibleTextEnd === 0) {
      let endIndex = Math.min(renderedText.length, TOTAL_CHARS);
      if (endIndex < renderedText.length && renderedText[endIndex] !== " ") {
        endIndex = calculateLineBreak(renderedText, endIndex);
      }
      setVisibleTextEnd(endIndex);
    } else {
      const visibleText = renderedText.substring(visibleTextStart, visibleTextEnd);
      const line1End = calculateLineBreak(visibleText, CHARS_PER_LINE);
      const line2End = calculateLineBreak(visibleText, CHARS_PER_LINE * 2);
      
      const cursorInVisibleText = cursorIndex - visibleTextStart;
      if (cursorInVisibleText >= line2End && visibleTextEnd < renderedText.length) {
        const newStart = visibleTextStart + line1End;
        let newEnd = Math.min(renderedText.length, newStart + TOTAL_CHARS);
        if (newEnd < renderedText.length && renderedText[newEnd] !== " ") {
          newEnd = findWordBoundary(renderedText, newEnd, renderedText.length);
        }
        setVisibleTextStart(newStart);
        setVisibleTextEnd(newEnd);
      }
    }
  }, [renderedText, cursorIndex, visibleTextStart, visibleTextEnd]);

  const renderTextWithCursor = useMemo(() => {
    const maxEnd = visibleTextStart + TOTAL_CHARS;
    const end = visibleTextEnd > 0 ? visibleTextEnd : Math.min(renderedText.length, maxEnd);
    const visibleText = renderedText.substring(visibleTextStart, end);
    const chars = visibleText.split("");
    
    const line1Break = calculateLineBreak(visibleText, CHARS_PER_LINE);
    const line2Break = calculateLineBreak(visibleText, CHARS_PER_LINE * 2);
    
    return (
      <Typography
        component="div"
        sx={{
          fontFamily: "var(--font-mono)",
          fontSize: "1.3rem",
          color: "var(--neutral-100)",
          textAlign: "center",
          letterSpacing: "0.1em",
          lineHeight: "1.8",
          transition: "all 0.2s ease",
          position: "relative",
          wordBreak: "keep-all",
          overflowWrap: "normal",
          whiteSpace: "pre-wrap",
        }}
      >
        {cursorPosition && (
          <span 
            ref={cursorRef}
            className="typing-cursor"
            style={{ 
              position: "absolute",
              left: `${cursorPosition.left}px`,
              top: `${cursorPosition.top}px`,
              color: "var(--accent-primary)",
              fontWeight: "bold",
              pointerEvents: "none",
              zIndex: 10,
              lineHeight: "0em",
              fontSize: "1.1em",
              transition: "left 0.15s cubic-bezier(0.4, 0, 0.2, 1), top 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform",
              marginLeft: "-18px",
            }}
          >
            |
          </span>
        )}
        {chars.map((char, localIndex) => {
          const globalIndex = visibleTextStart + localIndex;
          const typedChar = textTyped[globalIndex];
          const isTyped = globalIndex < textTyped.length;
          const isCorrect = typedChar && typedChar.toLowerCase() === char.toLowerCase();
          
          let charColor = "var(--neutral-100)";
          let charStyle: React.CSSProperties = { 
            transition: "color 0.15s ease, background-color 0.15s ease",
            borderRadius: "2px",
            position: "relative",
            display: "inline-block",
          };
          
          if (isTyped) {
            if (isCorrect) {
              charColor = "var(--accent-primary)";
            } else {
              charColor = "var(--accent-danger)";
            }
          } else {
            charColor = "var(--neutral-100)";
          }
          
          const shouldBreakLine = localIndex === line1Break || localIndex === line2Break;
          
          return (
            <span key={globalIndex}>
              {shouldBreakLine && <br />}
              <span 
                ref={(el) => {
                  if (el) {
                    charRefs.current.set(globalIndex, el);
                  }
                }}
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <span style={{ ...charStyle, color: charColor }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            </span>
          );
        })}
      </Typography>
    );
  }, [renderedText, cursorIndex, textTyped, visibleTextStart, visibleTextEnd, cursorPosition]);

  const finishTyping = useCallback(() => {
    const timeElapsed = TIME_LIMIT - timer;
    const wpm = Math.round(
      textTyped.length / AVERAGE_WORD_LENGTH / (timeElapsed / SECONDS_PER_MINUTE)
    );
    const cpm = Math.round((textTyped.length / timeElapsed) * SECONDS_PER_MINUTE);
    const accuracy = textTyped.length > 0 
      ? Math.round(((textTyped.length - errorsCount) / textTyped.length) * 100)
      : 0;
    const errorRate = textTyped.length > 0
      ? Math.round((errorsCount / textTyped.length) * 100)
      : 0;

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
  }, [textTyped, timer, errorsCount, correctedErrorsCounter, onFinishedTyping]);

  useEffect(() => {
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
      }, TIMER_UPDATE_INTERVAL);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, startTime, textTyped.length, calculateRealTimeStats, finishTyping, resetType]);

  useEffect(() => {
    if (reset) {
      resetType();
      onResetComplete();
    }
  }, [reset, resetType, onResetComplete]);

  useEffect(() => {
    if (cursorIndex >= visibleTextStart && cursorIndex < visibleTextEnd) {
      requestAnimationFrame(() => {
        const charElement = charRefs.current.get(cursorIndex);
        if (charElement && textContainerRef.current) {
          const charRect = charElement.getBoundingClientRect();
          const containerRect = textContainerRef.current.getBoundingClientRect();
          const left = charRect.left - containerRect.left + textContainerRef.current.scrollLeft - 10;
          const top = charRect.top - containerRect.top + textContainerRef.current.scrollTop - 2;
          setCursorPosition({ left, top });
        }
      });
    } else {
      setCursorPosition(null);
    }
  }, [cursorIndex, visibleTextStart, visibleTextEnd, renderedText]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isButton = target && (target.tagName === 'BUTTON' || target.closest('button'));
      const isTypingActive = startTime > 0 || textTyped.length > 0;
      
      if (e.key === "Enter") {
        if (isButton || isTypingActive) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }

      if (e.metaKey && e.key === "r") {
        e.preventDefault();
        resetType();
        return;
      }

      if (e.key === "Tab" || (e.key.length !== 1 && e.key !== "Backspace")) {
        e.preventDefault();
        return;
      }

      if (startTime === 0 && e.key !== "Backspace") {
        setStartTime(Date.now());
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'BUTTON' || activeElement.closest('button'))) {
          activeElement.blur();
        }
      }

      if (textTyped.length >= renderedText.length - 1) {
        finishTyping();
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
        keystrokesRef.current += e.key;
      }

      if (cursorRef.current && textContainerRef.current) {
        requestAnimationFrame(() => {
          if (!cursorRef.current || !textContainerRef.current) return;

          const cursorRect = cursorRef.current.getBoundingClientRect();
          const containerRect = textContainerRef.current.getBoundingClientRect();
          const scrollLeft = textContainerRef.current.scrollLeft;
          const scrollTop = textContainerRef.current.scrollTop;
          
          const cursorLeft = cursorRect.left - containerRect.left + scrollLeft;
          const cursorRight = cursorRect.right - containerRect.left + scrollLeft;
          const cursorTop = cursorRect.top - containerRect.top + scrollTop;
          const cursorBottom = cursorRect.bottom - containerRect.top + scrollTop;
          
          let newScrollLeft = scrollLeft;
          let newScrollTop = scrollTop;
          
          if (cursorLeft < scrollLeft + SCROLL_MARGIN) {
            newScrollLeft = Math.max(0, cursorLeft - SCROLL_MARGIN);
          } else if (cursorRight > scrollLeft + containerRect.width - SCROLL_MARGIN) {
            newScrollLeft = cursorRight - containerRect.width + SCROLL_MARGIN;
          }
          
          if (cursorTop < scrollTop + SCROLL_MARGIN) {
            newScrollTop = Math.max(0, cursorTop - SCROLL_MARGIN);
          } else if (cursorBottom > scrollTop + containerRect.height - SCROLL_MARGIN) {
            newScrollTop = cursorBottom - containerRect.height + SCROLL_MARGIN;
          }
          
          if (newScrollLeft !== scrollLeft || newScrollTop !== scrollTop) {
            textContainerRef.current.scrollTo({
              left: newScrollLeft,
              top: newScrollTop,
              behavior: "smooth"
            });
          }
        });
      }
    },
    [renderedText, cursorIndex, startTime, textTyped, errorsCount, finishTyping, resetType]
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
              color: "var(--accent-tertiary)",
              fontWeight: 500,
              textAlign: "center"
            }}
          >
            {timer} s
          </Typography>
        </Box>
        
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
          minHeight: "150px",
          maxHeight: "400px",
          maxWidth: "1400px",
          overflow: "auto",
          scrollbarWidth: "none",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          padding: "20px",
          outline: "none",
          border: "none",
          "&:focus": {
            outline: "none",
            border: "none",
          },
          "&:focus-visible": {
            outline: "none",
            border: "none",
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

export default memo(TypingSpeedTest);

