/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/DailySummary.tsx
 * PROGRAM NAME   : DailySummary.tsx
 *                : レイアウト：日集計
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { Transaction } from "../../types";
import { financeCalculations, formmatCurrency } from "../../utiles/utiles";

//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface DailySummaryProps {
  dailyTransactions: Transaction[];
}

const DailySummary = ({dailyTransactions}: DailySummaryProps) => {

  const {income, expense, balance} = financeCalculations(dailyTransactions);

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Box>

      <Grid container spacing={2}>

        {/* 収入 */}
        <Grid item xs={6} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                収入
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all", color: (theme) => theme.palette.incomeColor.main }}
              >
                ¥{formmatCurrency(income)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 支出 */}
        <Grid item xs={6} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                支出
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all", color: (theme) => theme.palette.expenseColor.main }}
              >
                ¥{formmatCurrency(expense)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 残高 */}
        <Grid item xs={12} display={"flex"}>
          <Card
            sx={{ bgcolor: (theme) => theme.palette.grey[100], flexGrow: 1 }}
          >
            <CardContent>
              <Typography variant="body2" noWrap textAlign="center">
                残高
              </Typography>
              <Typography
                textAlign="right"
                fontWeight="fontWeightBold"
                sx={{ wordBreak: "break-all", color: (theme) => theme.palette.balanceColor.main }}
              >
                ¥{formmatCurrency(balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Box>
  );
};
export default DailySummary;
