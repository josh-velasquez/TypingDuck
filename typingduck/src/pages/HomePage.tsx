import { Box, Typography } from "@mui/material";
import KeyboardLayout from "../components/KeyboardLayout";
import { useEffect, useState } from "react";

const HomePage = () => {
  const headerText = "typing duck.";
  const [typedText, setTypedText] = useState<string>(headerText);
  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      if (index <= headerText.length) {
        setTypedText(headerText.substring(0, index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 130);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <Box sx={{ marginTop: 15 }}>
      <Typography
        variant="h2"
        sx={{
          height: 60,
          color: "whitesmoke",
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        {typedText ? typedText : " "}
      </Typography>
      <KeyboardLayout animateWord={headerText} />
    </Box>
  );
};

export default HomePage;