/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/pages/Home.tsx
 * PROGRAM NAME   : Home.tsx
 *                : ページ：Homeページ
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { useState } from "react";

import { Box } from "@mui/material";

import MonthlySummary from "../components/layout/MonthlySummary";
import Calendar from "../components/layout/Calendar";
import TransactionMenu from "../components/layout/TransactionMenu";
import TransactionForm from "../components/layout/TransactionForm";
import { Transaction } from "../types/index";
import { format } from "date-fns";

//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
}

const Home = ({monthlyTransactions, setCurrentMonth}: HomeProps) => {

  //-----------------------------------------//
  // useState：状態管理
  //-----------------------------------------//
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);


  //-----------------------------------------//
  // 日取引取得
  //-----------------------------------------//
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });
  // console.log(dailyTransactions);


  //-----------------------------------------//
  // 取引フォーム開閉
  //-----------------------------------------//
  const CloseForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };


  //-----------------------------------------//
  // 取引フォーム開閉処理
  //-----------------------------------------//
  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  };


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Box sx={{display: "flex"}}>

      {/* 左側コンテンツ：月間収支・月間カレンダー */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>

      {/* 右側コンテンツ：取引メニュー・内訳入力フォーム */}
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransactionForm={handleAddTransactionForm}
        />
        <TransactionForm
          onCloseForm={CloseForm}
          currentDay={currentDay}
          isEntryDrawerOpen={isEntryDrawerOpen}
        />
      </Box>

    </Box>

  );

};

export default Home;
