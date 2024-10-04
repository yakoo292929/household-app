/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/types/index.ts
 * PROGRAM NAME   : index.ts
 *                : 型定義
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

export type TransactionType = "income" | "expence";
export type IncomeCategory = "給与" | "副収入" | "お小遣い";
export type ExpenceCategory = "食費" | "日用品" | "住宅費" | "交際費" | "娯楽" | "交通費";

export interface Transaction {
  id: string,
  date: string,
  amount: number,
  content: string,
  type: TransactionType,
  category: IncomeCategory | ExpenceCategory,
}

export interface Balance {
  income: number,
  expence: number,
  balance: number,
}
