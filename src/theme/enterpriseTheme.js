import { createTheme } from '@mui/material/styles';

/**
 * Enterprise governance portal theme — compact typography, neutral palette.
 */
const enterpriseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f9a825',
      contrastText: '#1f2937',
    },
    background: {
      default: '#f5f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
    },
    divider: '#e5e7eb',
  },
  typography: {
    fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
    fontSize: 13,
    body1: { fontSize: '0.8125rem' },
    body2: { fontSize: '0.75rem' },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '8px 12px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        sizeSmall: {
          height: 22,
        },
      },
    },
  },
});

export default enterpriseTheme;
