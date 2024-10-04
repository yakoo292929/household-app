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

import { Box } from '@mui/material';
import MonthlySummary from '../components/layout/MonthlySummary';
import Calendar from '../components/layout/Calendar';
import TransactionMenu from '../components/layout/TransactionMenu';
import TransactionForm from '../components/layout/TransactionForm';
import { Transaction } from '../types/index';


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,

}

const Home = ({monthlyTransactions, setCurrentMonth}: HomeProps) => {

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Box sx={{display: "flex"}}>

      {/* 左側コンテンツ */}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>
      </Box>

      {/* 右側コンテンツ */}
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>

    </Box>

  );

};

export default Home;
