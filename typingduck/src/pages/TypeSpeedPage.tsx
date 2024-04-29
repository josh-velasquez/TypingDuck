import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const TypeSpeedPage = () => {
  const [wpm, setWpm] = useState<number>(0);
  const [cpm, setCpm] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [textToType, setTextToType] = useState<string>("");
  const [typeLabel, setTypeLabel] = useState<string>("Type to start...");
  const [typed, setTyped] = useState<string>("");
  // https://coolors.co/palette/22223b-4a4e69-9a8c98-c9ada7-f2e9e4

  const handleTypingStart = () => {
    setTypeLabel("In progress...");
  };

  const handleTypingEnd = () => {
    setTypeLabel("Type to start...");
    setTyped("");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Container>
        <Paper
          elevation={3}
          sx={{ padding: 2, marginBottom: 2, backgroundColor: "#9a8c98" }}
        >
          <Grid
            container
            spacing={5}
            justifyContent="center"
            sx={{ marginBottom: 4 }}
          >
            <Grid item xs={2}>
              <Box
                sx={{
                  backgroundColor: "#e1b2b2",
                  borderRadius: 5,
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">WPM</Typography>
                <Typography variant="subtitle1">{wpm}</Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  backgroundColor: "#e1b2b2",
                  borderRadius: 5,
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">CPM</Typography>
                <Typography variant="subtitle1">{cpm}</Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  backgroundColor: "#e1b2b2",
                  borderRadius: 5,
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">Errors</Typography>
                <Typography variant="subtitle1">{errors}</Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  backgroundColor: "#e1b2b2",
                  borderRadius: 5,
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">Timer</Typography>
                <Typography variant="subtitle1">{timer}</Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Box
                sx={{
                  backgroundColor: "#e1b2b2",
                  borderRadius: 5,
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6">Accuracy</Typography>
                <Typography variant="subtitle1">{accuracy}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider />
          <Container>
            <Box
              sx={{
                backgroundColor: "#c9ada7",
                borderRadius: 5,
                padding: 2,
                marginBottom: 2,
                marginTop: 2,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)", // Add a subtle shadow
              }}
            >
              <Typography variant="h6" align="left">
                This is a sample text
              </Typography>
            </Box>
            <TextField
              id="standard-basic"
              label={typeLabel}
              variant="standard"
              fullWidth
              value={typed}
              onFocus={handleTypingStart}
              onBlur={handleTypingEnd}
              onChange={(e) => setTyped(e.target.value)}
            />
          </Container>
          <Button>Reset</Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default TypeSpeedPage;
