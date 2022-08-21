import { createTheme, ThemeProvider } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: `'Source Code Pro', monospace`,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar": {
          width: "10px",
        },
        "*::-webkit-scrollbar-track": {
          background: "#E4EFEF",
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#1D388F61",
          borderRadius: "2px",
        },
      },
    },
  },
});
