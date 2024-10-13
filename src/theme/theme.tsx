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
import { blue, red, green, lightBlue, cyan, lightGreen, deepOrange, amber, purple, pink } from "@mui/material/colors";
import { ExpenseCategory, IncomeCategory } from "../types";

declare module "@mui/material/styles" {

  //-----------------------------------------//
  // 型定義
  //-----------------------------------------//
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;
    incomeCategoryColor: Record<IncomeCategory, string>;
    expenseCategoryColor: Record<ExpenseCategory, string>;
  }

  interface PaletteOptions {
    incomeColor?: PaletteColorOptions;
    expenseColor?: PaletteColorOptions;
    balanceColor?: PaletteColorOptions;
    incomeCategoryColor?: Record<IncomeCategory, string>;
    expenseCategoryColor?: Record<ExpenseCategory, string>;
  }

}


////////////////////////////////////////////////////////////////////////
// createTheme
////////////////////////////////////////////////////////////////////////
export const theme = createTheme({

  //-----------------------------------------//
  // 文字デザイン
  //-----------------------------------------//
  typography: {
    fontFamily: "Noto Sans JP, Roboto, 'Helvetica Nene', Arial, sans-serif",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },

  //-----------------------------------------//
  // 色定義
  //-----------------------------------------//
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

    // 収入カテゴリーの色を定義
    incomeCategoryColor: {
      給与: lightBlue[600],
      副収入: cyan[200],
      お小遣い: lightGreen["A700"],
    },

    // 支出カテゴリーの色を定義
    expenseCategoryColor: {
      食費: deepOrange[500],
      日用品: lightGreen[500],
      住宅費: amber[500],
      交際費: pink[300],
      娯楽: cyan[200],
      交通費: purple[400],
    },

  },

});
