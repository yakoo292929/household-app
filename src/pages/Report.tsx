/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/pages/Report.tsx
 * PROGRAM NAME   : Report.tsx
 *                : ページ：Reportページ
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Grid, Paper } from "@mui/material";

import MonthSelector from "../components/layout/MonthSelector";
import CategoryChart from "../components/layout/CategoryChart";
import BarChart from "../components/layout/BarChart";
import TransactionTable from "../components/layout/TransactionTable";


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}


////////////////////////////////////////////////////////////////////////
// Report
////////////////////////////////////////////////////////////////////////
const Report = ({currentMonth, setCurrentMonth}: ReportProps) => {

  const commonPaperStyle = {
    height: {xs: "auto", md: "400px"},
    display: "flex",
    flexDirection: "column"
  }

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Grid container spacing={2}>

      {/* 日付選択エリア */}
      <Grid item xs={12}>
        <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </Grid>

      {/* 円グラフ */}
      <Grid item xs={12} md={4}>
        <Paper sx={commonPaperStyle}><CategoryChart /></Paper>
      </Grid>

      {/* 棒グラフ */}
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}><BarChart /></Paper>
      </Grid>

      {/* 取引テーブル */}
      <Grid item xs={12}>
        <TransactionTable />
      </Grid>

    </Grid>

  );

};

export default Report;
