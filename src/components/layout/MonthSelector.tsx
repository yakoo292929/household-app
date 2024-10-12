/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/MonthSelector.tsx
 * PROGRAM NAME   : MonthSelector.tsx
 *                : レイアウト：月選択
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { Box, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addMonths } from "date-fns";
import { ja } from "date-fns/locale"


//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface MonthSelectorProps {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}


////////////////////////////////////////////////////////////////////////
// MonthSelector
////////////////////////////////////////////////////////////////////////
const MonthSelector = ({currentMonth, setCurrentMonth}: MonthSelectorProps) => {

  //-----------------------------------------//
  // 前月取得 関数
  //-----------------------------------------//
  const handlePriviousMonth = () => {
    const priviousMonth = addMonths(currentMonth, -1);
    setCurrentMonth(priviousMonth);
  }


  //-----------------------------------------//
  // datepicker変更日付取得 関数
  //-----------------------------------------//
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
        setCurrentMonth(newDate);
    }
  }


  //-----------------------------------------//
  // 次月取得 関数
  //-----------------------------------------//
  const handleNextMonth = () => {
    const nextMonth = addMonths(currentMonth, 1);
    setCurrentMonth(nextMonth);
  }


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
    >

      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>

        <Button onClick={handlePriviousMonth} color={"error"} variant="contained">先 月</Button>

        <DatePicker
          onChange={handleDateChange}
          label="年月を選択"
          sx={{mx: 2, background: "white"}}
          views={["year", "month"]}
          format="yyyy年MM月"
          slotProps={{
            toolbar: {
              toolbarFormat: "yyyy年MM月",
            },
          }}
          value={currentMonth}
        />

        <Button onClick={handleNextMonth}  color={"primary"} variant="contained">次 月</Button>

      </Box>

    </LocalizationProvider>

  );

};

export default MonthSelector;
