import React from 'react';
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import GaugeChart from 'react-gauge-chart';
import { RefreshRounded } from '@mui/icons-material';

interface Props {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  color: string;
  historicalData?: { timestamp: string; value: number }[];
  onRefresh?: () => void;
  isSelected?: boolean;
  status?: 'green' | 'yellow' | 'red';
}

const SensorPanel: React.FC<Props> = ({
  value,
  min,
  max,
  label,
  unit,
  color,
  historicalData = [],
  onRefresh,
  isSelected = false,
  status = 'green',
}) => {
  const theme = useTheme();
  const percentage = (value - min) / (max - min);

  // Get status colors
  const getStatusColors = () => {
    switch (status) {
      case 'green':
        return ['#FF4444', '#FFBB33', '#00C851'];
      case 'yellow':
        return ['#FF4444', '#FFBB33', '#FFBB33'];
      case 'red':
        return ['#FF4444', '#FF4444', '#FFBB33'];
    }
  };

  // Prepare chart data
  const chartData = [
    {
      id: label,
      data: historicalData.map((d) => ({
        x: d.timestamp,
        y: d.value,
      })),
    },
  ];

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${isSelected ? color : 'rgba(255, 255, 255, 0.1)'}`,
        transition: 'all 0.2s ease-in-out',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          borderColor: `${color}50`,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
        {onRefresh && (
          <Button
            onClick={onRefresh}
            startIcon={<RefreshRounded />}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                color: color,
              },
            }}
          >
            Update
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Box sx={{ width: '100%', height: 120 }}>
          <GaugeChart
            id={`gauge-${label}`}
            nrOfLevels={3}
            colors={getStatusColors()}
            percent={percentage}
            textColor={theme.palette.text.primary}
            needleColor={color}
            needleBaseColor={color}
            arcWidth={0.3}
            cornerRadius={0}
            hideText
            animate={false}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: '300',
            mt: -2,
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          <span style={{ color }}>{value}</span>
          <Typography
            component="span"
            sx={{
              fontSize: '1rem',
              color: theme.palette.text.secondary,
              ml: 1,
            }}
          >
            {unit}
          </Typography>
        </Typography>
      </Box>

      {historicalData.length > 0 && (
        <Box sx={{ flex: 1, minHeight: 200 }}>
          <ResponsiveLine
            data={chartData}
            margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
            xScale={{
              type: 'point',
            }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false,
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            enablePoints={true}
            pointSize={6}
            pointColor={color}
            pointBorderWidth={2}
            pointBorderColor={theme.palette.background.paper}
            enableGridX={false}
            enableGridY={true}
            gridYValues={5}
            colors={[color]}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.divider,
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.divider,
                  },
                  text: {
                    fill: theme.palette.text.secondary,
                  },
                },
              },
              grid: {
                line: {
                  stroke: theme.palette.divider,
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                },
              },
            }}
            motionConfig="gentle"
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="caption" color="textSecondary">
          Min: {min} {unit}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Max: {max} {unit}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SensorPanel; 