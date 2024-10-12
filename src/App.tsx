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

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Transaction } from "./types/index";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import AppLayout from "./components/layout/AppLayout";
import {theme} from "./theme/theme";
import { formatMonth } from "./utiles/utiles";
import { Schema } from "./validations/schema";


////////////////////////////////////////////////////////////////////////
// App
////////////////////////////////////////////////////////////////////////
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
  const [isLoading, setIsLoading] = useState(true);

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

      } finally {

        setIsLoading(false);

      }

    }
    fetchTransactions();

  }, []);


  //-----------------------------------------//
  // 当月分の取引データ取得
  //-----------------------------------------//
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });
  // console.log(monthlyTransactions);


  //-----------------------------------------//
  // 取引保存処理
  //-----------------------------------------//
  const handleSaveTransaction = async (trasaction: Schema) => {

    try {

      // firestoreデータ保存
      const docRef = await addDoc(collection(db, "Transactions"), trasaction);

      // 画面更新
      const newTransaction = {
        id: docRef.id,
        ...trasaction
      } as Transaction;
      setTransactions(prevTransaction => [...prevTransaction, newTransaction]);

    } catch(err) {

      // firestoreエラー判断
      if (isFireStoreError(err)) {
          console.error("firebaseのエラー：", err);
      } else {
          console.error("一般的なエラー：", err);
      }

    }

  };


  //-----------------------------------------//
  // 取引更新処理
  //-----------------------------------------//
  const handleUpdateTransaction = async (transaction: Schema, trasactionId: string) => {

    try {

      // firestoreデータ更新
      const docRef = doc(db, "Transactions", trasactionId);
      await updateDoc(docRef, transaction);

      // 画面更新-更新前・後データ マージ
      const updatedTransactions = transactions.map((t) => t.id === trasactionId ? {...t, ...transaction} : t) as Transaction[];
      setTransactions(updatedTransactions);

    } catch(err) {

      // firestoreエラー判断
      if (isFireStoreError(err)) {
          console.error("firebaseのエラー：", err);
      } else {
          console.error("一般的なエラー：", err);
      }

    }

  };


  //-----------------------------------------//
  // 取引削除処理
  //-----------------------------------------//
  const handleDeleteTransanction = async (trasactionId: string) => {

    try {

      // firestoreデータ削除
      const docRef = await deleteDoc(doc(db, "Transactions", trasactionId));

      // 画面更新-削除以外データフィルタリング
      const filteredTransactions = transactions.filter((transaction) => transaction.id !== trasactionId);
      setTransactions(filteredTransactions);

    } catch(err) {

      // firestoreエラー判断
      if (isFireStoreError(err)) {
          console.error("firebaseのエラー：", err);
      } else {
          console.error("一般的なエラー：", err);
      }

    }

  };


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <ThemeProvider theme={theme}>

      <CssBaseline />

      <Router>
        <Routes>

          <Route path="/" element={<AppLayout />}>

            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransanction={handleDeleteTransanction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />

            <Route
              path="/report"
              element={
                <Report
                  currentMonth={currentMonth}
                  setCurrentMonth={setCurrentMonth}
                  monthlyTransactions={monthlyTransactions}
                  isLoading={isLoading}
                />
              }
            />

            <Route path="/*" element={<NoMatch />} />
          </Route>

        </Routes>
      </Router>

    </ThemeProvider>

  );
}

export default App;
