import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import KeyboardLayout from "./KeyboardLayout";

interface KeyboardAnimatorInterface {
  animateWord: string;
}

const KeyboardAnimator: React.FC<KeyboardAnimatorInterface> = ({
  animateWord,
}) => {
  const [wordToAnimate, setWordToAnimate] = useState<string>();

  useEffect(() => {
    animateWord.split("").forEach((letter: string, index: number) => {
      const key = document.querySelector(
        `[data-char="${letter.toUpperCase()}"]`
      );
      if (key) {
        setTimeout(() => {
          key.setAttribute("data-pressed", "on");
          setWordToAnimate(animateWord.substring(0, index + 1));
          setTimeout(() => key.removeAttribute("data-pressed"), 200);
        }, 150 * index);
      }
    });
  }, [animateWord]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: 15 }}>
      <Container>
        <Typography
          variant="h2"
          sx={{
            height: 60,
            color: "whitesmoke",
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          {wordToAnimate ? wordToAnimate : " "}
        </Typography>
        <KeyboardLayout />
      </Container>
    </Box>
  );
};

export default KeyboardAnimator;
