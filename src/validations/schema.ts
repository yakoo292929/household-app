/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/validation/schema.ts
 * PROGRAM NAME   : schema.ts
 *                : バリデーションチェック
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { z } from "zod";


////////////////////////////////////////////////////////////////////////
// transactionSchema
////////////////////////////////////////////////////////////////////////
export const transactionSchema = z.object({

  // タイプ
  type: z
    .enum(["income", "expense"]),

  // 日付
  date: z
    .string().min(1, {message: "日付を入力して下さい。"}),

  // 金額
  amount: z
    .number()
    .min(1, {message: "金額は1円以上で入力して下さい。"}),

  // 内容
  content: z
    .string()
    .min(1, {message: "内容を入力して下さい。"})
    .max(50, {message: "内容は50文字以内で入力して下さい。"}),

  // カテゴリー
  category: z.union([
    z.enum(["食費", "日用品", "住宅費", "交際費", "娯楽", "交通費"]),
    z.enum(["給与", "副収入", "お小遣い"]),
    z.literal(""),
  ])
    .refine((val) => val !== "" , {
      message: "カテゴリーを選択して下さい。"
  }),

});

export type Schema = z.infer<typeof transactionSchema>
