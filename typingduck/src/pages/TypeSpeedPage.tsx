import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Statistics, { StatisticsInfo } from "../components/Statistics";

const TypeSpeedPage = () => {
  const sampleQuote =
    "Out of the night that covers me, Black as the Pit from pole to pole, I thank whatever gods may be, For my unconquerable soul. In the fell clutch of circumstance I have not winced nor cried aloud. Under the bludgeonings of chance My head is bloody, but unbowed. Beyond this place of wrath and tears Looms but the Horror of the shade, And yet the menace of the years Finds, and shall find, me unafraid. It matters not how strait the gate, How charged with punishments the scroll, I am the master of my fate: I am the captain of my soul.";
  const TIME_LIMIT = 30;
  const [text, setText] = useState<string>(sampleQuote);
  const [startTime, setStartTime] = useState<number>(0);
  const [typingStarted, setTypingStarted] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(TIME_LIMIT);
  const [typedText, setTypedText] = useState<string>("");
  const [cursorIndex, setCursorIndex] = useState<number>(0);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [errors, setErrors] = useState<number>(0);
  const [statsInfo, setStatsInfo] = useState<StatisticsInfo>({
    wpm: 0,
    errors: 0,
    accuracy: 0,
  });

  const calculateTimeLeft = () => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(TIME_LIMIT - elapsedTime, 0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (typingStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer(calculateTimeLeft());
      }, 1000);
    } else if (timer === 0) {
      setShowStats(true);
      // Update statsInfo
      setStatsInfo({
        wpm: Math.round(typedText.length / 5 / 0.5),
        errors: errors,
        accuracy: Math.round(
          ((typedText.length - errors) / typedText.length) * 100
        ),
      });
    }

    return () => clearInterval(interval);
  }, [typingStarted, timer]);

  const handleTypingStart = () => {
    if (!typingStarted) {
      setStartTime(Date.now());
      setTypingStarted(true);
    }
  };

  const handlOnResetClick = () => {
    setShowStats(false);
    setTypedText("");
    setCursorIndex(0);
    setStartTime(0);
    setTypingStarted(false);
    setTimer(TIME_LIMIT);
  };

  useEffect(() => {
    let prevTypedChar = "";

    const handleKeyDown = (e: any) => {
      handleTypingStart();

      // only accept single letters or backspace
      if (e.key.length !== 1 && e.key !== "Backspace") {
        return;
      }
      if (e.key === "Backspace" && cursorIndex >= 0) {
        if (cursorIndex === 0) {
          return;
        }
        const lastChar = typedText.charAt(typedText.length - 1);
        if (lastChar !== " ") {
          const expectedChar = text[cursorIndex - 1].toLowerCase(); // Get the corresponding character in the sample quote
          if (lastChar.toLowerCase() !== expectedChar) {
            setErrors((prevErrors) => prevErrors - 1);
          }
        }
        prevTypedChar = "";
        setCursorIndex((prevIndex) => prevIndex - 1);
        setTypedText((prevText) => prevText.slice(0, -1));
      } else {
        if (typedText.length === text.length) {
          // TODO: we stop and show the stats here -- maybe add a delay first
          return;
        }
        const typedChar = e.key.toLowerCase();
        if (typedChar !== " ") {
          const expectedChar = text[cursorIndex].toLowerCase();
          if (typedChar !== expectedChar && typedChar !== prevTypedChar) {
            setErrors((prevErrors) => prevErrors + 1);
          }
        }
        prevTypedChar = typedChar;
        setCursorIndex((prevIndex) =>
          prevIndex < text.length ? prevIndex + 1 : prevIndex
        );
        setTypedText((prevText) => prevText + e.key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [cursorIndex, text, typedText]);

  const renderTextWithCursor = () => {
    const textBeforeCursor = text.substring(0, cursorIndex);
    const textAfterCursor = text.substring(cursorIndex);

    return (
      <Typography
        sx={{
          fontFamily: "Courier New, monospace",
          fontSize: "1.3rem",
          color: "whitesmoke",
          textAlignLast: "center",
          letterSpacing: "0.2em",
          whiteSpace: "nopwrap",
        }}
      >
        {textBeforeCursor.split("").map((char, index) => (
          <span
            key={index}
            style={{ color: typedText[index] === char ? "#e1b2b2" : "red" }}
          >
            {char}
          </span>
        ))}
        <span
          className={cursorIndex === text.length ? "cursor-animation" : ""}
          style={{ color: "#e1b2b2" }}
        >
          |
        </span>
        {textAfterCursor}
      </Typography>
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      {!showStats ? (
        <Container>
          <Box>
            <Typography variant="h5" color={"#e1b2b2"}>
              {timer} s
            </Typography>
          </Box>
          <Box sx={{ padding: "40px", textAlign: "center" }}>
            {renderTextWithCursor()}
          </Box>
        </Container>
      ) : (
        <Container>
          <Statistics statsInfo={statsInfo} />
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 3,
              width: "20%",
              backgroundColor: "#4A4E69",
              alignSelf: "center",
              borderRadius: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
              "&:hover": {
                backgroundColor: "#C9ADA7",
              },
            }}
            onClick={handlOnResetClick}
          >
            Reset
          </Button>
        </Container>
      )}
    </Box>
  );
};

export default TypeSpeedPage;
