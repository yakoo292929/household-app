/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/MonthlySummary.tsx
 * PROGRAM NAME   : MonthlySummary.tsx
 *                : レイアウト：月間サマリー
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { Transaction } from "../../types/index";
import { financeCalculations } from "../../utiles/utiles";

//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface MonthlySummaryProps {
  monthlyTransactions: Transaction[]
}


////////////////////////////////////////////////////////////////////////
// MonthlySummary
////////////////////////////////////////////////////////////////////////
const MonthlySummary = ({monthlyTransactions}: MonthlySummaryProps) => {

  // トランザクション収支計算
  const {income, expense, balance} = financeCalculations(monthlyTransactions);


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Grid container spacing={{ xs: 1, sm: 2 }} mb={2}>

      {/* 収入 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.incomeColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}>
          <CardContent sx={{ padding: {xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
              <ArrowUpwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>収 入</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"},
              }}
            >
              ¥{income}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 支出 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.expenseColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}>
          <CardContent sx={{ padding: {xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
              <ArrowDownwardIcon sx={{ fontSize: "2rem" }} />
              <Typography>支 出</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"},
              }}
            >
              ¥{expense}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* 残高 */}
      <Grid item xs={4} display={"flex"} flexDirection={"column"}>
        <Card
          sx={{
            bgcolor: (theme) => theme.palette.balanceColor.main,
            color: "white",
            borderRadius: "10px",
            flexGrow: 1,
          }}>
          <CardContent sx={{ padding: {xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
              <AccountBalanceIcon sx={{ fontSize: "2rem" }} />
              <Typography>残 高</Typography>
            </Stack>
            <Typography
              textAlign={"right"}
              variant="h5"
              fontWeight={"fontWeightBold"}
              sx={{
                wordBreak: "break-word",
                fontSize: {xs: "0.8rem", sm: "1rem", md: "1.2rem"},
              }}
            >
              ¥{balance}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );

};

export default MonthlySummary;
