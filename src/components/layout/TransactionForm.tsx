/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/TransactionForm.tsx
 * PROGRAM NAME   : TransactionForm.tsx
 *                : レイアウト：トランザクションフォーム
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Box, Button, ButtonGroup, IconButton, ListItemIcon, MenuItem, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3ICon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import SaveingsIcon from "@mui/icons-material/Savings";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { zodResolver } from "@hookform/resolvers/zod";

import { ExpenseCategory, IncomeCategory } from "../../types";
import { transactionSchema } from "../../validations/schema";


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface TransactionFormProps {
  onCloseForm: () => void;
  currentDay: string;
  isEntryDrawerOpen: boolean;
}

type IncomeExpense = "income" | "expense";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element
}

const TransactionForm = ({ onCloseForm, isEntryDrawerOpen, currentDay }: TransactionFormProps) => {

  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    { label: "食費", icon: <FastfoodIcon fontSize="small" />},
    { label: "日用品", icon: <AlarmIcon fontSize="small" />},
    { label: "住宅費", icon: <AddHomeIcon fontSize="small" />},
    { label: "交際費", icon: <Diversity3ICon fontSize="small" />},
    { label: "娯楽", icon: <SportsTennisIcon fontSize="small" />},
    { label: "交通費", icon: <TrainIcon fontSize="small" />},
  ];

  const incomeCategories: CategoryItem[] = [
    { label: "給与", icon: <WorkIcon fontSize="small" />},
    { label: "副収入", icon: <SaveingsIcon fontSize="small" />},
    { label: "お小遣い", icon: <AddBusinessIcon fontSize="small" />},
  ];


  //-----------------------------------------//
  // useState：状態管理
  //-----------------------------------------//
  const [categories, setCategories] = useState(expenseCategories);


  //-----------------------------------------//
  // React Hokk Form
  //-----------------------------------------//
  const { control, setValue, watch, formState:{errors}, handleSubmit } = useForm({
    defaultValues: {
      type: "expense",
      date: currentDay,
      amount: 0,
      category: "",
      content: "",
    },
    // バリデーションチェック
    resolver: zodResolver(transactionSchema),
  });
  console.log(errors);

  //-----------------------------------------//
  // 収支タイプ切替 関数
  //-----------------------------------------//
  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
  };

  // 監視
  const currentType = watch("type");


  //-----------------------------------------//
  // useEffect：副作用レンダリング以外の処理
  //-----------------------------------------//
  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  useEffect(() => {
    const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType]);


  const onSubmit = (data: any) => {
    console.log(data);
  };

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%",  // フォーム開閉調整
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2,
        boxSizing: "border-box",
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >

      {/* 入力エリアヘッダー */}
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>

        <Typography variant="h6">入力</Typography>

        {/* 閉じるボタン */}
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* フォーム要素 */}
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>

          {/* 収支切替ボタン */}
          <Controller
            name="type"
            control={control}
            render={({field}) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  variant={field.value === "income" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => incomeExpenseToggle("income")}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />

          {/* 日付 */}
          <Controller
            name="date"
            control={control}
            render={({field}) => (
              <TextField
                error={!!errors.date}
                helperText={errors.date?.message}
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />

          {/* カテゴリ */}
          <Controller
            name="category"
            control={control}
            render={({field}) => (
              <TextField
                error={!!errors.category}
                helperText={errors.category?.message}
                {...field}
                id="カテゴリ"
                label="カテゴリ"
                select
              >
              {categories.map((category, index) => (
                <MenuItem value={category.label} key={index}>
                  <ListItemIcon>
                    {category.icon}
                  </ListItemIcon>
                  {category.label}
                </MenuItem>
              ))}
              </TextField>
            )}
          />

          {/* 内容 */}
          <Controller
            name="content"
            control={control}
            render={({field}) => (
              <TextField
                error={!!errors.content}
                helperText={errors.content?.message}
                {...field}
                label="内容"
                type="text"
              />
            )}
          />

          {/* 金額 */}
          <Controller
            name="amount"
            control={control}
            render={({field}) => (
              <TextField
                error={!!errors.amount}
                helperText={errors.amount?.message}
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
              />
            )}
          />

          {/* 保存ボタン */}
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"} fullWidth
          >
            保存
          </Button>

        </Stack>
      </Box>

    </Box>

  );
};

export default TransactionForm;
