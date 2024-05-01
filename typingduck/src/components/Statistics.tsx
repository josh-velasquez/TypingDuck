import {
  Box,
  Container,
  Divider,
  Fade,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export interface StatisticsInfo {
  wpm: number;
  errors: number;
  accuracy: number;
}

interface StatisticsInterface {
  statsInfo: StatisticsInfo;
}

const Statistics: React.FC<StatisticsInterface> = ({ statsInfo }) => {
  const [animationStage, setAnimationStage] = useState<number>(0);

  useEffect(() => {
    const timeouts = [100, 400, 500]; // Adjust timing as needed
    const animateStatistics = () => {
      if (animationStage < 4) {
        const timeoutId = setTimeout(() => {
          setAnimationStage((prevStage) => prevStage + 1);
        }, timeouts[animationStage]);

        return () => clearTimeout(timeoutId);
      }
    };

    return animateStatistics();
  }, [animationStage]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        {[
          { label: "WPM", value: statsInfo.wpm },
          { label: "Errors", value: statsInfo.errors },
          { label: "Accuracy", value: statsInfo.accuracy },
        ].map((statistic, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: 2,
              width: "150px",
              marginBottom: 2,
              backgroundColor: "lightgray",
              opacity: animationStage >= index + 1 ? 1 : 0, // Fade in based on animation stage
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <Typography variant="h6">{statistic.label}</Typography>
            <Divider />
            <Typography variant="subtitle1">
              {statistic.value}
              {statistic.label === "Accuracy" ? "%" : ""}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Statistics;
