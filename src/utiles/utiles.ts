/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/utiles/utiles.ts
 * PROGRAM NAME   : utiles.ts
 *                : ユーティリティ関数
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { format } from 'date-fns';
import { Balance, Transaction } from '../types/index';


//-----------------------------------------//
// 年月(YYYYMM)変換 関数
//-----------------------------------------//
export function formatMonth(date: Date):string {
  return format(date, "yyyy-MM")
}


//-----------------------------------------//
// トランザクション収支計算 関数
//-----------------------------------------//
export function financeCalculations(transactions: Transaction[]): Balance {

  return transactions.reduce((acc, transaction) => {

    if (transaction.type === "income") {
        // 収入計算
        acc.income += transaction.amount;
    } else {
        // 支出計算
        acc.expence += transaction.amount;
    }
    // 残高計算
    acc.balance = acc.income - acc.expence;

    return acc;

  }, {income: 0, expence: 0, balance: 0});

}
