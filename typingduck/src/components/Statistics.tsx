import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface StatsInfo {
  wordStats: WordStatsInfo;
  accuracyStats: AccuracyStatsInfo;
  errorStats: ErrorStatsInfo;
}
interface AccuracyStatsInfo {
  accuracy: number;
}
interface ErrorStatsInfo {
  errors: number;
  correctedErrors: number;
  errorRate: number;
}

interface WordStatsInfo {
  wpm: number;
  cpm: number;
  keystrokes: number;
}

interface Statistic {
  label: string;
  value: WordStatsInfo | AccuracyStatsInfo | ErrorStatsInfo;
  render: (stats: any) => JSX.Element;
}

interface StatisticsInterface {
  statsInfo: StatsInfo;
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

  const statisticsData: Statistic[] = [
    {
      label: "Word",
      value: statsInfo.wordStats,
      render: (stats: WordStatsInfo) => (
        <>
          <Typography variant="subtitle1">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>WPM:</span>
              <span>{stats.wpm}</span>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>CPM:</span>
              <span>{stats.cpm}</span>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>Keystrokes:</span>
              <span>{stats.keystrokes}</span>
            </Box>
          </Typography>
        </>
      ),
    },
    {
      label: "Error",
      value: statsInfo.errorStats,
      render: (stats: ErrorStatsInfo) => (
        <>
          <Typography variant="subtitle1">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>Errors:</span>
              <span>{stats.errors}</span>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>Corrected Errors:</span>
              <span>{stats.correctedErrors}</span>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>Error Rate (%):</span>
              <span>{stats.errorRate}</span>
            </Box>
          </Typography>
        </>
      ),
    },
    {
      label: "Accuracy",
      value: statsInfo.accuracyStats,
      render: (stats: AccuracyStatsInfo) => (
        <>
          <Typography variant="subtitle1">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>Accuracy (%):</span>
              <span>{stats.accuracy}</span>
            </Box>
          </Typography>
        </>
      ),
    },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "40vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "1000px",
          flexDirection: "row",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        {statisticsData.map((statistic, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: 2,
              color: "whitesmoke",
              width: "250px",
              height: "300px",
              marginBottom: 2,
              backgroundColor: "#4a4e69",
              opacity: animationStage >= index + 1 ? 1 : 0, // Fade in based on animation stage
              transition:
                "opacity 0.5s ease-in-out, transform 0.4s ease-in-out",
              boxShadow: "5px 100px 200px rgba(0, 0, 0, 0.5)",
              "&:hover": {
                transform: "translateY(-20px)",
              },
            }}
          >
            <Typography variant="h6">{statistic.label}</Typography>
            <Divider
              sx={{
                backgroundColor: "whitesmoke",
                marginTop: "8px", // Adjust the margin top
                marginBottom: "8px", // Adjust the margin bottom
              }}
            />
            {statistic.render(statistic.value)}
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Statistics;
