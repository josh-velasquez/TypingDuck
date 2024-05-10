import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Statistics, { StatisticsInfo } from "../components/Statistics";
import CustomButton from "../components/CustomButton";
import InputModal from "../components/InputModal";
import TypeSpeedBox from "../components/TypeSpeedBox";
import { generateRandomText } from "../util/TextUtil";

// TODO: when typing, -> render the whole word in a new line (we don't want them to be cut off)
const TypeSpeedPage = () => {
  const SAMPLE_TEXT_LIMIT = 500;
  const [text, setText] = useState<string>(
    generateRandomText(SAMPLE_TEXT_LIMIT)
  );
  const [resetTypingSpeed, setResetTypingSpeed] = useState<boolean>(false);
  const [showStats, setShowStats] = useState<boolean>(false);
  const [openInputModal, setOpenInputModal] = useState<boolean>(false);
  const [statsInfo, setStatsInfo] = useState<StatisticsInfo>({
    wpm: 0,
    errors: 0,
    accuracy: 0,
  });

  const handleCustomTextClick = () => {
    setOpenInputModal(true);
    reset();
    // TODO: disable keyboard listener
  };

  const handleCustomTextInput = (newText: string) => {
    reset();
    if (newText !== "") {
      setText(newText);
    }
  };

  const handleOnCloseModalClick = () => {
    setOpenInputModal(false);
  };

  const handlOnResetClick = () => {
    reset();
  };

  const reset = () => {
    setShowStats(false);
    setResetTypingSpeed(true);
  };

  const onFinished = (stats: StatisticsInfo) => {
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
              <TypeSpeedBox
                text={text}
                onFinishedTyping={onFinished}
                reset={resetTypingSpeed}
                onResetComplete={() => {
                  setResetTypingSpeed(false);
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <CustomButton
                buttonText="Reset"
                onCustomButtonClick={handlOnResetClick}
                disableKeyInvoke
              />
              <CustomButton
                buttonText="Custom Text"
                onCustomButtonClick={handleCustomTextClick}
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
