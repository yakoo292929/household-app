/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/CategoryChart.tsx
 * PROGRAM NAME   : CategoryChart.tsx
 *                : レイアウト：カテゴリーグラフ
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { useState } from "react";
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import { Pie } from "react-chartjs-2";

import { ExpenseCategory, IncomeCategory, Transaction, TransactionType } from "../../types";

ChartJS.register(ArcElement, Tooltip, Legend);


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface CategoryChartProps {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}


////////////////////////////////////////////////////////////////////////
// CategoryChart
////////////////////////////////////////////////////////////////////////
const CategoryChart = ({monthlyTransactions, isLoading}: CategoryChartProps) => {

  //-----------------------------------------//
  // useTheme：MUIスタイル設定
  //-----------------------------------------//
  const theme = useTheme();

  //-----------------------------------------//
  // useState：状態管理
  //-----------------------------------------//
  const [selectedType, setSelectedType] = useState<TransactionType>("expense");

  //-----------------------------------------//
  // 収支の種類選択
  //-----------------------------------------//
  const handleChange = (e: SelectChangeEvent<TransactionType>) => {
    setSelectedType(e.target.value as TransactionType);
  }

  //-----------------------------------------//
  // 選択収支の月間取引データ取得
  //-----------------------------------------//
  const categorySums = monthlyTransactions
    .filter((transaction) => transaction.type === selectedType)
    .reduce<Record<IncomeCategory | ExpenseCategory, number>>((acc, transaction) => {
      // 初期化
      if (!acc[transaction.category]) {
          acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc
    }, {} as Record<IncomeCategory | ExpenseCategory, number>);

  //-----------------------------------------//
  // カテゴリー・収入・支出データ配列取得
  //-----------------------------------------//
  const categoryLabels = Object.keys(categorySums) as (IncomeCategory | ExpenseCategory)[];
  const categoryValues = Object.values(categorySums);

  //-----------------------------------------//
  // カテゴリー色配列取得
  //-----------------------------------------//
  const incomeCategoryColor: Record<IncomeCategory, string> = {
    給与: theme.palette.incomeCategoryColor.給与,
    副収入: theme.palette.incomeCategoryColor.副収入,
    お小遣い: theme.palette.incomeCategoryColor.お小遣い,
  };

  const expenseCategoryColor: Record<ExpenseCategory, string> = {
    食費: theme.palette.expenseCategoryColor.食費,
    日用品: theme.palette.expenseCategoryColor.日用品,
    住宅費: theme.palette.expenseCategoryColor.住宅費,
    交際費: theme.palette.expenseCategoryColor.交際費,
    交通費: theme.palette.expenseCategoryColor.交通費,
    娯楽: theme.palette.expenseCategoryColor.娯楽,
  }

  //-----------------------------------------//
  // カテゴリー色取得
  //-----------------------------------------//
  const getCategoryColor = (category: IncomeCategory | ExpenseCategory): string => {
    if (selectedType === "income") {
        return incomeCategoryColor[category as IncomeCategory];
    } else {
        return expenseCategoryColor[category as ExpenseCategory];
    }
  }

  //-----------------------------------------//
  // 円グラフ設定
  //-----------------------------------------//
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const data: ChartData<"pie"> = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryValues,
        backgroundColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        borderColor: categoryLabels.map((category) =>
          getCategoryColor(category)
        ),
        borderWidth: 1,
      },
    ],
  };


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <>

      <FormControl fullWidth>
        <InputLabel id="type-select-label">収支の種類</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          label="収支の種類"
          onChange={handleChange}
        >
          <MenuItem value={"income"}>収 入</MenuItem>
          <MenuItem value={"expense"}>支 出</MenuItem>
        </Select>
      </FormControl>

      <Box
         sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
      }}>

        {isLoading ? (
          <CircularProgress />
        ) : monthlyTransactions.length > 0  ? (
          <Pie data={data} options={options} />
        ) : (
          <Typography>データがありません</Typography>
        )}

      </Box>

    </>

  );

};

export default CategoryChart;
