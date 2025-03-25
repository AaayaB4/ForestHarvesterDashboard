import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Box,
  useTheme,
} from '@mui/material';
import { SensorData, SensorColors } from '../types';
import { sensorConfig } from '../config/sensorConfig';

interface Props {
  sensorData: Record<keyof SensorData, number>;
  sensorColors: Record<keyof SensorColors, 'green' | 'yellow' | 'red'>;
}

const getStatusColor = (status: 'green' | 'yellow' | 'red'): string => {
  switch (status) {
    case 'green':
      return '#4caf50';
    case 'yellow':
      return '#ff9800';
    case 'red':
      return '#f44336';
    default:
      return '#9e9e9e';
  }
};

const calculateProgress = (value: number, min: number, max: number): number => {
  return ((value - min) / (max - min)) * 100;
};

const SensorStatus: React.FC<Props> = ({ sensorData, sensorColors }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {Object.entries(sensorData).map(([key, value]) => {
          const sensorKey = key as keyof SensorData;
          const config = sensorConfig[sensorKey];
          const color = getStatusColor(sensorColors[sensorKey]);
          const progress = calculateProgress(value, config.min, config.max);

          return (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Paper
                sx={{
                  p: 2,
                  height: '100%',
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {config.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Typography variant="h4" sx={{ mr: 1 }}>
                      {value.toFixed(1)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {config.unit}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: `${color}20`,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: color,
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 0.5,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {config.min}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {config.max}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SensorStatus; 