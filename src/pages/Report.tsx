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
import { Transaction } from "../types";


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface ReportProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  monthlyTransactions: Transaction[];
  onDeleteTransanction: (trasactionId: string | readonly string[]) => Promise<void>;
  isLoading: boolean;
}


////////////////////////////////////////////////////////////////////////
// Report
////////////////////////////////////////////////////////////////////////
const Report = ({
  currentMonth,
  setCurrentMonth,
  monthlyTransactions,
  onDeleteTransanction,
  isLoading
}: ReportProps) => {

  const commonPaperStyle = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    p: 4,
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
        <Paper sx={commonPaperStyle}>
          <CategoryChart monthlyTransactions={monthlyTransactions} isLoading={isLoading} />
        </Paper>
      </Grid>

      {/* 棒グラフ */}
      <Grid item xs={12} md={8}>
        <Paper sx={commonPaperStyle}>
          <BarChart monthlyTransactions={monthlyTransactions} isLoading={isLoading} />
        </Paper>
      </Grid>

      {/* 取引テーブル */}
      <Grid item xs={12}>
        <TransactionTable monthlyTransactions={monthlyTransactions} onDeleteTransanction={onDeleteTransanction} />
      </Grid>

    </Grid>

  );

};

export default Report;
