/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/App.tsx
 * PROGRAM NAME   : App.tsx
 *                : アプリケーション全てのページで必要な処理
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Transaction } from "./types/index";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import {theme} from "./theme/theme";
import { formatMonth } from "./utiles/utiles";

function App() {

  //-----------------------------------------//
  // firestoreエラー判断 関数
  //-----------------------------------------//
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err;
  }


  //-----------------------------------------//
  // useState：状態管理
  //-----------------------------------------//
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // const confirmDate = format(currentMonth, "yyyy-MM");
  // console.log(confirmDate);


  //-----------------------------------------//
  // useEffect：副作用レンダリング以外の処理
  //-----------------------------------------//
  useEffect(() => {

    const fetchTransactions = async() => {
      try {

        // DB情報取得
        const querySnapshot = await getDocs(collection(db, "Transactions"));

        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        // console.log(transactionsData);

        // 状態管理
        setTransactions(transactionsData);

      } catch(err) {

        // firestoreエラー判断
        if (isFireStoreError(err)) {
            console.error("firebaseのエラー：", err);
            // console.error("firebaseのエラーメッセージ：", err.message);
            // console.error("firebaseのエラーコード：", err.code);
        } else {
            console.error("一般的なエラー：", err);
        }

      }

    }
    fetchTransactions();

  }, []);


  // 当月分の取引データ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });
  // console.log(monthlyTransactions);


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth}/>} />
            <Route path="/report" element={<Report />} />
            <Route path="/*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
