import {
  Box,
  Container,
  Fade,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import KeyboardLayout from "../components/KeyboardLayout";
import ExtendedKeyboardLayout from "../components/ExtendedKeyboardLayout";
import CustomButton from "../components/CustomButton";
import { splitWords } from "../util/TextUtil";
import { RestartAlt, ExpandMore, ExpandLess } from "@mui/icons-material";

const TypeTestPage: React.FC = () => {
  const [keyPressed, setKeyPressed] = useState<string[]>([]);
  const [numKeyStrokes, setNumKeyStrokes] = useState<number>(0);
  const [progressColour, setProgressColour] = useState<string>("#fff");
  const [extendKeyboard, setExtendKeyboard] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [showKey, setShowKey] = useState<boolean>(true);
  const [keyVisible, setKeyVisible] = useState<string>("");
  const NUM_KEYS = 74;

  const getLowerCaseId = (key: string): string => {
    return key.length > 1 ? key : key.toLowerCase();
  };

  const handleOnResetClick = (): void => {
    const allKeys = document.querySelectorAll('.keyboard div');
    allKeys.forEach((key) => {
      key.classList.remove('key-highlighted');
      key.removeAttribute('data-pressed');
    });

    setKeyPressed([]);
    setNumKeyStrokes(0);
    setProgressColour("#fff");
  };

  const handleKeyHighlight = (key: string, highlight: boolean): void => {
    try {
      let currentKey;
      if (key === " " || key === "Space") {
        currentKey = document.getElementById("Space");
      } else if (key === "Shift" || key === "Alt" || key === "Meta") {
        const rightKey = document.getElementById(key + "-R");
        if (rightKey) {
          if (highlight) {
            rightKey.classList.add("key-highlighted");
          } else {
            rightKey.classList.remove("key-highlighted");
          }
        }
        currentKey = document.getElementById(key);
      } else if (key === "ArrowUp") {
        currentKey = document.getElementById("ArrowUp");
      } else if (key === "ArrowDown") {
        currentKey = document.getElementById("ArrowDown");
      } else if (key === "ArrowLeft" || key === "ArrowRight") {
        currentKey = document.getElementById(key);
      } else {
        currentKey = document.getElementById(getLowerCaseId(key));
      }

      if (currentKey) {
        if (highlight) {
          currentKey.classList.add("key-highlighted");
        } else {
          currentKey.classList.remove("key-highlighted");
        }
      }
    } catch (error: unknown) {
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

  const getProgress = (): number => (numKeyStrokes / NUM_KEYS) * 100;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'INPUT' || target.closest('button'))) {
        return;
      }

      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && (activeElement.tagName === 'BUTTON' || activeElement.closest('button'))) {
        activeElement.blur();
      }

      e.preventDefault();
      const key = getKey(e);
      if (!key) {
        console.warn("No key for", e.keyCode);
        return;
      }

      key.setAttribute("data-pressed", "on");
      const convertSpaceKey = e.key === " " ? "Space" : e.key;
      if (!keyPressed.includes(convertSpaceKey)) {
        setNumKeyStrokes((prev) => prev + 1);
        setKeyPressed((prev) => [...prev, convertSpaceKey]);
        handleKeyHighlight(convertSpaceKey, true);
        if (numKeyStrokes >= Math.round(NUM_KEYS / 2)) {
          setProgressColour("#000");
        }
      }

      const keyText = splitWords(convertSpaceKey);
      setKeyVisible(keyText);
    },
    [keyPressed, numKeyStrokes]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      const key = getKey(e);
      key && key.removeAttribute("data-pressed");
    },
    [keyPressed]
  );

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    if (keyVisible) {
      setShowKey(true);
      const fadeTimeout = setTimeout(() => {
        setShowKey(false);
      }, 1000);

      return () => clearTimeout(fadeTimeout);
    }
  }, [keyVisible]);

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="100px"
      >
        <Container>

          <Box
            sx={{ marginBottom: "30px" }}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Fade in={showKey} timeout={{ enter: 200, exit: 500 }}>
              <Typography
                variant="h4"
                sx={{
                  color: "var(--accent-primary)",
                  fontWeight: 500,
                }}
              >
                {keyVisible === "" ? "type to start..." : keyVisible}
              </Typography>
            </Fade>
          </Box>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                overflow: "visible",
                width: "100%",
                marginLeft: "-50px",
                marginTop: "-50px",
              }}
            >
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                transform: extendKeyboard ? "scale(0.9)" : "scale(1.1)",
                transformOrigin: "left top",
                transition: "transform 0.5s ease-in-out",
                display: "inline-block",
              }}
            >
              <KeyboardLayout />
            </Box>
            
            <Box
              sx={{
                position: "absolute",
                left: "75%",
                top: "50px",
                zIndex: 3,
                transformOrigin: "left top",
                opacity: extendKeyboard ? 1 : 0,
                visibility: extendKeyboard ? "visible" : "hidden",
                transform: extendKeyboard ? "scale(0.9) translateX(0)" : "scale(0.9) translateX(-100px)",
                transition: "all 0.5s ease-in-out",
              }}
            >
              <ExtendedKeyboardLayout />
            </Box>

          </Box>
          {showProgress && (
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
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--neutral-600)",
                    height: 40,
                    backgroundColor: "var(--primary-surface)",
                    "& .MuiLinearProgress-bar": {
                      background: "var(--accent-primary)",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </Container>
      </Box>
      
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", gap: "10px" }}>
        <CustomButton
          buttonText={extendKeyboard ? "Collapse Keyboard" : "Extend Keyboard"}
          onCustomButtonClick={() => setExtendKeyboard(!extendKeyboard)}
          icon={extendKeyboard ? <ExpandLess /> : <ExpandMore />}
          sx={{
            backgroundColor: "transparent",
            color: "var(--neutral-500)",
            border: "1px solid var(--neutral-600)",
            fontSize: "0.8rem",
            padding: "8px 16px",
            minWidth: "auto",
            position: "relative",
            zIndex: 10,
            pointerEvents: "auto",
            "&:hover": {
              backgroundColor: "var(--accent-tertiary)",
              color: "var(--primary-bg)",
              borderColor: "var(--accent-tertiary)",
            },
          }}
        />
        
        <CustomButton
          buttonText="Reset"
          onCustomButtonClick={handleOnResetClick}
          icon={<RestartAlt />}
          sx={{
            backgroundColor: "transparent",
            color: "var(--neutral-500)",
            border: "1px solid var(--neutral-600)",
            fontSize: "0.8rem",
            padding: "8px 16px",
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "var(--accent-tertiary)",
              color: "var(--primary-bg)",
              borderColor: "var(--accent-tertiary)",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default TypeTestPage;
