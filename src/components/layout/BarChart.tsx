/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/BarChart.tsx
 * PROGRAM NAME   : BarChart.tsx
 *                : レイアウト：棒グラフ
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from "chart.js";
import { Bar } from "react-chartjs-2";
import { calculateDailyBalances } from "../../utiles/utiles";
import { Box, Typography, useTheme } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { Transaction } from "../../types";

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface BarChart {
  monthlyTransactions: Transaction[];
  isLoading: boolean;
}


////////////////////////////////////////////////////////////////////////
// BarChart
////////////////////////////////////////////////////////////////////////
const BarChart = ({monthlyTransactions, isLoading}: BarChart) => {

  //-----------------------------------------//
  // useTheme：MUIスタイル設定
  //-----------------------------------------//
  const theme = useTheme();

  //-----------------------------------------//
  // 日毎収支計算
  //-----------------------------------------//
  const dailyBalances = calculateDailyBalances(monthlyTransactions);
  // console.log(monthlyTransactions);

  //-----------------------------------------//
  // 日付・収入・支出データ配列取得
  //-----------------------------------------//
  const dateLabels = Object.keys(dailyBalances).sort();
  const expenseData = dateLabels.map((day) => dailyBalances[day].expense);
  const incomeData = dateLabels.map((day) => dailyBalances[day].income);

  //-----------------------------------------//
  // 棒グラフ設定
  //-----------------------------------------//
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      },
      title: {
        display: true,
        text: "日別収支 "
      }
    }
  };

  const data: ChartData<"bar"> = {
    labels: dateLabels,
    datasets: [
      {
        label: "支 出",
        data: expenseData,
        backgroundColor: theme.palette.expenseColor.light
      },
      {
        label: "収 入",
        data: incomeData,
        backgroundColor: theme.palette.incomeColor.light
      }
    ]
  };


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Box sx={{
      flexGrow: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {isLoading ? (
        <CircularProgress />
      ) : monthlyTransactions.length > 0  ? (
        <Bar options={options} data={data} />
      ) : (
        <Typography>データがありません</Typography>
      )}

    </Box>

  );

};

export default BarChart;
