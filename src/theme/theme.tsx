/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/theme/theme.tsx
 * PROGRAM NAME   : theme.tsx
 *                : テーマ：アプリ全体
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material";
import { blue, red, green } from "@mui/material/colors";

declare module "@mui/material/styles" {

  //-----------------------------------------//
  // 型定義
  //-----------------------------------------//
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
  }

  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
  }

}


////////////////////////////////////////////////////////////////////////
// createTheme
////////////////////////////////////////////////////////////////////////
export const theme = createTheme({

  typography: {
    fontFamily: "Noto Sans JP, Roboto, 'Helvetica Nene', Arial, sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  palette: {
    // 収入の色を定義
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },
    // 支出の色を定義
    expenseColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },
    // 残高の色を定義
    balanceColor: {
      main: green[500],
      light: green[300],
      dark: green[700],
    },
  },

});
