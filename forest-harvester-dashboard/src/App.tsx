import React from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#E0E0E0',
    },
    secondary: {
      main: '#9E9E9E',
    },
    background: {
      default: '#1A1A1A',
      paper: '#242424',
    },
    success: {
      main: '#66BB6A',
      dark: '#1B5E20',
    },
    warning: {
      main: '#FFA726',
      dark: '#E65100',
    },
    error: {
      main: '#EF5350',
      dark: '#C62828',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#9E9E9E',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 300,
      letterSpacing: '-0.5px',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
