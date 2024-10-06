/**
 * ===========================================================================================
 * SYSTEM NAME    : household-app
 * PROGRAM ID     : src/components/Calendar.tsx
 * PROGRAM NAME   : Calendar.tsx
 *                : レイアウト：カレンダー
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/10/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { DatesSetArg, EventContentArg } from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { useTheme } from '@mui/material';

import "../../calendar.css";
import { calculateDailyBalances, formmatCurrency } from '../../utiles/utiles';
import { Balance, CalendarContent, Transaction } from '../../types/index';
import { isSameMonth } from 'date-fns';

//-----------------------------------------//
// 型定義
//-----------------------------------------//
interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  currentDay: string;
  today: string;
}

const Calendar = ({monthlyTransactions, setCurrentMonth, setCurrentDay, currentDay, today}: CalendarProps) => {

  const theme = useTheme();

  const events = [
    { title: 'Meeting', start: "2024-10-10" },
    { title: 'Test', start: "2024-10-20", income: 300, expense: 200, balance: 100 },
  ]

  const backgroundEvent = {
    start: currentDay,
    display: "background",
    backgroundColor: theme.palette.incomeColor.light,
  }

  const renderEventContent = (eventInfo: EventContentArg) => {
    // console.log(eventInfo);
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )

  }

  // 日毎収支計算
  const dailyBalances =  calculateDailyBalances(monthlyTransactions);
  // console.log(dailyBalances);

  //-----------------------------------------//
  // カレンダーイベント作成 関数
  //-----------------------------------------//
  const createCalendarEvent = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
        start: date,
        income: formmatCurrency(income),
        expense: formmatCurrency(expense),
        balance: formmatCurrency(balance),
      }
    })
  }

  // カレンダーイベント作成
  const calenderEvents = createCalendarEvent(dailyBalances);
  // console.log(calenderEvents);
  // console.log([...calenderEvents, backgroundEvent]);

  //-----------------------------------------//
  // 選択日付セット 関数
  //-----------------------------------------//
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    const currentMonth = datesetInfo.view.currentStart;
    setCurrentMonth(currentMonth);

    // 表示月が今月の場合のみ
    const todayDate = new Date();
    if (isSameMonth(todayDate, currentMonth)) {
        setCurrentDay(today);
    }
  }

  //-----------------------------------------//
  // 選択日付クリック 関数
  //-----------------------------------------//
  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  }

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calenderEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />

  );

};

export default Calendar;
