import React from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
import {
  CheckCircleRounded,
  WarningRounded,
  ErrorRounded,
  BuildRounded,
} from '@mui/icons-material';

interface Props {
  prediction: string;
}

const PredictionAlert: React.FC<Props> = ({ prediction }) => {
  const theme = useTheme();

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Normal Operation':
        return {
          icon: <CheckCircleRounded sx={{ fontSize: 48, color: '#4caf50' }} />,
          color: '#4caf50',
          backgroundColor: '#4caf5010',
          description: 'All systems are functioning within normal parameters',
        };
      case 'Maintenance Recommended':
        return {
          icon: <WarningRounded sx={{ fontSize: 48, color: '#ff9800' }} />,
          color: '#ff9800',
          backgroundColor: '#ff980010',
          description: 'Some parameters are approaching critical levels',
        };
      case 'Maintenance Required':
        return {
          icon: <ErrorRounded sx={{ fontSize: 48, color: '#f44336' }} />,
          color: '#f44336',
          backgroundColor: '#f4433610',
          description: 'Immediate attention required for optimal performance',
        };
      default:
        return {
          icon: <BuildRounded sx={{ fontSize: 48, color: '#9e9e9e' }} />,
          color: '#9e9e9e',
          backgroundColor: '#9e9e9e10',
          description: 'System status unknown',
        };
    }
  };

  const statusInfo = getStatusInfo(prediction);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        sx={{
          p: 3,
          backgroundColor: statusInfo.backgroundColor,
          border: `1px solid ${statusInfo.color}40`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {statusInfo.icon}
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: statusInfo.color,
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            System Status
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            {prediction}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              textAlign: 'center',
            }}
          >
            {statusInfo.description}
          </Typography>
          <Box
            sx={{
              mt: 2,
              width: '100%',
              height: 4,
              backgroundColor: `${statusInfo.color}20`,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                backgroundColor: statusInfo.color,
                width: '30%',
                animation: 'progress 2s infinite linear',
                '@keyframes progress': {
                  '0%': {
                    transform: 'translateX(-100%)',
                  },
                  '100%': {
                    transform: 'translateX(400%)',
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PredictionAlert; 