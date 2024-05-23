import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Statistics, { StatsInfo } from "../components/Statistics";
import CustomButton from "../components/CustomButton";
import InputModal from "../components/InputModal";
import { generateRandomText } from "../util/TextUtil";
import TypeSpeedScroll from "../components/TypeSpeedScroll";
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
              <TypeSpeedScroll
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
                justifyContent: "space-between",
                marginTop: "100px",
              }}
            >
              {/* <CustomButton
                buttonText="Reset"
                onCustomButtonClick={handlOnResetClick}
                disableKeyInvoke
              /> */}
              <CustomButton
                buttonText="custom text"
                onCustomButtonClick={handleCustomTextClick}
                icon={<ImportExport />}
                disableKeyInvoke
              />
            </Box>
          </Container>
        ) : (
          <Container>
            <Statistics statsInfo={statsInfo} />
            <CustomButton
              buttonText="Reset"
              onCustomButtonClick={handlOnResetClick}
              icon={<RestartAlt />}
            />
          </Container>
        )}
      </Box>
      <InputModal
        open={openInputModal}
        title="Paste custom text"
        onClose={handleOnCloseModalClick}
        onInputChange={handleCustomTextInput}
      />
    </>
  );
};

export default TypeSpeedPage;
