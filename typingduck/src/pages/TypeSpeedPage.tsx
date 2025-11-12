import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Statistics, { StatsInfo } from "../components/Statistics";
import CustomButton from "../components/CustomButton";
import InputModal from "../components/InputModal";
import { generateRandomText } from "../util/TextUtil";
import TypingSpeedTest from "../components/TypingSpeedTest";
import { ImportExport, RestartAlt } from "@mui/icons-material";

const TypeSpeedPage = () => {
  const SAMPLE_TEXT_LIMIT = 300;
  const [text, setText] = useState<string>(
    generateRandomText(SAMPLE_TEXT_LIMIT)
  );
  const [resetTypingSpeed, setResetTypingSpeed] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [openInputModal, setOpenInputModal] = useState<boolean>(false);
  const [enableKeyboardListener, setEnableKeyboardListener] =
    useState<boolean>(true);
  const [statsInfo, setStatsInfo] = useState<StatsInfo>({
    wordStats: {
      wpm: 0,
      cpm: 0,
      keystrokes: 0,
      totalWordsTyped: 0,
    },
    accuracyStats: {
      accuracy: 0,
      time: 0,
    },
    errorStats: {
      errors: 0,
      correctedErrors: 0,
      errorRate: 0,
    },
  });

  const handleCustomTextClick = () => {
    setOpenInputModal(true);
    setResetTypingSpeed(true);
    setEnableKeyboardListener(false);
  };

  const handleCustomTextInput = (newText: string) => {
    reset();
    if (newText !== "") {
      setText(newText);
    }
  };

  const handleOnCloseModalClick = () => {
    setOpenInputModal(false);
    setEnableKeyboardListener(true);
  };

  const handlOnResetClick = () => {
    reset();
  };

  const reset = () => {
    setShowStats(false);
    setResetTypingSpeed(true);
  };

  const onFinished = (stats: StatsInfo) => {
    setShowStats(true);
    setStatsInfo(stats);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        {!showStats ? (
          <Container>

            {text && (
              <TypingSpeedTest
                text={text}
                onFinishedTyping={onFinished}
                reset={resetTypingSpeed}
                enableKeyboardListener={enableKeyboardListener}
                onResetComplete={() => {
                  setResetTypingSpeed(false);
                }}
                onGetNewText={() => {
                  setText(generateRandomText(SAMPLE_TEXT_LIMIT));
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CustomButton
                buttonText="custom text"
                onCustomButtonClick={handleCustomTextClick}
                icon={<ImportExport />}
                disableKeyInvoke
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
          </Container>
        ) : (
          <Container>
            <Statistics statsInfo={statsInfo} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CustomButton
                buttonText="Reset"
                onCustomButtonClick={handlOnResetClick}
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
          </Container>
        )}
      </Box>
      <InputModal
        open={openInputModal}
        title="paste custom text"
        onClose={handleOnCloseModalClick}
        onInputChange={handleCustomTextInput}
      />
    </>
  );
};

export default TypeSpeedPage;
