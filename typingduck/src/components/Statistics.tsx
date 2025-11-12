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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(221, 110, 66, 0.08)",
                border: "1px solid rgba(221, 110, 66, 0.2)",
              }}
            >
              <Typography 
                variant="h3" 
                data-color="accent-tertiary"
                sx={{ 
                  color: "var(--accent-tertiary)", 
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  lineHeight: 1,
                  marginBottom: 0.5,
                  transition: "color 0.3s ease"
                }}
              >
                {wordStats.wpm}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: "var(--neutral-600)", 
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}>
                Words Per Minute
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: 1 }}>
                <Typography variant="body2" sx={{ 
                  color: "var(--neutral-600)", 
                  fontSize: "0.875rem",
                  fontWeight: 500
                }}>
                  Keystrokes
                </Typography>
                <Typography variant="h6" sx={{ 
                  color: "var(--neutral-600)", 
                  fontWeight: 600,
                  fontSize: "1.25rem"
                }}>
                  {wordStats.keystrokes}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: "var(--neutral-600)", opacity: 0.3 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: 1 }}>
                <Typography variant="body2" sx={{ 
                  color: "var(--neutral-600)", 
                  fontSize: "0.875rem",
                  fontWeight: 500
                }}>
                  Words
                </Typography>
                <Typography variant="h6" sx={{ 
                  color: "var(--neutral-600)", 
                  fontWeight: 600,
                  fontSize: "1.25rem"
                }}>
                  {wordStats.totalWordsTyped}
                </Typography>
              </Box>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(222, 65, 65, 0.08)",
                border: "1px solid rgba(222, 65, 65, 0.2)",
              }}
            >
              <Typography 
                variant="h3" 
                data-color="accent-danger"
                sx={{ 
                  color: "var(--accent-danger)", 
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  lineHeight: 1,
                  marginBottom: 0.5,
                  transition: "color 0.3s ease"
                }}
              >
                {errorStats.errors}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: "var(--neutral-600)", 
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}>
                Total Errors
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: 1 }}>
                <Typography variant="body2" sx={{ 
                  color: "var(--neutral-600)", 
                  fontSize: "0.875rem",
                  fontWeight: 500
                }}>
                  Corrected
                </Typography>
                <Typography 
                  variant="h6" 
                  data-color="accent-tertiary"
                  sx={{ 
                    color: "var(--accent-tertiary)", 
                    fontWeight: 600,
                    fontSize: "1.25rem"
                  }}
                >
                  {errorStats.correctedErrors}
                </Typography>
              </Box>
              <Divider sx={{ borderColor: "var(--neutral-600)", opacity: 0.3 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: 1 }}>
                <Typography variant="body2" sx={{ 
                  color: "var(--neutral-600)", 
                  fontSize: "0.875rem",
                  fontWeight: 500
                }}>
                  Error Rate
                </Typography>
                <Typography 
                  variant="h6" 
                  data-color="accent-danger"
                  sx={{ 
                    color: "var(--accent-danger)", 
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    transition: "color 0.3s ease"
                  }}
                >
                  {errorStats.errorRate}%
                </Typography>
              </Box>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(221, 110, 66, 0.08)",
                border: "1px solid rgba(221, 110, 66, 0.2)",
              }}
            >
              <Typography 
                variant="h3" 
                data-color="accent-tertiary"
                sx={{ 
                  color: "var(--accent-tertiary)", 
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  lineHeight: 1,
                  marginBottom: 0.5,
                  transition: "color 0.3s ease"
                }}
              >
                {accuracyStats.accuracy}%
              </Typography>
              <Typography variant="body2" sx={{ 
                color: "var(--neutral-600)", 
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}>
                Accuracy
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: 1 }}>
              <Typography variant="body2" sx={{ 
                color: "var(--neutral-600)", 
                fontSize: "0.875rem",
                fontWeight: 500
              }}>
                Time
              </Typography>
              <Typography variant="h6" sx={{ 
                color: "var(--neutral-600)", 
                fontWeight: 600,
                fontSize: "1.25rem"
              }}>
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
        minHeight: "50vh",
        padding: { xs: 2, md: 4 },
        maxWidth: "1200px",
      }}
      role="region"
      aria-label="Typing test statistics"
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: { xs: 2.5, md: 3 },
          width: "100%",
        }}
      >
        {statisticsData.map((statistic, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              padding: { xs: 2.5, md: 3.5 },
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(79, 109, 122, 0.2)",
              borderRadius: "var(--radius-xl)",
              opacity: animationStage >= index + 1 ? 1 : 0,
              transform: animationStage >= index + 1 ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              position: "relative",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                color: "var(--accent-primary)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 2.5,
                textAlign: "center",
                fontSize: { xs: "0.875rem", md: "1rem" },
                transition: "color 0.3s ease"
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
