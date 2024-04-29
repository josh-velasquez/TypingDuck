import {
  Box,
  Button,
  Container,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardLayout from "../components/KeyboardLayout";

const TypeTestPage = () => {
  const [keyPressed, setKeyPressed] = useState<string[]>([]);
  const [numKeyStrokes, setNumKeyStrokes] = useState<number>(0);
  const [progressColour, setProgressColour] = useState<string>("#fff");
  const NUM_KEYS = 74;

  const getLowerCaseId = (key: string): string => {
    return key.length > 1 ? key : key.toLowerCase();
  };

  const handleOnResetClick = () => {
    keyPressed.forEach((key) => {
      handleKeyHighlight(key, false);
    });
    setKeyPressed([]);
    setNumKeyStrokes(0);
    setProgressColour("#fff");
  };

  const handleKeyHighlight = (key: string, highlight: boolean) => {
    try {
      let currentKey;
      // if we press space
      if (key === " ") {
        currentKey = document.getElementById("Space");
      } else if (key === "Shift" || key === "Alt" || key === "Meta") {
        const rightKey = document.getElementById(key + "-R");
        if (rightKey) {
          rightKey.style.backgroundColor = highlight ? "#e1b2b2" : "#2f243a";
          rightKey.style.color = highlight ? "#2f243a" : "#e1b2b2";
        }
        currentKey = document.getElementById(key);
      } else {
        const newKey = getLowerCaseId(key);
        currentKey = document.getElementById(newKey);
      }

      if (currentKey) {
        currentKey.style.backgroundColor = highlight ? "#e1b2b2" : "#2f243a";
        currentKey.style.color = highlight ? "#2f243a" : "#e1b2b2";
      }
    } catch (error: any) {
      console.warn("Key error: ", error);
    }
  };

  const getKey = (e: KeyboardEvent): HTMLElement | null => {
    const location = e.location;
    let selector;
    if (location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
      selector = `[data-key="${e.keyCode}-R"]`;
    } else {
      const code = e.keyCode || e.which;
      selector = [
        `[data-key="${code}"]`,
        `[data-char*="${encodeURIComponent(String.fromCharCode(code))}"]`,
      ].join(",");
    }
    return document.querySelector(selector);
  };

  const getProgress = (): number => {
    return (numKeyStrokes / NUM_KEYS) * 100;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // disable default key actions
      e.preventDefault();
      const key = getKey(e);
      if (!key) {
        console.warn("No key for", e.keyCode);
        return;
      }

      key.setAttribute("data-pressed", "on");

      if (!keyPressed.includes(e.key)) {
        setNumKeyStrokes((prev) => prev + 1);
        setKeyPressed((prev) => [...prev, e.key]);
        let newKey = getLowerCaseId(e.key);
        handleKeyHighlight(newKey, true);
        if (numKeyStrokes >= Math.round(NUM_KEYS / 2)) {
          setProgressColour("#000");
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = getKey(e);
      key && key.removeAttribute("data-pressed");
    };

    document.body.addEventListener("keydown", handleKeyDown);
    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyPressed]);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Container>
          <KeyboardLayout />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "50px",
              position: "relative",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: `${progressColour}`,
                zIndex: 1,
              }}
            >
              {`${Math.round(getProgress())}%`}
            </Typography>
            <Box sx={{ width: "100%", position: "relative" }}>
              <LinearProgress
                variant="determinate"
                value={getProgress()}
                sx={{
                  borderRadius: 4,
                  border: "3px solid #e1b2b2",
                  height: 40,
                  backgroundColor: "transparent",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#e1b2b2",
                  },
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Button onClick={handleOnResetClick}>Reset</Button>
    </Box>
  );
};

export default TypeTestPage;
