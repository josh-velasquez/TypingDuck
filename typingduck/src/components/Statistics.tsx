import { Box, Container, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export interface StatsInfo {
  wordStats: WordStatsInfo;
  accuracyStats: AccuracyStatsInfo;
  errorStats: ErrorStatsInfo;
}
interface AccuracyStatsInfo {
  accuracy: number;
  time: number;
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
  totalWordsTyped: number;
}

interface Statistic {
  label: string;
  value: WordStatsInfo | AccuracyStatsInfo | ErrorStatsInfo;
  render: (stats: WordStatsInfo | AccuracyStatsInfo | ErrorStatsInfo) => JSX.Element;
}

interface StatisticsInterface {
  statsInfo: StatsInfo;
}

const Statistics: React.FC<StatisticsInterface> = ({ statsInfo }) => {
  const [animationStage, setAnimationStage] = useState<number>(0);

  useEffect(() => {
    const timeouts = [100, 400, 500];
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
      label: "word",
      value: statsInfo.wordStats,
      render: (stats: WordStatsInfo | AccuracyStatsInfo | ErrorStatsInfo) => {
        const wordStats = stats as WordStatsInfo;
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.75rem" }}>
                WPM
              </Typography>
              <Typography variant="h5" sx={{ color: "var(--accent-tertiary)", fontWeight: 600 }}>
                {wordStats.wpm}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.75rem" }}>
                Keystrokes
              </Typography>
              <Typography variant="h5" sx={{ color: "var(--neutral-100)", fontWeight: 600 }}>
                {wordStats.keystrokes}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.75rem" }}>
                Words
              </Typography>
              <Typography variant="h5" sx={{ color: "var(--neutral-100)", fontWeight: 600 }}>
                {wordStats.totalWordsTyped}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      label: "error",
      value: statsInfo.errorStats,
      render: (stats: WordStatsInfo | AccuracyStatsInfo | ErrorStatsInfo) => {
        const errorStats = stats as ErrorStatsInfo;
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.75rem" }}>
                Errors
              </Typography>
              <Typography variant="h5" sx={{ color: "var(--accent-danger)", fontWeight: 600 }}>
                {errorStats.errors}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.75rem" }}>
                Corrected
              </Typography>
              <Typography variant="h5" sx={{ color: "var(--accent-tertiary)", fontWeight: 600 }}>
                {errorStats.correctedErrors}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.75rem" }}>
                Error Rate
              </Typography>
              <Typography variant="h5" sx={{ color: "var(--accent-danger)", fontWeight: 600 }}>
                {errorStats.errorRate}%
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      label: "accuracy",
      value: statsInfo.accuracyStats,
      render: (stats: WordStatsInfo | AccuracyStatsInfo | ErrorStatsInfo) => {
        const accuracyStats = stats as AccuracyStatsInfo;
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.75rem" }}>
                Accuracy
              </Typography>
              <Typography variant="h5" sx={{ color: "var(--accent-secondary)", fontWeight: 600 }}>
                {accuracyStats.accuracy}%
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body2" sx={{ color: "var(--neutral-400)", fontSize: "0.75rem" }}>
                Time
              </Typography>
              <Typography variant="h5" sx={{ color: "var(--neutral-100)", fontWeight: 600 }}>
                {accuracyStats.time}s
              </Typography>
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40vh",
        padding: 2,
      }}
      role="region"
      aria-label="Typing test statistics"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 3,
          width: "100%",
          maxWidth: "900px",
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
            gap: 2,
          },
        }}
      >
        {statisticsData.map((statistic, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              padding: 2.5,
              backgroundColor: "var(--primary-surface)",
              border: "1px solid var(--neutral-700)",
              borderRadius: "var(--radius-lg)",
              opacity: animationStage >= index + 1 ? 1 : 0,
              transform: animationStage >= index + 1 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.4s ease-in-out",
              "&:hover": {
                backgroundColor: "var(--primary-elevated)",
                borderColor: "var(--accent-primary)",
              },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: "var(--accent-primary)",
                fontWeight: 600,
                textTransform: "capitalize",
                marginBottom: 1.5,
                textAlign: "center",
              }}
            >
              {statistic.label}
            </Typography>
            
            {statistic.render(statistic.value)}
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Statistics;
